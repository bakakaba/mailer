const { validation, sender } = require("./utilities");

function createResult(statusCode, result) {
  return {
    statusCode,
    body: JSON.stringify(result)
  };
}

async function send(event) {
  const mail = JSON.parse(event.body);

  const validationResult = validation.validateMail(mail);
  if (validationResult.length) {
    return createResult(400, validationResult);
  }

  await sender.sendWithFallback(mail);

  return {
    statusCode: 204
  };
}

module.exports = {
  send
};
