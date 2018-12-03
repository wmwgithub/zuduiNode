
const card = require('../databases/carddb')
const user = require('../databases/userdb')
function findwe(){
return async (ctx, next) => {
    let data = ctx.request.query
    let arr = []
    let num
 
    async function find(data) {
        return card.findAll({
            where: {
                actid: data.actid
            }
        }).then((res) => {
            for (let i = 0; i < res.length; i++) {
                arr.push(res[i].dataValues)
            }
            return arr
        })

    }
    out = await find(data)
   // console.log('out', out)
    let arr1=[]
    for(let i=0;i<out.length;i++){
        arr1.push(out[i].userid)
    }
  //  console.log(arr1)
    let arr2=new Set(arr1)
    let we_id_arr=Array.from(arr2)
    console.log(we_id_arr)
    let imgarr = []
    for (let i = 0; i < we_id_arr.length; i++) {
       var userid = we_id_arr[i]
        async function getuserinfo(data) {
            return user.findAll({
                where: {
                    id: data
                }
            }).then((res) => {
                if (res.length > 0) {
                    userinfo = res[0].dataValues
                    imgarr.push(res[0].dataValues.image)
                }
            })
        }
        await getuserinfo(userid)
    }
    num = imgarr.length
    //console.log(imgarr)
    ctx.body = {
        "num": num,
        "imgarr": imgarr
    }
}
}
module.exports = findwe()