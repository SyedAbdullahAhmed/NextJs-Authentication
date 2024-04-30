import nodemailer from 'nodemailer';

export async function sendEmail(email: any,randomPassCode:any) {

    // create transport 
    var transport = nodemailer.createTransport({
        host: process.env.HOST!,
        port: 2525,
        auth: {
            user: "09018beaaf671d",
            pass: process.env.PASS!
        }
    });

    // data to send
    const mailOptions = {
        from: 'abdullah@gmail.com',
        to: email,
        text: randomPassCode.toString(),
        html: `<b>${randomPassCode}</b>`,
    }

    // send email
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse
}