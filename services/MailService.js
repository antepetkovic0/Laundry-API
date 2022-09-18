const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

class MailService {
  constructor() {
    const options = {
      viewEngine: {
        partialsDir: path.join(__dirname, "/../views/partials"),
        layoutsDir: path.join(__dirname, "/../views/layouts"),
        extname: ".hbs",
      },
      extName: ".hbs",
      viewPath: "views",
    };

    this.transporter = nodemailer.createTransport({
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
        from: "cleanzee@gmail.com",
        subject,
        template,
        context,
        attachments: [
          {
            filename: "logo.png",
            path: path.join(__dirname, "/../logo.png"),
            cid: "logo@cid",
          },
          ...attachments,
        ],
      },
      (error, info) => {
        if (error) {
          console.error(error);
          throw Error("There was problem upon seding email.");
        }

        return info;
      }
    );
  }
}

module.exports = MailService;
