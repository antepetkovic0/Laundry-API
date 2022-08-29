const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

class MailService {
  constructor() {
    const options = {
      viewEngine: {
        partialsDir: path.join(__dirname, "/views/partials"),
        layoutsDir: path.join(__dirname, "/views/layouts"),
        extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: "views",
    };

    // shoud be like private (this.__transporter) => things in JS are not private
    // search this
    this.transporter = nodemailer.createTransport({
      // service: "Gmail",
      // auth: {
      //   user: process.env.EMAIL || "ante.petkovic1994@gmail.com",
      //   pass: process.env.EMAIL_PASSWORD || "utqhbxkpsfjzdzng",
      // },
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ad0738703f962c",
        pass: "e85025e2877274",
      },
    });

    this.transporter.use("compile", hbs(options));
  }

  sendMail({ to, subject, template, context, attachments }) {
    return this.transporter.sendMail(
      {
        to: `<${to}>`,
        from: process.env.FROM_EMAIL || "ante.petkovic1994@gmail.com",
        subject,
        template,
        context,
        attachments: [
          {
            filename: "laundry-logo.png",
            path: path.join(__dirname, "laundry-logo.png"),
            cid: "logo@cid",
          },
          ...attachments,
        ],
      },
      (error, info) => {
        if (error) {
          console.log(error);
          throw Error("Error in sending email.");
        }
        console.log(info);
        return info;
      }
    );
  }
}

module.exports = MailService;
