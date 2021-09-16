# Jones Restaurant # 

Created 2 endpoints for creating an order and getting all orders for the last 24 hours. 
Created Unit tests for the endpoints.

## Before running anything, make sure to add the .env file which is attached to the email to the root of the project folder .

### How to run endpoints:
* `npm install`
* `npm start`
* `Make a POST request to this URL localhost:3000/orders`
* `Make sure post request follows this structure:`
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
* `Make a GET request to this URL localhost:3000/orders`
* 
```http
GET localhost:3000/orders
```

## How to run tests:
* `npm test app.test.js`
