# Replace a member should replace member

## Precondition

* [Login](./tasks/login.md)
* [Replace member 2](./tasks/replace-member-2.md)

## GET /bnk/members/2

| Header | Value |
| - | - |
| Authorization | Bearer {token} |

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 200 |
| data._id | 2 |
| data.name | someone else |
| data.imgUrl | https://localhost:3000 |
| data.instagramId | *should not exist* |