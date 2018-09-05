# Update a member should partially update member

## Precondition

* [Login](./tasks/login.md)
* [Update member 3](./tasks/partial-update-member-3.md)

## GET /bnk/members/3

| Header | Value |
| - | - |
| Authorization | Bearer {token} |

## Expectation

| Assert | Expected |
| - | - |
| StatusCode | 200 |
| data._id | 3 |
| data.name | a name |
| data.imgUrl | https://localhost:4000 |
| data.instagramId | music.bnk48official |