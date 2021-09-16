# Jones Restaurant # 

Created 2 endpoints for creating an order and getting all orders for the last 24 hours. 
Created Unit tests for the endpoints.

## Before running anything, make sure to add the .env file which is attached to the email to the root of the project folder .

### How to run endpoints:
* `npm install`
* `npm start`
* `Make a post request with this structure:`
```
{
    "order": [{
        "name": "xxx",
        "price": "yyy"
        }]
}
```

## How to run tests:
* `npm test app.test.js`