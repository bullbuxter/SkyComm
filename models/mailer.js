var mailer = require('nodemailer');
var transport = require('nodemailer-mandrill-transport');

var smtp = mailer.createTransport(transport({
    auth: {
        apiKey: 'THIS_IS_A_FAKE_API_KEY'
    }
}));
function sendActivationMail(id, code) {
    smtp.sendMail({
       host: "smtp.mandrillapp.com",
       port: 25,
       from: "user@skycomm.com",
       to: id,
       subject: "Activation for SkyComm",
       body: "Please activate your account by clicking on ACTIVATE.\n" + getButton(id, code)
    }, function(err, res) {
        if(err) console.log(err);
        else console.log('Message sent ' + res);
    });
}
function getButton(id, code) {
    var link = 'http://localhost:3000/auth/success?email=' + id + '&front=' + code;
    var btn = '<button type="button" onClick=link>ACTIVATE</button>';
    return btn;
}
module.exports.sendMail = sendActivationMail;