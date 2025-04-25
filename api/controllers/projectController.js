const Helper = require('../services/helper.js');

class projectController {

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.version = Helper.getCurVersion(req);
        this.Base = require('../' + this.version + '/project/Base.js');
        this.reqProject = new this.Base(this.req.params);
    }

    async getAllProjects() {        
        //if(Access.checkClientAccess(this.req.headers)) {
            return this.reqGroup.getProjectList();
        //}
        //else return JSON.stringify({error: 'not access'});
    }

    async getByName(name) {
        if(name === '')
            return console.error('Name must be isset');

        return this.reqGroup.getByFileName(name);
    }

    async createProject() {
        return this.reqGroup.set(this.req.body);
    }

    dropProject(login) {
        return this.reqGroup.drop(login);
    }
}

module.exports = projectController;