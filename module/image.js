const actimg = require('../databases/imgurldb')
const path = require('path')
const fs = require('fs')
function image() {
    return async (ctx, next) => {
        console.log(ctx.request.files.wechat_image)
        let imgpath = ctx.request.files.wechat_image.path
        console.log("imgpath", imgpath)
        let open_id = ctx.request.body.open_id
        let act_id = ctx.request.body.act_id
        let index = ctx.request.body.index
       await  actimg.create({
            actid: act_id,
            openid: open_id,
            index: index
        })
        let new_path = path.join(__dirname, '../act_img')
        console.log('new_path',new_path)
        fs.readFile(imgpath, function (err, data) {
            fs.writeFile(new_path + `/img_${open_id}_${act_id}_${index}.png`, data, "binary", function (err) {
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
}
module.exports = image()