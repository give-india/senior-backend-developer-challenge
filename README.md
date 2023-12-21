to start the server in dev mode run

```bash
npm run stat:dev
```

to build run

```bash
npm run build && npm run start
```

to seed data you can call the POST `/seed` endpoint with below example body

```json
{
  "users": [
    {
      "accounts": [
        {
          "balance": 1000,
          "type": "basic"
        }
      ]
    },
    {
      "accounts": [
        {
          "balance": 2000,
          "type": "basic"
        }
      ]
    }
  ]
}
```

for transaction call POST `transfer` endpoint with below example body

```json
{
  "from": 1,
  "to": 2,
  "amount": 10
}
```
