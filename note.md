# API Collections Documentation

## Users Collection
```json
[
  {
    "_id": "60a1234bcf1234567890abcd",
    "name": "Nguyen Van A",
    "email": "van.a@example.com",
    "phone": "0912345678",
    "total_spent": 800000,
    "debts": [
      {"user_id": "60a1234bcf1234567890abce", "amount": 200000},
      {"user_id": "60a1234bcf1234567890abcf", "amount": 200000}
    ]
  },
  {
    "_id": "60a1234bcf1234567890abce",
    "name": "Tran Thi B",
    "email": "tran.b@example.com",
    "phone": "0912345679",
    "total_spent": 0,
    "debts": []
  },
  {
    "_id": "60a1234bcf1234567890abcf",
    "name": "Le Van C",
    "email": "le.c@example.com",
    "phone": "0912345680",
    "total_spent": 0,
    "debts": []
  }
]
```
## Rooms Collection
```json
[
  {
    "_id": "60a1234bcf1234567890abcd",
    "room_name": "Phòng 101",
    "members": [
      {"user_id": "60a1234bcf1234567890abcd", "name": "Nguyen Van A"},
      {"user_id": "60a1234bcf1234567890abce", "name": "Tran Thi B"},
      {"user_id": "60a1234bcf1234567890abcf", "name": "Le Van C"}
    ],
    "total_debts": [
      {"debtor": "60a1234bcf1234567890abce", "creditor": "60a1234bcf1234567890abcd", "amount": 200000},
      {"debtor": "60a1234bcf1234567890abcf", "creditor": "60a1234bcf1234567890abcd", "amount": 200000}
    ]
  }
]
```

## Transactions Collection 
```json
[
  {
    "_id": "60b1234bcf1234567890abcd",
    "payer": {"user_id": "60a1234bcf1234567890abcd", "name": "Nguyen Van A"},
    "room_id": "60a1234bcf1234567890abcd",
    "amount": 600000,
    "description": "Mua gạo",
    "date": "2024-10-01T14:48:00.000Z",
    "splits": [
      {"user_id": "60a1234bcf1234567890abcd", "amount_owed": 200000},
      {"user_id": "60a1234bcf1234567890abce", "amount_owed": 200000},
      {"user_id": "60a1234bcf1234567890abcf", "amount_owed": 200000}
    ]
  }
]

```
