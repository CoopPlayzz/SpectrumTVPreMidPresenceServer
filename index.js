const express = require('express')
const app = express()
const { createCanvas, loadImage } = require('canvas')
const cors = require('cors')

// respond with "hello world" when a GET request is made to the homepage
app.use(cors({
    origin: '*.spectrum.net/*'
}));
//app.get("*",(req,res)=>{console.log(req.headers);})
app.get('/', (req, res) => {
  res.send('nothing here')
})
app.get('/channelOver/:uri', async (req, res) => {
    async function spectrumChannelOverlay(imgChannel){
        var canvas = await createCanvas(512,512)
        var ctx = canvas.getContext("2d");
        await loadImage(imgChannel).then((img) => {ctx.drawImage(img, 0, 0,512,512);})
        await roundedImage(20,20,170,170,14,ctx)
        ctx.clip()
        await loadImage('https://cdn.discordapp.com/app-assets/951615885922148412/951645722267250838.png').then((img) => {ctx.drawImage(img, 20,20,170,170);})
        ctx.restore()
        //var data =await canvas.toDataURL("image/png");
        var buffer=await canvas.toBuffer("image/png")
        return buffer
      }
      function roundedImage(x,y,width,height,radius,ctx){
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
      //spectrumChannelOverlay(req.params.ChanUri)
      //console.log(req.headers)
      console.log(req.params)
      const headers = { "Content-Type": "image/png" };

      //set status code and headers
      res.writeHead(200, headers);
    res.end(await spectrumChannelOverlay(req.params.uri))
  })


app.listen(process.env.PORT || '30028')