const Helper = require('../services/helper.js');

class groupController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.version = Helper.getCurVersion(req);
        //this.Access = require('../' + this.version + '/group/Access.js');
        this.Base = require('../' + this.version + '/group/Base.js');
        this.reqGroup = new this.Base(this.req.params);
    }

    async getAllGroups() {        
        if(Access.checkClientAccess(this.req.headers)) {
            return this.reqGroup.getUserList();
        }
        else return JSON.stringify({error: 'not access'});
    }

    async getByName(name) {
        if(name === '')
            return console.error('Login must be isset');

        return this.reqGroup.getByFileName(name);
    }

    async createGroup() {
        return this.reqGroup.set(this.req.body);
    }

    dropGroup(login) {
        return this.reqGroup.drop(login);
    }
}

module.exports = groupController;