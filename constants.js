require('dotenv').config();
const auth = {
    type : 'OAuth2',
    user: 'user mail id',
    clientSecret : process.env.CLIENT_SECRET,
    refreshToken : process.env.REFRESH_TOKEN
}

const mailOptions = {
    from: "Rahul Verma <user mail id>",
    to : ["reciepent mail id 1", "reciepient mail id 2"],
    subject : "GMAIL API APPLICATION USING NODE JS"
}

module.exports = { auth, mailOptions}