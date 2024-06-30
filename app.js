const express=require('express')
const app=express()
const https=require('https')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")

})


app.post('/',(req,res)=>{
      
    const query = req.body.cityName
    const apiKey ='4a4fc4e606735c2dec02528c3bb13b67'
        const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey+'&units=metric'
        https.get(url,(response)=>{
        
            // for using data
            response.on('data',(data)=>{
                
               const WhetherData = JSON.parse(data)
           
            const temp=WhetherData.main.temp;
            const desc=WhetherData.weather[0].description
            res.write('<h1>The Temperature in ' + query+ ' is ' + temp + ' Degree Celcius </h1>')
            res.write("<h2>The Whether Descripition is "+desc + ' </h2>')
            })
        })
})



app.listen(4545,()=>{
    console.log("Server is running on port")
})