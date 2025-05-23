const Helper = require("../services/helper.js");

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
    return this.reqProject.set(this.req.body);
  }

  dropProject(login) {
    return this.reqProject.drop(login);
  }
}

module.exports = projectController;
