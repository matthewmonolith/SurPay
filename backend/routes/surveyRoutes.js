const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //create email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice"); //need this to extract surveyId and choice from url
    _.chain(req.body) //req.body contains objects array that represent webhook event, use lodash _chain method for transformation of the array
      .map((item) => {
        const email = item.recipient;
        const url = item.url;
        if (url) {
          const match = p.test(new URL(url).pathname);
          if (match) {
            return { email, surveyId: match.surveyId, choice: match.choice }; //if matched, get id and choice from url
          }
        }
      })
      .compact() //removes undefined values in the array, can happen if the item doesn't have a valid url/doesn't match the pattern
      .uniqBy("email", "surveyId") //remove duplicates that have same email+surveyid thus emails only processed once per email
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }, //only find those who didn't respond yet
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });
};
