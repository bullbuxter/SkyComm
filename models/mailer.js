var mailer = require('nodemailer');
var transport = require('nodemailer-mandrill-transport');
var smtp = mailer.createTransport(transport({
    auth: {
        apiKey: 'THIS_IS_A_FAKE_API_KEY'
    }
}));
function sendActivationMail(id) {
    smtp.sendMail({
       host: "smtp.mandrillapp.com",
       port: 25,
       from: "user@skycomm.com",
       to: id,
       subject: "Activation for SkyComm",
       body: "Please activate your account by clicking on the below link."
    }, function(err, res) {
        if(err) console.log(err);
        else console.log('Message sent ' + res);
    });
}
module.exports.sendMail = sendActivationMail;