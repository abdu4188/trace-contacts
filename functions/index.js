const functions = require('firebase-functions');
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');

admin.initializeApp()


//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'abdulazizyesuf7@gmail.com',
        pass: 'Greatbrain123'
    }
});


exports.sendMail = functions.https.onCall((data, context) =>{
    // console.log(data.email, data.superu);
    const mailOptions = {
    from: `•••••••••@gmail.com`,
    to: data.email,
    subject: 'Contact tracing Registration',
    html: `<h2 style="color: teal">Hello, You have been invited to register for trace contacts app. Please finish the registration by clicking the following link.</h2><br>
                        <center><a style="font-size: 1.5em" href="https://track-acquintances.firebaseapp.com/signup/${data.superu}/${data.email}">
                           <b> Register </b><br>
                        </a></center>`
    };

    return transporter.sendMail(mailOptions, (error, dat) => {
        if (error) {
            return {data: error.message};
        }
        console.log(dat)
        return {data: dat};
    });

})
// res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // console.log(req.body['data']);