# Entities
### User
- id  // sequnace id
- first_ame
- last_name
- dob
- email
- username
- address
- created
- updated
- status [active, disabled, blocked]

### Account
- id
- account_type_id
- user_id
- balence

### AccountType
- id
- type_name [ Savings, Current, BasicSavings ]
- balance_limit [ -1 = 'no limit', 50_000] [default: -1]
- allowed_services [ list of allowed service's id]

### Transaction
- id
- from_account_id
- to_account_id
- amount
- transfered_at
- status [ ok, ko]
- status_code [ 0 : success, 300 or more : Error]
- messages

### Services
( deposit, withdraw, transfer, card, loan, pre-paid-card, wallet, so on )
- id
- service_name 