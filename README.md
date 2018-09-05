# RESTful API with Node Express

Almost ready to use API Service. This is a Undockerized version of https://github.com/chonla/node-express-member.

## Run

```
node server.js
```

## Preloaded Data

**Every time server is started, database will be restored.**

### Users

2 logins (`admin` and `john`) with password `password`.

#### Fields

| Name | Description |
| - | - |
| login | Login name |
| password | Password (hashed) |
| display | Display name |
| email | Email address |

### Members

7 members.

#### Fields

| Name | Description |
| - | - |
| name | Member name |
| imgUrl | Member display photo URL |
| instagramId | Member instagram ID |


## API

### Public API

* **Login:** POST /auth/login
* **User register:** POST /users
* **Get list of members:** GET /bnk/members
* **Get member profile:** GET /bnk/members/`:id`

### Authorization required API

Authorization with Bearer authorization scheme is required in header.

* **Create a member:** POST /bnk/members
* **Update member profile:** PATCH /bnk/members/`:id`
* **Delete a member:** DELETE /bnk/members/`:id`
* **Update user profile:** PATCH /users/`:id`
* **Update my profile:** PATCH /me
* **Get my profile:** GET /me
