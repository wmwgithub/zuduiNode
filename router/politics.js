const studydb = require('../databases/politics')
const querycount = require('../router/querycount')
const fs = require('fs')
const path = require('path')
async function study(ctx, next) {
    let data = ctx.request.body
    if (data.openid) {

    } else {
        data = ctx.request.query
    }
    let files = ctx.request.files
    // console.log(!files)
    let imgInfo, imgName, imgdir, imgPath, isstudy, out
    if (files) {
        imgInfo = ctx.request.files.politics.path
        // console.log(data, imgInfo)
        imgName = `${data.time}.png`
        imgdir = path.join(__dirname, '../gfimg', 'politics', data.openid)
        imgPath = path.join(imgdir, imgName)
    }

 
    await studydb.findOne({
        where: {
            openid: data.openid,
            time: data.daytime
        }
    }).then((res) => {
        isstudy = res
    })
    if (isstudy) {
        ctx.body = {
            ans: true
        }

    } else {
        if (files) {
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
        await studydb.create({
            openid: data.openid,
            study: data.textarea,
            time: data.daytime,
            imgUrl: imgName
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
module.exports = study