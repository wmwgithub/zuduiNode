const fs = require('fs')
const path = require('path')
async function fankui(ctx,next){
    let img = ctx.request.files.fankui.path
    let value = ctx.request.body.value
    let time = ctx.request.body.time
    let imgPath=path.join(__dirname,'img',`${(new Date).getTime()}.png`)
    let textPath = path.join(__dirname,'text',`${(new Date).getTime()}.text`)
    let textValue ='time:'+time+'value:'+value
    fs.readFile(img,(err,data)=>{
        fs.writeFile(imgPath,data,(err)=>{
            //
        })
    })

    fs.writeFile(textPath,textValue,(err)=>{
        //
    })
    ctx.body="thanks"
}
module.exports = fankui