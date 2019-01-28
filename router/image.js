const actimg = require('../databases/imgurldb')
const path = require('path')
const fs = require('fs')
async function image(ctx, next) {
    let imgpath = ctx.request.files.wechat_image.path
    let open_id = ctx.request.body.open_id
    let act_id = ctx.request.body.act_id
    let index = ctx.request.body.index
    console.log(index==0,index==1,'0','1')
    let new_path = path.join(__dirname, '../act_img')
    let dirPath = path.join(new_path, open_id, act_id)
    await fs.access(path.join(new_path, open_id), (err) => {
        if (err) {
            fs.mkdir(path.join(new_path, open_id), (err) => {
                if (err) {
                    console.log(err)
                } else {
                    fs.mkdir(dirPath, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        } else {
            fs.mkdir(dirPath, (err) => {
                //我知道第一张图之后文件夹已经存在没关系报错吧
            })
        }
    })
    fs.readFile(imgpath, function (err, data) {
        fs.writeFile(path.join(dirPath , `/${index}.png`), data, "binary", function (err) {
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
module.exports = image