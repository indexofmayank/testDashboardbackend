require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/db');

const seoRouter = require('./routers/seoRouter');

const app = express();

app.use(cookieParser());

connectToDb();
app.use(cors());
app.use(express.json({limit: '25mb'}));

app.use('/api/seo', seoRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'It is working'
    });
});


app.listen(process.env.PORT || 5000, () => {
    console.log('app is working on 5000');
})