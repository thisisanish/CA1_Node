const http = require('http');    
const fs = require('fs');

http.createServer((req,res)=>{

    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    if(req.url=="/"&& req.method=="GET" ){
        res.writeHead(200,{
            'Content-type': 'text/html'
        })
        res.write(`
            <html>
            <body>
            <form action="/processing" method="POST">
            <input placeholder="Full Name" name="name" type='text'/>
            <select name="revBool">
                <option value=1>True</option>
                <option value=0>False</option>
            </select>
            <input type="Submit"/>
            </form>
            </body>
            </html>
        `)
        res.end()
    }
    console.log(req.url);
    if(req.url=="/processing" && req.method=="POST"){

        
        const body = []
        let incomingData = []
        try {
            req.on("data", (chunks) => {
           
                body.push(chunks);
                
                incomingData = Buffer.concat(body).toString().split("&")
                incomingData = incomingData.map(element=>{
                    
                    element=element.split("=")
                    return element[1]
                })
                // so we don't Override
                if(!fs.existsSync('./NameStatus.txt')){
                    
                    //  removing + as it is added in input when space is present
                    incomingData[0] = incomingData[0].split("+").join(" ")

                    // should we reverse or not
                    if(incomingData[1]==1){
                        
                        // reversing the string
                        let name = incomingData[0].split('').reverse().join("")
                        fs.writeFile("./NameStatus.txt",name,{flags:"w"},err=>{
                            if(err){
                                console.log(err);
                            }
                        })
                    }
                    else{
                        
                        fs.writeFile("./NameStatus.txt",incomingData[0],{flags:"w"},err=>{
                            if(err){
                                console.log(err);
                            }
                        })
    
                    }
    
                }
                
              })
            
        } catch (error) {
            res.writeHead(401)
            
        }
            res.writeHead(302,{
                'Location':"/"
            })
        
          res.end()
          
    }
})
.listen(3000)

