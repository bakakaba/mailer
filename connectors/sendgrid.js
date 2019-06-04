const fetch = require("node-fetch");

const config = require("../config");

const BASE_URL = "https://api.sendgrid.com/v3";

function formatMailMessage(mail) {
  const msg = {
    personalizations: [
      {
        to: mail.to,
        cc: mail.cc,
        bcc: mail.bcc
      }
    ],
    from: mail.from,
    subject: mail.subject,
    content: [
      {
        type: "text/plain",
        value: mail.body
      }
    ]
  };

  return msg;
}

async function send(mail) {
  const url = BASE_URL + "/mail/send";

  const msg = formatMailMessage(mail);

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(msg),
    headers: {
      Authorization: `Bearer ${config.sendgridKey}`,
      "Content-Type": "application/json"
    }
  });

  if (response.status !== 202) {
    throw new Error(
      `Failed to send via SendGrid (${response.status}): ${await response.text()}`
    );
  }
}

module.exports = {
  send
};
