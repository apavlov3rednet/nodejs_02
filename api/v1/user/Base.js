const Storage = require("../../services/storage.js");
const Group = require('../group/Base.js');

class Base {
    constructor(params = {}) {
        this.user = new Storage('user');
    }

    async getUserList(count = 100, offset = 0) {
        return await this.user.getAllFiles();
    }

    async getByFileName(login) {
        let user = JSON.parse(await this.user.readFile(login));
        let group = new Group();

        user.matrix = await group.getMatrix(user.group);
        user.roles = await group.getAllRoles(user.matrix);
        return user;
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