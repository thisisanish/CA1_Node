console.log("STARTED");

const http = require('http');
const fs = require('fs')
const port = 3000

http.createServer((req,res)=>{;

    // get the value from argv and use it to find the prime numbers
    const primeNum = (()=>{
        let count = 0
        let i = 0,j = 0,result = ""
        let limit = process.argv[2]
        for (i = 1;  count< limit; i++) {
            c = 0;
            for (j = 1; j <= i; j++) {
                if (i % j == 0) {       
                    c++;
                }
            }
            if (c == 2) {
                count += 1
                result = result+ " " + i               
            }
        }

        return result
    })
    
    // catches a specific url
    if(req.url=="/url"){
       try{
            res.writeHead(200,{"Content-Type":"text/html"})
        
            // checking if a file exists
            if(fs.existsSync('./primeNumbers.txt')){
                fs.writeFile('./primeNumbers.txt',primeNum(),{flag:'w'},(err)=>{
                    console.log(err);
                })
                res.write("Result Sent")
            }
            else{
                console.log("Error: No File FOund");
                res.write("Error: No File Found")
                throw "No File Found"
            }
        
       }
       catch (error){
           console.log(error);
       }
        res.end()
    }
    // redirects
    res.writeHead(302,{
       'Content-Type': "text/html",
       "Location": "/url"
   })
   
   res.end()
})
.listen(port,()=>console.log(`on port ${port}`))