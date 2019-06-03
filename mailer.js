'use strict';

module.exports.send = async (event) => {
  const mail = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(mail, null, 2),
  };
};
