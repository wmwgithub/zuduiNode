const act = require('../databases/actdb')
const join = require('../databases/joindb')
let time = (new Date).getTime()
function create() {
   return async (ctx, next) => {
        var actinfo = ctx.request.query
        await create_fun(ctx.request.query)
        async function create_fun(data) {
            console.log(data)
            var dog = await act.create({
                type: data.act_type,
                open_id: data.open_id,
                head: data.title,
                text: data.text,
                time: time,
                qq: data.qq,
                name: data.name,
                tel: data.tel,
                userid: data.user_id
            });
            //console.log('created: ' + JSON.stringify(dog));
        };
        var out = await find(actinfo)
        async function find(obj_) {
            //console.log(obj_)
            return act.findAll({
                where: {
                    userid: obj_.user_id,
                    head: obj_.title,
                    time:time
                }
                //  where: ["type > ?", 0] 
            }).then((res) => {
                return res[0].dataValues
            })
        }
        //console.log("actout",out)
        let info2 = {
            actinfo,
            actid: out.id
        }
        await joinuser(info2)
        async function joinuser(info2) {
            var cre_join = await join.create({
                user_id: info2.actinfo.user_id,
                open_id: info2.actinfo.open_id,
                act_id: info2.actid,
                iscard: 0,
                time: (new Date).getTime()
            })
            // console.log("cre_join", cre_join)
        }
        ctx.body = {
            "actid": info2.actid
        }
    }
}

module.exports = create()