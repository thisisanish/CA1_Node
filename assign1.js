const endCorona=(avgRecoveredCases, avgNewCases,currentCases)=>Math.round(currentCases/(avgRecoveredCases-avgNewCases))

console.log(endCorona(4000, 2000, 77000)) 
console.log(endCorona(3000, 2000, 50699))