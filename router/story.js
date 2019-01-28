const storydb = require('../databases/story')
const querycount = require('../router/querycount')
const fs = require('fs')
const path = require('path')
let isstory, out, yourday
async function story(ctx, next) {
    let data = ctx.request.body
    if (data.openid) {

    } else {
        data = ctx.request.query
    }
    let files = ctx.request.files
    let imgInfo, imgName, imgdir, imgPath
    if (files) {
        imgInfo = ctx.request.files.story.path
        console.log(data, imgInfo)
        imgName = `${data.time}.png`
        imgdir = path.join(__dirname, '../gfimg', 'story', data.openid)
        imgPath = path.join(imgdir, imgName)
    }
    await storydb.findOne({
        where: {
            openid: data.openid,
            time: data.daytime,
            type: data.storyType
        }
    }).then((res) => {
        isstory = res
    })
    if (isstory) {
        ctx.body = {
            ans: true
        }

    } else {
        if (imgInfo) {
            fs.exists(imgdir, (res) => {
                if (res) {
                    //
                } else {
                    fs.mkdir(imgdir, (res) => {
                        console.log(res)
                    })
                }
            })
            fs.readFile(imgInfo, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    fs.writeFile(imgPath, data, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        }
        await storydb.create({
            openid: data.openid,
            textarea: data.textarea,
            time: data.daytime,
            imgUrl: imgName,
            type: data.storyType,
            title:data.title
        }).then((res) => {
            out = res
        })
        if (out) {
            let count = await querycount(true, 0, data.openid)
            count = parseInt(count) + 10
            let crecount = querycount(false, count, data.openid)
            ctx.body = {
                success: true,
                ans: false
            }
        } else {
            ctx.body = {
                success: false,
                ans: false
            }
        }

    }

}
module.exports = story