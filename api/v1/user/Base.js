const Storage = require("../../services/storage.js");

class Base {
    constructor(params = {}) {

    }

    getUserList(count = 100, offset = 0) {
        const storageUser = new Storage('user');
        return JSON.stringify(storageUser.getAllFiles());
    }
}

module.exports = Base;