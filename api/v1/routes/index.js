const express = require('express');
const userController = require('../../controllers/userController.js');
const router = express.Router();

//Пользователь
// получаем всех пользователей
router.route('/user/').get((req, res) => {
    let result = userController.getAllUsers(req);
    console.log(result);
    res.send('result');
});

router.route('/user/:id/').get((req, res) => {}); //получаем пользователя по ID
router.route('/user/').post((req, res) => {}); //создаем пользователя
router.route('/user/:id/').put((req, res) => {}); //обновляем пользователя по ID
router.route('/user/:id/').delete((req, res) => {}); //Удаляем пользователя по ID

//Дома сделать для task, group, project
router.route('/task/').get((req, res) => {});

module.exports = router;