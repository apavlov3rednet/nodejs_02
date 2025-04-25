const Storage = require("../../services/storage.js");

class Base {
    constructor(params = {}) {
        this.group = new Storage('group');
    }

    async getGroupList(count = 100, offset = 0) {
        return await this.group.getAllFiles();
    }

    async getMatrix(arGroup = []) {
        if(arGroup.length === 0)
            return false;

        let arPromises = [];

        arPromises = arGroup.map(async groupName => {
            try {
                let result = {};
                result = JSON.parse(await this.getByFileName(groupName)).role;
                return result;
            }
            catch(error) {
                console.error(`Error processing group ${groupName}:`, error);
                throw error;
            }
        });

        try {
            const arResult = await Promise.all(arPromises);
            return arResult;
        }
        catch(error) {
            console.error(`Error processing group ${groupName}:`, error);
            throw error;
        }
    }

    convertValues(obj) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = value === "Y";
        }
        return result;
    }

    async getAllRoles(arMatrix = []) {
        if(arMatrix.length === 0)
            return false;

        const combinedObject = arMatrix.reduce((acc, current) => {
            for (const [key, value] of Object.entries(current)) {
                if (!acc[key]) {
                  acc[key] = {};
                }
        
                acc[key] = { ...acc[key], ...this.convertValues(value) };
              }
              return acc;
        }, {});

        return combinedObject;
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