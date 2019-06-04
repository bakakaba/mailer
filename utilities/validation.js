function validateEmailAddress(emailAddress) {
  const msgs = [];

  if (!emailAddress || !emailAddress.email) {
    msgs.push("No email address found.");
    return msgs;
  }

  if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
      emailAddress.email
    )
  ) {
    msgs.push(`${emailAddress.email} is not valid.`)
  }

  return msgs;
}

function validateMail(mail) {
  let msgs = [];
  if (!mail || !mail.to || !mail.from || !mail.subject || !mail.body) {
    msgs.push("Mail is missing one or more required fields (to|from|subject|body).");
    return msgs;
  }

  msgs = msgs.concat(validateEmailAddress(mail.from));

  const validateTo = mail.to.reduce((a, x) => a.concat(validateEmailAddress(x)), []);
  msgs = msgs.concat(validateTo);

  if (mail.cc) {
    const validateCC = mail.cc.reduce((a, x) => a.concat(validateEmailAddress(x)), []);
    msgs = msgs.concat(validateCC);
  }

  if (mail.bcc) {
    const validateBCC = mail.cc.reduce((a, x) => a.concat(validateEmailAddress(x)), []);
    msgs = msgs.concat(validateBCC);
  }

  return msgs;
}

module.exports = {
  validateMail
};
