import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

//use
/**
 * C - post
 * R - get
 * U - put
 * D - delete
 * 
 * use - middleware
 */
app.get('/', (req, res) => { //requrest, response
    // console.log(req); //Объект запроса
    // console.log(res); //Объект ответа
    res.send("<h2>Это работает</h2>");
});

/**
 * 1.0.5.1000
 */
app.get('/api/', (req, res) => {
    res.send("<h2>API</h2>");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
