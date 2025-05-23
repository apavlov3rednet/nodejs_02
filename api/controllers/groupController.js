const Helper = require("../services/helper.js");

class groupController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.version = Helper.getCurVersion(req);
    //this.Access = require('../' + this.version + '/group/Access.js');
    this.Base = require("../" + this.version + "/group/Base.js");
    this.reqGroup = new this.Base(this.req.params);
  }

  async getAllGroups(req) {
    let filter = {};
    let count = 100;
    let offset = 0;

    if (Object.keys(req.query).length > 0) {
      count = req.query?.count || count;
      offset = req.query?.offset || offset;
    }

    return this.reqGroup.getGroupList(filter, count, offset);
    //}
    //else return JSON.stringify({error: 'not access'});
  }

  async getByName(name) {
    if (name === "") return console.error("Login must be isset");

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
