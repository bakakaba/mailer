const { validation } = require("./utilities");

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

  return {
    statusCode: 200,
    body: JSON.stringify(mail, null, 2)
  };
}

module.exports = {
  send
};
