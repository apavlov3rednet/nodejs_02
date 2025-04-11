const Storage = require("../../services/storage.js");

class Base {
    constructor(params = {}) {
        this.group = new Storage('group');
    }

    getUserList(count = 100, offset = 0) {
        return this.group.getAllFiles();
    }

    async getByFileName(name) {
        return await this.group.readFile(name);
    }

    async set(arr) {
        if(arr.length === 0)
            return;

        let fileName = String(arr.name).trim();
        return this.group.createFile(fileName, arr);
    }

    async drop(name) {
        return await this.group.deleteFile(name);
    }
}

module.exports = Base;