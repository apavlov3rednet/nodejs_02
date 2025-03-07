const Access = require("../v1/user/Access.js");
const Base  = require("../v1/user/Base.js");

// @static class
class userController {
    static getAllUsers(req) {
        let paramsRequest = req.params; //тело get запроса ?test=y
        let headerRequest = req.headers; //заголовки запроса
        let bodyRequest = req.body; //тело post запроса
        
        if(Access.checkClientAccess(headerRequest)) {
            //Идем дальше в версию и получаем нужные данные
            let reqUser = new Base(paramsRequest);
            return reqUser.list();
        }
        else return JSON.stringify({error: 'not access'});
    }
}

module.exports = userController;