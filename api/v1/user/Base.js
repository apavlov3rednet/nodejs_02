const Storage = require("../../services/storage.js");

class Base {
    constructor(params = {}) {
        this.user = new Storage('user');
    }

    getUserList(count = 100, offset = 0) {
        return this.user.getAllFiles();
    }

    async getByFileName(login) {
        return await this.user.readFile(login);
    }

    async set(arr) {
        if(arr.length === 0)
            return;

        let fileName = String(arr.login).trim();
        return this.user.createFile(fileName, arr);
    }

    async drop(login) {
        return await this.user.deleteFile(login);
    }
}

module.exports = Base;