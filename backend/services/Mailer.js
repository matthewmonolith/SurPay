const mailgun = require("mailgun-js");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, content) {
    this.mailgun = mailgun({
      apiKey: keys.MAILGUNKEY,
      domain: keys.MAILGUNDOMAIN,
    });
    this.data = {
      from: "your_mailgun_email@gmail.com",
      to: this.formatAddresses(recipients),
      subject: subject,
      html: content,
      "o:tracking-clicks": true,
    };
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email).join(",");
  }

  async send() {
    return new Promise((resolve, reject) => {
      this.mailgun.messages().send(this.data, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}

module.exports = Mailer;
