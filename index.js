require('dotenv').config();
const express = require('express');

const router = require('./routes/route')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
