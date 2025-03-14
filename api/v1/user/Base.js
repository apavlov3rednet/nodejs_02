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
}

module.exports = Base;