const moment = require("moment")
const {getAndRequireEnvVar} = require("./envCheck")


exports.createSession = (req, toStoreInCookie = {}) => {
    const sessionExpDate = generateSessionExpDate()
    req.session = {
        ...req.session,
        ...toStoreInCookie,
        expDate: sessionExpDate,
        creationTime: generateNowInMilliseconds()
    }
    req.sessionOptions.maxAge = sessionExpDate

}

exports.clearSession = (req, res) => {
    req.session.userId = null
    req.session.expDate = null
    req.session.creationTime = null
    req.sessionOptions.maxAge = 0
}

exports.resetSessionAge = (req) => {
    req.session.creationTime = generateNowInMilliseconds()
    req.sessionOptions.maxAge = generateSessionExpDate()

}

exports.getSession = (req) => req.session;

exports.hasSessionExpired = (req) => {
    if (!req.session.expDate || !req.session.creationTime)
        return true;

    const sessionCreationDate = moment(req.session.creationTime)
    sessionCreationDate.add(req.session.expDate, "millisecond")

    return sessionCreationDate.isBefore(moment.now())

}


let sessionAgeInSeconds = getAndRequireEnvVar("SESSION_AGE_SECONDS")
sessionAgeInSeconds = parseInt(sessionAgeInSeconds)


function generateSessionExpDate() {
    return moment.duration(sessionAgeInSeconds, "seconds").asMilliseconds()
}

function generateNowInMilliseconds() {
    return moment.duration(moment.now()).asMilliseconds()
}


