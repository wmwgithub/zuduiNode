const actdb = require('../databases/actdb')
const path = require('path')
const fs = require('fs')
async function image(ctx, next) {
    let imgpath = ctx.request.files.wechat_image.path
    let open_id = ctx.request.body.open_id
    let act_id = ctx.request.body.act_id
    let index = ctx.request.body.index
    let new_path = path.join(__dirname, '../act_img')
    let dirPath = path.join(new_path, open_id, act_id)
    if (ctx.request.body.update > 0) {
        await actdb.update(
            {
                actimage: index
            },
            {
                where:{
                    id:act_id
                },
                fields:['actimage']
            })
    }
    await fs.access(path.join(new_path, open_id), (err) => {
        if (err) {
            fs.mkdir(path.join(new_path, open_id), (err) => {
                if (err) {
                    // console.log(err)
                } else {
                    fs.mkdir(dirPath, (err) => {
                        if (err) {
                            // console.log(err)
                        }
                    })
                }
            })
        } else {
            fs.mkdir(dirPath, (err) => {
                //我知道第一张图之后文件夹已经存在,知道这里会报错没关系,报错吧，就是这么任性
            })
        }
    })
    fs.readFile(imgpath, function (err, data) {
        fs.writeFile(path.join(dirPath, `/${index}.png`), data, "binary", function (err) {
            if (err) {
                console.log(err)
            }
            if (!err) {
                ctx.body = {
                    "message": "upload success"
                }
            }
        })
    })
}
module.exports = image