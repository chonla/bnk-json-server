# Replace a member

## Precondition

* [Login](./tasks/login.md)

## PUT /bnk/members/2

| Header | Value |
| - | - |
| Content-Type | application/json |
| Authorization | Bearer {token} |

```
{
    "_id": 2,
    "name": "someone",
    "imgUrl": "http://localhost"
}
```

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 200 |