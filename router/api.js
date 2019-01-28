//const request = require('koa2-request')
const axios = require('axios')
function api() {
    return async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*')
        let obj = ctx.request.query
        let info = obj.info
        let key = obj.key
        let userid = obj.userid || (new Date).getTime()
        console.log(key, info)

        let text = await axios({
            method: 'post',
            url: 'http://openapi.tuling123.com/openapi/api/v2',
            data: {
                "perception": {
                    "inputText": {
                        "text": info
                    }
                },
                "userInfo": {
                    "apiKey": key,
                    "userId": userid
                }
            }
        }).then(function (res) {
            console.log(res)
            if(res.data.results[1]){
                return {
                    url:res.data.results[0].values.url,
                    text:res.data.results[1].values.text
                }
            }
            return res.data.results[0].values
        });
        console.log(text)
        ctx.body = text
    }
}

module.exports = api()
