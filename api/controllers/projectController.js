const Helper = require("../services/helper.js");
const Model = require('../models/project.js');
const ModelController = require('./modelController.js');

class projectController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.version = Helper.getCurVersion(req);
    this.Base = require("../" + this.version + "/project/Base.js");
    this.reqProject = new this.Base(this.req.params);
  }

  async getAllProjects(req) {
    let filter = {};
    if (req.params.userId) {
      filter = {
        owner: req.params.userId,
        command: req.params.userId,
      };
    }

    let count = 100;
    let offset = 0;

    if(Object.keys(req.query).length > 0) {
      count = req.query?.count || count;
      offset = req.query?.offset || offset;
    }

    return this.reqProject.getProjectList(filter, count, offset);
  }

  async getByName(name) {
    if (name === "") return console.error("Name must be isset");

    return this.reqProject.getByFileName(name);
  }

  async createProject() {
    let request = this.req.body;
    let mc = new ModelController(Model);
    
    mc.prepareDataByModel(request);
    if(!mc.success()) {
      console.error(mc.errors);
      return mc.errors;
    }

    return this.reqProject.set(mc.prepareFields);
  }

  dropProject(login) {
    return this.reqProject.drop(login);
  }
}

module.exports = projectController;
