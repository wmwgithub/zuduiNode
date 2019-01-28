const gfactive = require('../databases/gfactive')
async function querycount(query, count, openid) {
    if (query) {
        function findcount() {
            return gfactive.findOne({
                where: {
                    open_id: openid
                }
            }).then((res) => {
                let data = res.dataValues
                // console.log("data.count", data)
                return data.count
            })
        }
        let yourcount = await findcount()
        return yourcount
    } else {
        function crecount(openid, count) {
            return gfactive.update({
                count: count
            }, {
                    where: {
                        open_id: openid
                    },
                    fields: ['count']
                }).then((res) => {
                    // console.log(res)
                    return res

                })
        }
    }
    await crecount(openid, count)

}
module.exports = querycount