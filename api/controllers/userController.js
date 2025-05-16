const Helper = require('../services/helper.js');

class userController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.version = Helper.getCurVersion(req);
        this.Access = require('../' + this.version + '/user/Access.js');
        this.Base = require('../' + this.version + '/user/Base.js');
        this.reqUser = new this.Base(this.req.params);
    }

    async getAllUsers() {        
        //if(Access.checkClientAccess(this.req.headers)) {
            return await this.reqUser.getUserList();
        //}
        //else return JSON.stringify({error: 'not access'});
    }

    async getByLogin(login) {
        if(login === '')
            return console.error('Login must be isset');

        return await this.reqUser.getByFileName(login);
    }

    async createUser() {
        return this.reqUser.set(this.req.body);
    }

    dropUser(login) {
        return this.reqUser.drop(login);
    }
}

module.exports = userController;