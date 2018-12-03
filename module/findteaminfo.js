const team = require('../databases/teaminfodb')

function findteaminfo(){
return async (ctx,next)=>{
    var data=ctx.request.query
    async function find(obj){
       return team.findAll({
            where:{
                actid:obj.actid
            }
        }).then((res)=>{
            if(res.length>0){
                let infoarr=[]
                for(let i=0;i<res.length;i++){
                    infoarr.push(res[i].dataValues)
                }
                return infoarr
            }else{
                return []
            }
        })
    }
   var user= await find(data)
  // console.log(user)
    if(user.length>0){
        ctx.body={
            "user":user
        }
    }
}
}
module.exports = findteaminfo()