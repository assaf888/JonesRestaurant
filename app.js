require('dotenv').config();
const express = require('express');
const app = express();
const ordersRouter = require('./routes/orders');
const { PORT } = process.env;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/orders',ordersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

module.exports = { app };