const express = require('express');
const userController = require('../../controllers/userController.js');
const groupController = require('../../controllers/groupController.js');
const projectController = require('../../controllers/projectController.js');

const router = express.Router();

//Пользователь
// получаем всех пользователей
router.route('/user/').get((req, res) => {
    let user = new userController(req, res);
    let result = user.getAllUsers(req);
    res.send(result);
});

 //получаем пользователя по ID
router.route('/user/:id/').get(async (req, res) => {
    let user = new userController(req, res);
    let result = await user.getByLogin(req.params.id);
    res.send(result);
});

//создаем пользователя
router.route('/user/').post(async (req, res) => {
    let user = new userController(req, res);
    let result = await user.createUser(req, res);
    res.send(result);
}); 

 //обновляем пользователя по ID
router.route('/user/:id/').put((req, res) => {
    let user = new userController(req, res);
});

 //Удаляем пользователя по ID
router.route('/user/:id/').delete(async (req, res) => {
    let user = new userController(req, res);
    let result = await user.dropUser(req.params.id);
});

//Группа
// получаем все группы
router.route('/group/').get(async (req, res) => {
    let group = new groupController(req, res);
    let result = await group.getAllGroups(req);
    res.send(result);
});

 //получаем группу по ID
router.route('/group/:id/').get(async (req, res) => {
    let group = new groupController(req, res);
    let result = await group.getByLogin(req.params.id);
    res.send(result);
});

//создаем группу
router.route('/group/').post(async (req, res) => {
    let group = new groupController(req, res);
    let result = await group.createGroup(req, res);
    res.send(result);
}); 

 //обновляем группу по ID
router.route('/group/:id/').put((req, res) => {
    let group = new groupController(req, res);
});

 //Удаляем группу по ID
router.route('/group/:id/').delete(async (req, res) => {
    let group = new groupController(req, res);
    let result = await group.dropGroup(req.params.id);
});

//Проекты
// получаем все группы
router.route('/project/').get(async (req, res) => {
    let project = new projectController(req, res);
    let result = await project.getAllProjects(req);
    res.send(result);
});

 //получаем группу по ID
router.route('/project/:id/').get(async (req, res) => {
    let project = new projectController(req, res);
    let result = await project.getByName(req.params.id);
    res.send(result);
});

//создаем группу
router.route('/project/').post(async (req, res) => {
    let project = new projectController(req, res);
    let result = await project.createProject(req, res);
    res.send(result);
}); 

 //обновляем группу по ID
router.route('/project/:id/').put((req, res) => {
    let project = new projectController(req, res);
});

 //Удаляем группу по ID
router.route('/project/:id/').delete(async (req, res) => {
    let project = new projectController(req, res);
    let result = await project.dropProject(req.params.id);
});


//Дома сделать для task, group, project
router.route('/task/').get((req, res) => {});

module.exports = router;