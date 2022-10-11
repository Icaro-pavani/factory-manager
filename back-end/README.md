# <p align = "center"> Factory Manager </p>

<div align = "center">
<img src="./../front-end/public/logo.png" alt="logo" style="height: 150px"/>
</div>
<br>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Icaro Pavani-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Icaro-pavani/factory-manager?color=4dae71&style=flat-square" />
</p>

## :clipboard: Description

Factory Manager is a management APP for industries. It is separated into two parts. One for the industry owner, where it is possible to add, edit and delete the users/employees that will have access to the app. The second part is the user/employee area, where the user can add, edit and exclude the industry's units and assets, and can analyze which part of the industry needs maintenance by seeing the graph's area, which shows the health level and status of each asset.

---

## :computer: Technologies and concepts

- REST APIs
- JWTs
- Node.js
- TypeScript
- PostgreSQL
- Express

---

## :rocket: Routes

```yml
POST /companies
    - Route to registry name, cnpj and password to a company
    - headers: {}
    - body: {
        "name": Company's name,
        "cnpj": "03.000.933/0001-34",
        "password": "345687"
    }
    - cnpj is the governamental registration of the company in Brazil
```

```yml
POST /auth/companies
    - Route to login the company
    - headers: {}
    - body: {
        "cnpj": "03.000.933/0001-34",
        "password": "345687"
    }
    - response: {
        "token": "eyJhbGciOiJIUzI1..."
    }
```

```yml
POST /users (authenticated)
    - Route to create an user to the company
    - headers: { "Authorization": "Bearer $token" } //Company's token
    - body: {
        "name": "User name",
        "cpf": "410.220.933-34",
        "password": "843578"
    }
    - cpf is person's Id document
```

```yml
GET /users (authenticated)
    - Route get all users of the company
    - headers: { "Authorization": "Bearer $token" } //Company's token
    - body: {}
    - response: {
        "users": [
            {
              "_id": "633fb3b1dd0fea386fbad5b9",
              "name": "User Name",
              "cpf": "410.000.933-34",
              "password": "$2b$10...",
              "companyId": "633e58768b20f651f5c7eeb8"
            },
        ]
    }
```

```yml
DELETE /users/:id (authenticated)
    - Route to delete user by its id
    - headers: { "Authorization": "Bearer $token" } //Company's token
    - body: {}
```

```yml
PUT /users/:id (authenticated)
    - Route to update an user info by id
    - headers: { "Authorization": "Bearer $token" } //Company's token
    - body: {
        "name": "User name",
        "cpf": "410.220.933-34",
        "password": "843578"
    }
    - cpf is person's Id document
```

```yml
POST /auth/users
    - Route to login an user
    - headers: {}
    - body: {
        "cpf": "510.330.933-34",
        "password": "345687"
    }
    - response: {
        "token": "eyJhbGciOiJIUzI1..."
    }
    - cpf is person's Id document
```

```yml
POST /units (authenticated)
    - Route to create an unit to the company
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {
        "name": "Unit's name",
    }
```

```yml
GET /units (authenticated)
    - Route to create an unit to the company
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {
        "name": "Unit's name",
    }
    - response: {
        "units": [
            {
              "_id": "63443114e45cc5464502cce0",
              "name": "Unit's Name",
              "companyId": "633e58768b20f651f5c7eeb8"
            },
        ]
    }
```

```yml
PUT /units (authenticated)
    - Route to update an unit
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {
        "name": "Unit's name",
    }
```

```yml
DELETE /units/:id (authenticated)
    - Route to delete an unit by id
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {}
```

```yml
POST /assets/:unitId (authenticated)
    - Route to create an asset to the unit (unitId)
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {
        "name": "Asset's name",
        "description": "Asset's description",
        "image": "image url",
        "model": "Asset's model",
        "owner": "Asset's owner",
        "status": "Running", // Running || Alerting || Stopped
        "healthLevel": 70
    }
```

```yml
GET /assets/  (authenticated)
    - Route to get all company's assets
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {}
    - response: {
        "_id": "6344575ffe75192bd67f4d7f",
        "name": "Asset's name",
        "description": "Asset's description",
        "image": "image url",
        "model": "Asset's model",
        "owner": "Asset's owner",
        "status": "Running", // Running || Alerting || Stopped
        "healthLevel": 70,
        "companyId": "633e58768b20f651f5c7eeb8",
        "unitId": "63443114e45cc5464502cce0"
    }
```

```yml
GET /assets/:unitId  (authenticated)
    - Route to get all unit's assets
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {}
    - response: {
        "_id": "6344575ffe75192bd67f4d7f",
        "name": "Asset's name",
        "description": "Asset's description",
        "image": "image url",
        "model": "Asset's model",
        "owner": "Asset's owner",
        "status": "Running", // Running || Alerting || Stopped
        "healthLevel": 70,
        "companyId": "633e58768b20f651f5c7eeb8",
        "unitId": "63443114e45cc5464502cce0"
    }
```

```yml
PUT /assets/:id (authenticated)
    - Route to update an asset (id)
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {
        "name": "Asset's name",
        "description": "Asset's description",
        "image": "image url",
        "model": "Asset's model",
        "owner": "Asset's owner",
        "status": "Running", // Running || Alerting || Stopped
        "healthLevel": 70,
        "unitId": "634085b28efe6f34cdaffb45"
    }
```

```yml
DELETE /assets/:id (authenticated)
    - Route to delete an asset (id)
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {}
```

```yml
GET /users/info-user (authenticated)
    - Route to get user infos
    - headers: { "Authorization": "Bearer $token" } //User's token
    - body: {}
    - response: {
        "userInfo": {
            "userName": "User's name",
            "companyName": "Company's name"
        }
    }
```

---

## 🏁 Running the application

This project was created using TypeScript, [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/) as database. So, make sure do you have the last version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running localy.

Run the command below to install the project dependencies.

```
npm install
```

At last, just need to start the server with the command:

```
npm start
```

:stop_sign: Don't forget to follow the same steps showed above in the [front-end](https://github.com/Icaro-pavani/factory-manager/tree/main/front-end), which contains the webpage application for this API. Thus, you can test the role project.

## Deploy

The link of the deployed API is [https://factory-manager-api.herokuapp.com/](https://factory-manager-api.herokuapp.com/)
