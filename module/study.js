const studydb = require('../databases/study')
const querycount = require('../module/querycount')
const fs = require('fs')
const path = require('path')
let isstudy, out, yourday
async function study(ctx, next) {
    let data = ctx.request.body
    let imgInfo = ctx.request.files.study.path
    console.log(data, imgInfo)
    let imgName = `${data.time}.png`

    let imgdir = path.join(__dirname, '../gfimg', 'study', data.openid)
    let imgPath = path.join(imgdir, imgName)
    if (data.query) {
        await studydb.findAll({
            where: {
                time: data.daytime
            }
        }).then((res) => {
            ctx.body = {
                usernum: res.length
            }
        })
        return 0
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
        // let count =await querycount(true, 0, data.openid)
        // count=parseInt(count)+10
        // let crecount = querycount(false, count, data.openid)
        ctx.body = {
            ans: true
        }

    } else {
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
        await studydb.create({
            openid: data.openid,
            study: data.textarea,
            time: data.daytime,
            imgUrl: imgName
        }).then((res) => {
            out = res
        })
        if (out) {
            await studydb.findAll({
                where: {
                    openid: data.openid
                }
            }).then((user) => {
                yourday = user.length
            })
            let count = await querycount(true, 0, data.openid)
            count = parseInt(count) + 5 + parseInt(yourday)
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
module.exports = study