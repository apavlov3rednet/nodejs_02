const {createHash} = require('node:crypto');

class Secure {
    #hash;

    #solt = ['qwe', 'rty', 'uio', 'p[]', 'asd', 'fgh', 'jkl', 'zxc', 'vbn', 'bnm'];

    constructor(type = 'sha256') {
        this.#hash = createHash(type);
    }

    protectPassword(pass, v = 1) {
        //1. простой вариант
        if(v == 1) {
            this.#hash.update(pass);
            return this.#hash.digest('hex');
        }
        
        //2. среднее
        if(v == 2) {
            const splitPass = pass.split(); // pass - [p, a, s, s]
            let s = '';
            splitPass.forEach(item => {
                s += item + 'solt';
            });
            this.#hash.update(s);
            return this.#hash.digest('hex');
        }
        
        //3. Самый сложный
        if(v == 3) {
            const splitPass2 = pass.split();
            let d = '';
            let n = this.#solt.length;
            let soltNumber = 0;
            for(let i = 0; i < splitPass2.length; i++) {
                let solt = this.#solt[soltNumber];
                d += splitPass2[i] + solt;
                soltNumber++;
                if(soltNumber >= n)
                    soltNumber = 0;
            }
            this.#hash.update(d);
            return this.#hash.digest('hex');
        }
    }

    base64encode(val) {

    }

    base64decode(val) {

    }
}

module.exports = Secure;