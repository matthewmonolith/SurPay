const keys = require('../../../config/keys')


module.exports = (survey) => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin-top: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td align="center" style="padding: 20px;">
              <h3 style="color: #333333;">We Value Your Feedback!</h3>
              <p style="color: #666666; font-size: 16px;">Please answer the following question:</p>
              <p style="color: #333333; font-size: 18px; font-weight: bold;">${survey.surveyBody}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <a href="${keys.REDIRECT}/api/surveys/feedback" style="display: inline-block; padding: 10px 20px; margin: 5px; color: #ffffff; background-color: #28a745; border-radius: 5px; text-decoration: none; font-size: 16px;">Yes</a>
              <a href="${keys.REDIRECT}/api/surveys/feedback" style="display: inline-block; padding: 10px 20px; margin: 5px; color: #ffffff; background-color: #dc3545; border-radius: 5px; text-decoration: none; font-size: 16px;">No</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px; color: #666666; font-size: 14px;">
              <p>Thank you for your time!</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
