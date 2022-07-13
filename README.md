<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/NivaldoFarias/valex-api">
    <img src="./.github/valex-logo.png" alt="Logo" width="110">
  </a>

<h3 align="center">Valex API</h3>
  <h6>WIP</h6>
  <p>
    Back end Development Project <strong>{18ᵗʰ}</strong>
    <br />
    <a href="https://github.com/NivaldoFarias/valex-api/tree/main/src"><strong>Browse TypeScript code»</strong></a>
</div>

<div align="center">
  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  
</div>

<!-- Table of Contents -->

# Table of Contents

- [Getting Started](#getting-started)
- [Routes](#routes)
- [API Reference](#api-reference)
  - [Cards](#cards)
  - [Payments](#payments)
  - [Recharges](#recharges)
- [Study Playlist](#study-playlist)
- [Contact](#contact)

<!-- Getting Started -->

# Getting Started

This Api can be used in two different ways: by cloning the project or by using your preferred client, such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/).

To clone the project, run the following command:

```git
git clone https://github.com/NivaldoFarias/valex-api.git
```

Then, navigate to the project folder and run the following command:

```git
npm install
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints by navigating to `http://localhost:5000/` or to the deployed URL `https://valex-project-api.herokuapp.com/`. If needed, import one of the provided [Request Collections](https://github.com/NivaldoFarias/valex-api/tree/main/.github) files into your preferred client and test the endpoints!

###### ps.: Highly recommend using the request collections to test the API.

<!-- Routes -->

# Routes

### [Cards](#cards) _`/cards`_

- [Create a card](#---create-a-card)
- [Activate a card](#---activate-a-card)
- [Block a card](#---block-a-card)
- [Unblock a card](#---unblock-a-card)

### [Payments](#payments) _`/payments`_

- [New payment](#---new-payment)

### [Recharges](#recharges) _`/recharges`_

- [New recharge](#---new-recharge)

<!-- API Reference -->

# API Reference

In this section, you will find the API's endpoints and their respective descriptions, along with the request and response examples. All request and response data is in JSON format.

## Cards

### &nbsp; ‣ &nbsp; Create a card

###### &nbsp; &nbsp; POST _`/cards/create`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "employeeId": "1",
  "cardType": "health"
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "this-is-a-needlessly-long-placeholder-api-key"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |   `data: { securityCode }`    |
|   **400**   |    Missing Headers    | `error: { message, details }` |
|   **401**   |    Unauthenticated    | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Activate a card

###### &nbsp; &nbsp; POST _`/cards/activate`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": "3",
  "securityCode": "616",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Block a card

###### &nbsp; &nbsp; POST _`/cards/block`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": "3",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### &nbsp; ‣ &nbsp; Unblock a card

###### &nbsp; &nbsp; POST _`/cards/unblock`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": "3",
  "password": "1234"
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **200**   |          OK           |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Payments

### &nbsp; ‣ &nbsp; New payment

###### &nbsp; &nbsp; POST _`/payments/new`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "card": {
    "id": 3,
    "password": "1234"
  },
  "businessId": 5,
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

## Recharges

### &nbsp; ‣ &nbsp; New recharge

###### &nbsp; &nbsp; POST _`/recharges/new`_

#### &nbsp; &nbsp; ☰ &nbsp; Request

###### Body

```json
{
  "cardId": 3,
  "amount": 1000
}
```

###### Headers

```json
{
  "Content-Type": "application/json",
  "x-api-key": "this-is-a-needlessly-long-placeholder-api-key"
}
```

#### &nbsp; &nbsp; ☰ &nbsp; Responses

| Status Code |      Description      |          Properties           |
| :---------: | :-------------------: | :---------------------------: |
|   **201**   |        Created        |          `data: {}`           |
|   **400**   |    Missing Headers    | `error: { message, details }` |
|   **401**   |    Unauthenticated    | `error: { message, details }` |
|   **403**   |       Forbidden       | `error: { message, details }` |
|   **404**   |       Not Found       | `error: { message, details }` |
|   **422**   |     Invalid Input     | `error: { message, details }` |
|   **500**   | Internal Server Error | `error: { message, details }` |

### Study Playlist

In this section I included all Youtube content I used or refered to while studying for this project. Keep in mind that most of these videos contain information that was not previously studied during class, which may affect some parts of the code that contain these _extras_.

<a href="https://youtube.com/playlist?list=PLoZj33I2-ANTWqU331l3ZGlZV8I7rr5ZN">![Youtube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)</a>

<!-- CONTACT -->

### Contact

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Slack][slack-shield]][slack-url]

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/nivaldofarias/
[slack-shield]: https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white
[slack-url]: https://driventurmas.slack.com/team/U02T6V2D8D8/
