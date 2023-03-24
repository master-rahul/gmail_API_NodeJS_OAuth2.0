const axios = require('axios');
const {generateConfig} = require('./utilsGet');
const {generateConfig1} = require('./utilsPost');
const nodemailer = require('nodemailer');
const CONSTANTS = require('./constants');
const {google} = require('googleapis');
const fs = require('fs');

require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const oAuth2Client = new google.Auth.OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
// );

oAuth2Client.setCredentials({
    refresh_token : process.env.REFRESH_TOKEN
});

async function sendMail(req, res) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...CONSTANTS.auth,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            ...CONSTANTS.mailOptions,
            text: "The Gmail API with NodeJS works",
        };

        const result = await transport.sendMail(mailOptions);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getUser(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

async function getDrafts(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getFeed(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getMessages(req, res) {
    try {
        const url = `https://www.googleapis.com/gmail/v1/users/${req.params.email}/labels`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function readMail(req, res) {
    try {
        const url = `https://gmail.googleapis.com/gmail/v1/users/sid.cd.varma@gmail.com/messages/${req.params.messageId}`;
        const { token } = await oAuth2Client.getAccessToken();
        const config = generateConfig(url, token);
        const response = await axios(config);

        let data = await response.data;

        res.json(data);
    } catch (error) {
        res.send(error);
    }
}

async function viewMail(req, res) {
    try {
        fs.readFile('./viewMail.html', function (err, data) {
            if(err){
                console.log(err);
                return res.end(err);
            }else {
                 res.write(data);
                 return res.end();
            }
        });
    } catch (error) {
        res.send(error);
    }
}
// async function sendMail(req, res) {
//     try {
//         fs.readFile('./sendMail.html', function (err, data) {
//             if (err) {
//                 console.log(err);
//                 return res.end(err);
//             } else {
//                 res.write(data);
//                 return res.end();
//             }
//         });
//     } catch (error) {
//         res.send(error);
//     }
// }



module.exports = {
    getUser,
    sendMail,
    getDrafts,
    readMail,
    getFeed,
    viewMail,
    sendMail
};