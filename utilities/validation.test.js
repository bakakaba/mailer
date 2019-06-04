const validation = require("./validation");

test("missing required fields", () => {
  const result = validation.validateMail();
  expect(result).toMatchSnapshot();
});

test("invalid email", () => {
  const mail = {
    to: [{ email: "test+to@something" }],
    from: { email: "test+from@something" },
    subject: "hello world",
    body: "Test email"
  };
  const result = validation.validateMail(mail);
  expect(result).toMatchSnapshot();
});

test("valid mail", () => {
  const mail = {
    to: [{ email: "test+to@something.com" }],
    from: { email: "test+from@something.com" },
    subject: "hello world",
    body: "Test email"
  };
  const result = validation.validateMail(mail);
  expect(result.length).toBe(0);
});
