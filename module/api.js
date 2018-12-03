//const request = require('koa2-request')
const axios =require('axios')
function api(){
    return async (ctx,next)=>{
        let obj = ctx.request.query
        let info = obj.info
        let key = obj.key
        console.log(key,info)
        ctx.set('Access-Control-Allow-Origin','*')
        //`http://openapi.tuling123.com/openapi/api?key=${obj.key}&info=${obj.info}`
        //let data = await request(`http://openapi.tuling123.com/openapi/api?key=${obj.key}&info=${obj.info}`)
        let text =await axios({
            method:'post',
            url:'http://openapi.tuling123.com/openapi/api',
            data:{
                'key':key,
                'info':info
            }

          })
            .then(function(res) {
               return res.data
          });
        console.log(obj)
        ctx.body=text
    }
}

module.exports =api
