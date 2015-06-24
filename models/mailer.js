var mailer = require('nodemailer');
var smtp = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "user@gmail.com", // should be an actual working id
        pass: "password" // working password
    }
});
function sendActivationMail(id) {
    smtp.sendMail({
       from: "akash@code0saurs.com",
       to: id,
       subject: "Activation for SkyComm",
       text: "Please activate your account by clicking on the below link."
    }, function(err, res) {
        if(err) console.log(err);
        else console.log('Message sent ' + res.message);
    });
};
module.exports.sendMail = sendActivationMail;