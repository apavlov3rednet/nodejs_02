import { Access } from "../v1/user/Access.js";
import { Base } from "../v1/user/Base.js";

// @static class
export class userController {
    static getAllUsers(req) {
        let paramsRequest = req.params; //тело запроса ?test=y
        let headerRequest = req.headers; //заголовки запроса
        
        if(Access.checkClientAccess(headerRequest)) {
            //Идем дальше в версию и получаем нужные данные
            let reqUser = new Base(paramsRequest);
            return reqUser.list();
        }
        else return {error: 'not access'};
    }
}