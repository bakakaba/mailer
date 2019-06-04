const fetch = require("node-fetch");

const config = require("../config");

const BASE_URL =
  `https://api.mailgun.net/v3/${config.mailgunDomain}`;

function formatAddress(address) {
  return address.name ? `${address.name} <${address.email}>` : address.email;
}

function formatAddresses(addressList) {
  return addressList.map(formatAddress).join(",");
}

function formatMailMessage(mail) {
  const msg = {
    to: formatAddresses(mail.to),
    from: formatAddress(mail.from),
    subject: mail.subject,
    text: mail.body
  };

  if (mail.cc) {
    msg.cc = formatAddresses(mail.cc);
  }

  if (mail.bcc) {
    msg.bcc = formatAddresses(mail.bcc);
  }

  return Object.entries(msg)
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join("&");
}

async function send(mail) {
  const url = BASE_URL + "/messages";

  const msg = formatMailMessage(mail);

  const response = await fetch(url, {
    method: "post",
    body: msg,
    headers: {
      Authorization: `Basic ${Buffer.from("api:" + config.mailgunKey).toString(
        "base64"
      )}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  if (response.status !== 200) {
    throw new Error(
      `Failed to send via Mailgun (${response.status}): ${await response.text()}`
    );
  }
}

module.exports = {
  send
};
