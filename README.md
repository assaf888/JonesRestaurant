# Jones Restaurant # 

Created 2 endpoints for creating an order and getting all orders for the last 24 hours. 
Created Unit tests for the endpoints.

## Before running anything, make sure to add the .env file which is attached to the email to the root of the project folder .

### How to run endpoints:
* `npm install`
* `npm start`
* `Submit POST request to the endpoint below and make sure you follow this structure:`
```http
POST localhost:3000/orders
```
```
{
    "order": [{
        "name": "xxx",
        "price": "yyy"
        }]
}
```
* `For GET request`
```http
GET localhost:3000/orders
```
## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 503 | `SERVICE UNAVAILABLE` |


## How to run tests:
* `npm test app.test.js`
