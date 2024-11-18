export default Object.freeze({
    port: process.env.PORT || 3000,
    mailServiceName: process.env.MAIL_SERVICE_NAME,
    from: process.env.FROM_MAIL,
    appPassword: process.env.APP_PASSWORD
})