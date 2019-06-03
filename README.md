# Mailer

- [ ] Audit logging
- [ ] Integration tests
- [ ] DKIM Signing
- [ ] Spam Scoring
- [ ] Traffic Shaping?
- [ ] Queue interface?

### Email Object Model

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
