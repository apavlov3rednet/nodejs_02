class Helper {
    static getCurVersion(req) {
        // на входе у нас /api/v$
        let version = 'v1';

        if(!req.baseUrl)
            return version;

        return req.baseUrl.split('/')[2];
            // строка     | массив
    }

    static requireIsset(path) {

    }
}

module.exports = Helper;