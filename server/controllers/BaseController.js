import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
   * @description Base class that houses instance methods that are common across all controllers
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */

export default class BaseController {
  constructor(linkUrl) {
    this.linkUrl = linkUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  successResponse(res, message, code, data = null) {
    if (!data) {
      return res.status(code).json({
        success: true,
        message,
      });
    }
    return res.status(code).json({
      success: true,
      data,
      message,
    });
  }

  /**
 *@description sends a mail
 * @param {string} to The recipient of the mail
 * @param {object} emailTemplate Message that the recipient should have
 * @returns {object} response from sendGrid api
 */
  sendNotificationEmail(to, emailTemplate) {
    const { subject, from, text } = emailTemplate;
    let { html } = emailTemplate;
    if (this.linkUrl) {
      html = `${html}
      <h2><a href="${this.linkUrl}" style="background-color: #6C54EC;
      color: white; padding: 5px 10px; text-decoration: none;
      border-radius: 2px;">CLICK ME</a></h2>
      `;
    }
    const messageProperty = {
      to, from, subject, text, html,
    };
    return sgMail.send(messageProperty);
  }
}
