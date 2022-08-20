const nodemailer = require('nodemailer')
// const mg = require('nodemailer-mailgun-transport')

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
const sendEmail = async (data = {}, callback) => {
  const transporter = nodemailer.createTransport({
    service: `${process.env.EMAIL_SERVICE}`,
    host: `${process.env.EMAIL_HOST}`,
    port: `${process.env.EMAIL_PORT}`,
    auth: {
      user: `${process.env.EMAIL_FROM_ADDRESS}`,
      pass: `${process.env.EMAIL_APP_PASS}`
    }
  })
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.mailgun.org',
  //   secureConnection: false,
  //   port: 587,

  //   auth: {
  //     user: `${process.env.EMAIL_SMTP_USER_MAILGUN}`,
  //     pass: `${process.env.EMAIL_SMTP_PASS_MAILGUN}`
  //   }
  // })
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage
  }
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(`Error in Email sending: ${err}`)
      return callback(false)
    }
    return callback(true)
  })
}

module.exports = { sendEmail }
