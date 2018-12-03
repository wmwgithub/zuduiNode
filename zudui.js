
const activity = require('./module/activity')
const adduser = require('./module/adduser')
const cardimg = require('./module/cardimage')
const cardday = require('./module/cardday')
const cardinfo = require('./module/cardinfo')
const cardtext = require('./module/cardtext')
const cardtime = require('./module/cardtime')
const code = require('./module/code')
const create = require('./module/create')
const endcy = require('./module/endcy')
const endfb = require('./module/endfb')
const findteaminfo = require('./module/findteaminfo')
const findwe = require('./module/findwe')
const getcard = require('./module/getcard')
const getindex = require('./module/getindex')
const gettime = require('./module/gettime')
const gread = require('./module/gread')
const hobby = require('./module/hobby')
const image = require('./module/image')
const isjoin = require('./module/isjoin')
const needcard = require('./module/needcard')
const teaminfo = require('./module/teaminfo')
const wdcy = require('./module/wdcy')
const wdfb = require('./module/wdfb')
const FMInfo = require('./module/findMyinfo')
const gfactive = require('./module/gfactive')
const question = require('./module/question')
const answer = require('./module/answer')
const early = require('./module/early')
const gfcode = require('./module/gfcode')
const sport = require('./module/sport')
const study = require('./module/study')
const studydt = require('./module/studydt')
const story = require('./module/story')
const storydt = require('./module/storydt')
const associate = require('./module/associate')
const associatedt = require('./module/associatedt')
const politics = require('./module/politics')
const politicsdt = require('./module/politicsdt')
const mycount = require('./module/mycount')
const getanswer = require('./module/getanswer')
const fankui = require('./fankui/fankui')
module.exports = {
    'zuduifunction': [
        fankui, getanswer, mycount, politicsdt, politics, associatedt, associate, storydt, story, studydt, study, sport, gfcode, early, answer, question, activity, adduser, cardimg, cardday, cardinfo, cardtext, cardtime, code, create, endcy, endfb, findteaminfo, findwe, getcard, getindex, gettime, gread, hobby, image, isjoin, needcard, teaminfo, wdcy, wdfb, FMInfo, gfactive
    ]
    ,
    'zuidurouter': [
        '/fankui', '/getanswer', '/mycount', '/politicsdt', '/politics', '/associatedt', '/associate', '/storydt', '/story', '/studydt', '/study', '/sport', '/gfcode', '/early', '/answer', '/question', '/activity', '/adduser', '/cardimage', '/cardday', '/cardinfo', '/cardtext', '/cardtime', '/code', '/create', '/endcy', '/endfb', '/findteaminfo', '/findwe', '/getcard', '/getindex', '/gettime', '/gread', '/hobby', '/image', '/isjoin', '/needcard', '/teaminfo', '/wdcy', '/wdfb', '/findMyinfo', '/gfactive'
    ]
}