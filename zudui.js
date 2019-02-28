const activity = require('./router/activity')
const adduser = require('./router/adduser')
const cardimg = require('./router/cardimage')
const cardday = require('./router/cardday')
const cardinfo = require('./router/cardinfo')
const cardtext = require('./router/cardtext')
const cardtime = require('./router/cardtime')
const code = require('./router/code')
const create = require('./router/create')
const endcy = require('./router/endcy')
const endfb = require('./router/endfb')
const findwe = require('./router/findwe')
const getcard = require('./router/getcard')
const gettime = require('./router/gettime')
const gread = require('./router/gread')
const actinfo = require('./router/actinfo')
const image = require('./router/image')
const userjoin = require('./router/userjoin')
const needcard = require('./router/needcard')
const wdcy = require('./router/wdcy')
const wdfb = require('./router/wdfb')
const fankui = require('./fankui/fankui')
const judgeid = require('./router/judgeid')
const search = require('./router/search')
const showjoinuser = require('./router/showjoinuser')
module.exports = {
    'zuduifunction': [
        showjoinuser, search, judgeid, fankui, activity, adduser, cardimg, cardday, cardinfo, cardtext, cardtime, code, create, endcy, endfb, getcard, gettime, gread, actinfo, image, userjoin, needcard, wdcy, wdfb, findwe
    ]
    ,
    'zuidurouter': [
        '/showjoinuser', '/search', '/judgeid', '/fankui', '/activity', '/adduser', '/cardimage', '/cardday', '/cardinfo', '/cardtext', '/cardtime', '/code', '/create', '/endcy', '/endfb', '/getcard', '/gettime', '/gread', '/actinfo', '/image', '/userjoin', '/needcard', '/wdcy', '/wdfb', '/findwe'
    ]
}