const Storage = require("../../services/storage.js");

class Base {
    constructor(params = {}) {
        this.project = new Storage('project');
    }

    async getProjectList(filter, count = 100, offset = 0) {
        return await this.project.getAllFiles(filter);
    }

    async getByFileName(name) {
        return await this.project.readFile(name);
    }

    async set(arr) {
        if(arr.length === 0)
            return;

        let fileName = String(arr.name).trim();
        return this.project.createFile(fileName, arr);
    }

    async drop(name) {
        return await this.project.deleteFile(name);
    }
}

module.exports = Base;