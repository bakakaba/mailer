const connectors = require("../connectors");
const sender = require("./sender");

jest.mock("../connectors", () => ({}));

test("fallback provider", async () => {
  connectors.a = {
    send: () => {
      throw new Error("Failed to send.");
    }
  };
  connectors.b = {
    send: () => {
      console.log("sent");
    }
  };

  const mail = {};
  await sender.sendWithFallback(mail);
});
