const express = require('express')
const app = express()

//routes
app.get('/',(req, res) =>{
    res.send("Hello Node")
})
app.listen(3000, ()=>{
    console.log('Node Api is on port 3000')

})