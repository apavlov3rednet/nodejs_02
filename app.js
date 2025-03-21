const express = require('express'); //axios - аналог
const cors = require('cors'); //cross-origin request to server
//const bodyParser = require('body-parser'); //разбирает тело запроса
const v1Router = require('./api/v1/routes');

const app = express(); // app = axios();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://127.0.0.1:5500", // http://localhost:5500
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

app.use(express.urlencoded({ extended : true}));
//app.use(bodyParser.json()); //bodyParser / .raw/.json/.text/.array

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*'); //Указываем какому приложению мы разрешаем доступ к серверным запросам
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, DELETE, PATCH'); // 'GET, POST'
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true); //Разрешить все что указано выше и считать валидным
    next();
});

app.use('/api/v1/', v1Router);

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

//Обработка ошибок, всегда вызываем самым последним
app.use((req, res) => {
    res
        .status(404)
        //.sendFile(createPath('404'));
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
