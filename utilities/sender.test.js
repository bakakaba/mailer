const connectors = require("../connectors");
const sender = require("./sender");

jest.mock("../connectors", () => ({}));

test("fallback provider", async () => {
  const failSend = jest.fn(async () => { throw new Error("Failed to send.") });
  const successSend = jest.fn(async () => {});

  connectors.a = {
    send: failSend
  };
  connectors.b = {
    send: successSend
  };

  const mail = {};
  await sender.sendWithFallback(mail);
  expect(failSend.mock.calls.length).toBe(1);
  expect(successSend.mock.calls.length).toBe(1);
});
