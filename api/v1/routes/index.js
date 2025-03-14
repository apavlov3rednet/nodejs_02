const express = require('express');
const userController = require('../../controllers/userController.js');
const router = express.Router();

//Пользователь
// получаем всех пользователей
router.route('/user/').get((req, res) => {
    let result = userController.getAllUsers(req);
    res.send(result);
});

 //получаем пользователя по ID
router.route('/user/:id/').get(async (req, res) => {
    let result = await userController.getByLogin(req.params.id);
    res.send(result);
});

router.route('/user/').post((req, res) => {}); //создаем пользователя
router.route('/user/:id/').put((req, res) => {}); //обновляем пользователя по ID
router.route('/user/:id/').delete((req, res) => {}); //Удаляем пользователя по ID

//Дома сделать для task, group, project
router.route('/task/').get((req, res) => {});

module.exports = router;