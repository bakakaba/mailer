# Mailer

## Setup

1. Sign-up to _Sendgrid_ and _Mailgun_.
    - Get _Sendgrid_ API key
    - Get _Mailgun_ sender domain
    - Get _Mailgun_ API key

2. Ensure _AWS CLI_ is installed and configured to your account.

3. Install Serverless `npm install -g serverless`

4. Update _serverless.yml_ with your credentials from step 1.

5. Run `serverless deploy`

6. Enjoy!

## Consumption

To send an email, make a _POST_ request to the endpoint that you've deployed
with a _JSON_ payload.

- Example endpoint
`https://<random>.execute-api.us-west-2.amazonaws.com/dev/mailer/send`

- Email object model
    ```json
    {
        "to": [{
            "name": "<string>",
            "email": "<email>"
        }],
        "cc": [{
            "name": "<string>",
            "email": "<email>"
        }],
        "bcc": [{
            "name": "<string>",
            "email": "<email>"
        }],
        "from": {
            "name": "<string>",
            "email": "<email>"
        },
        "subject": "<string>",
        "body": "<string>"
    }
    ```

## TODO
- [ ] Audit logging
    - Allows tracing and auditing of when a mail is sent
- [ ] Tests for connectors
- [ ] Integration tests
- [ ] DKIM Signing
- [ ] Spam score reduction
- [ ] Traffic shaping
    - May want to load balance instead of just falling back
    - May want to split traffic by recipient domain for better delivery rate
- [ ] Queue interface
    - Backoff retries for free
    - Discard time sensitive mail that are marked with a flag
