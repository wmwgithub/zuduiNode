const fs = require('fs')
const path = require('path')
const card = require('../databases/carddb')
async function cardimage(ctx, next) {
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
            }
        })
    })
    await card.update({
        imglength:ctx.request.body.imglength
    }, {
            where: {
                actid: act_id,
                openid: open_id,
                cardtime:time
            }
        })
    ctx.body = {
        "message": "upload success"
    }
    return 0
}
module.exports = cardimage