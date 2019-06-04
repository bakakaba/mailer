const connectors = require("../connectors");

async function sendWithFallback(mail) {
  const providers = Object.keys(connectors);
  for (p of providers) {
    try {
      await connectors[p].send(mail);

      return; // Return here if sending was successful, no need to try others
    } catch (err) {
      console.warn(`Failed to send mail using ${p}`, mail, err);
    }
  }

  console.error("Totally failed to send mail, giving up", mail);
}

module.exports = {
  sendWithFallback
};
