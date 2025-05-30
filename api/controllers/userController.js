const Helper = require("../services/helper.js");
const Model = require('../models/user.js');
const ModelController = require('./modelController.js');

class userController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.version = Helper.getCurVersion(req);
    this.Access = require("../" + this.version + "/user/Access.js");
    this.Base = require("../" + this.version + "/user/Base.js");
    this.reqUser = new this.Base(this.req.params);
  }

  async getAllUsers(req) {
    let filter = {};
    let count = 100;
    let offset = 0;

    if (Object.keys(req.query).length > 0) {
      count = req.query?.count || count;
      offset = req.query?.offset || offset;
    }
    return await this.reqUser.getUserList(filter, count, offset);
  }

  async getByLogin(login) {
    if (login === "") return console.error("Login must be isset");

    return await this.reqUser.getByFileName(login);
  }

  async createUser() {
    let request = this.req.body;
    let mc = new ModelController(Model);
    
    mc.prepareDataByModel(request);

    if(!mc.success()) {
      console.error(mc.errors);
      return mc.errors;
    }

    return this.reqUser.set(mc.prepareFields);
  }

  dropUser(login) {
    return this.reqUser.drop(login);
  }
}

module.exports = userController;
