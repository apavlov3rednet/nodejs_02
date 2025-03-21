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

//создаем пользователя
router.route('/user/').post(async (req, res) => {
    let result = await userController.createUser(req, res);
    res.send(result);
}); 

 //обновляем пользователя по ID
router.route('/user/:id/').put((req, res) => {});

 //Удаляем пользователя по ID
router.route('/user/:id/').delete(async (req, res) => {
    let result = await userController.dropUser(req.params.id);
});

//Дома сделать для task, group, project
router.route('/task/').get((req, res) => {});

module.exports = router;