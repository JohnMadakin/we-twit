/**
 * @description creates template for sending emails
 * @returns object of temapltes for sending emails;
 */
const emailTemplate = {
  verification: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'Email Verification',
    text: 'Verify your Email at we-twit.com',
    html: `
        <h1 style="color: #6C54EC"> Welcome to we-twit.com</h1>
        <p style="color:black">Thank you for signing up
        for an we-twit.com
        please click on the button to verify your email address</p>
        `,
  },
  welcome: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'we-twit.com account created',
    text: 'Thank you for creating an account at we-twit.com',
    html: `
        <h1 style="color: #6C54EC"> Welcome to we-twit.com</h1>
        Log in into your account to start contributing.
         `,
  },
  expiredToken: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'Expired Token',
    text: 'The token you attempt to verify your account with has expired',
    html: `
        <h1 style="color: #6C54EC"> Welcome to we-twit.com</h1>
        You are receiving this mail because you made attempt to verify your
        account with expired credentials. Kindly click the link
        below to verify your account.
         `,
  },
  confirmation: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'Account successfully confirmed',
    text: 'Thank you for confirming your account at we-twit.com',
    html: `
        < h1 style = "color: #6C54EC" > Welcome to we-twit.com </h1>
        <p>'Thank you for confirming your account at we-twit.com'</p>
        Log in into your account to start contributing.
         `,
  },
  resetPassword: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'Please Reset Password',
    text: 'Reset Password at we-twit.com',
    html: `
        < h1 style = "color: #6C54EC" > we-twit.com </h1>
        < p > 'You requested to reset your we-twit.com password.' </p>
        <p>'Please click on the button below within 
        the next 30 minute to reset your password:'</p>
         `,
  },
  someoneFollowedYou: {
    from: {
      email: 'no-reply@we-twit.com',
    },
    subject: 'Congrats, you have been followed',
    text: 'You have a new follower',
    html: `
        < h1 style = "color: #6C54EC" > You have a new follower </h1>
        <p>'You have just been followed'</p>
        Log in into your account to see whom.
         `,
  },

};

export default emailTemplate;
