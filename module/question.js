const Question= require('../databases/question')
async function question(ctx,next) {
    const data = ctx.request.query
    function getques(time){
        return Question.findOne({
            where:{
                time:time
            }
        }).then((res)=>{
            return res.dataValues
        })
    }
    let ques=await getques(data.time)
    ctx.body=ques;
}

module.exports = question