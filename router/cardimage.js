const fs = require('fs')
const path = require('path')
async function cardimage(ctx, next) {
    console.log(ctx.request.files)
    console.log(ctx.request.body)
    
    let imgpath = ctx.request.files.card_image.path
    let time = ctx.request.body.time
    let open_id = ctx.request.body.openid
    let act_id = ctx.request.body.actid
    let index = ctx.request.body.index
    let new_path = path.join(__dirname, '../card_img')
    fs.readFile(imgpath, function (err, data) {
        fs.writeFile(new_path + `/img_${act_id}_${open_id}_${time}_${index}.png`, data, "binary", function (err) {
            if (err) {
                console.log(err)
            }
            if (!err) {
                console.log("success")
                ctx.body = {
                    "message": "upload success"
                }
            }
        })
    })
}
module.exports = cardimage