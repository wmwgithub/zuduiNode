const studydb = require('../databases/associate')
const querycount = require('../router/querycount')
const fs = require('fs')
const path = require('path')
let isstudy, out, yourday
async function associate(ctx, next) {
    let data = ctx.request.body
    let files = ctx.request.files || false
    console.log(files)
    let imgInfo, imgName, imgdir, imgPath, index
    if (files) {
        imgInfo = ctx.request.files.associate.path
        index = data.index
        imgName = `${data.time}_${index}.png`
        imgdir = path.join(__dirname, '../gfimg', 'associate', data.openid)
        imgPath = path.join(imgdir, imgName)
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
        return 0
    } else {
        data = ctx.request.query
        imgName = data.time
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
        await studydb.create({
            openid: data.openid,
            study: data.textarea,
            time: data.daytime,
            imgUrl: imgName,
            length: data.length
        }).then((res) => {
            out = res
        })
        if (out) {
            let count = await querycount(true, 0, data.openid)
            count = parseInt(count) + 10
            let crecount = querycount(false, count, data.openid)
            ctx.body = {
                success: true,
                ans: false,
                yourday: yourday
            }
        } else {
            ctx.body = {
                success: false,
                ans: false
            }
        }

    }

}
module.exports = associate