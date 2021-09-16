const request = require('supertest');
const { app } = require('../app.js');
const OrderSchema = require('../models/order');

beforeEach(async () => await OrderSchema.deleteMany());

describe('Checking GET endpoint',() => {

    test('checking that the DB is empty, should respond with statuscode 200 if DB is empty',async () => {
        const response = await request(app).get('/orders')
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([]);
    })

    test('should only get orders from DB for the past 24 hours',async () => {
        const outDatedOrder = new OrderSchema({
            order: [{"name": "Fries", "price": "13"}],
            createdAt: new Date("2021-09-10T08:14:22.839+00:00")
        });
        await outDatedOrder.save();

        const newOrder = new OrderSchema({
            order: [
            {"name": "Pizza", "price": "15"}
        ],
            createdAt: new Date()
        })
        await newOrder.save();

        newOrder.createdAt = newOrder.createdAt.toISOString();
        const response = await request(app).get('/orders');

        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toBe(1);
        expect(orderComperator(response.body[0],newOrder)).toBe(true);
    })
    
    const orderComperator = (baseOrder, newOrder) => {
        return baseOrder.order[0].name === newOrder.order[0].name && baseOrder.order[0].price === newOrder.order[0].price;
    }
})

describe('Checking POST endpoint', () => {
    test('should create a new order', async () => {
        const response = await request(app).post('/orders').send({
            order: [{
                name: "Burger",
                price: "10"
            }]
        })
        expect(response.statusCode).toEqual(201);
        const getResponse = await request(app).get('/orders');
        expect(getResponse.statusCode).toEqual(200);
        expect(getResponse.body[0].order).toEqual(
            expect.arrayContaining([
              expect.objectContaining({"name": "Burger"}),
              expect.objectContaining({"price": "10"})
            ]))
    })

    test('should fail for invalid order',async () => {
        const response = await request(app).post('/orders').send({
            order: [{
                price: "10"
            }]
        })
        const getResponse = await request(app).get('/orders');
        expect(response.statusCode).toEqual(400);
        expect(getResponse.body).toEqual([]);
    })
})


