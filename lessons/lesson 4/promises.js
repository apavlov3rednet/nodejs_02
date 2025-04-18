const p1 = new Promise((res, rej) => {
    try {
        res = '';
    }
    catch(e) {
        rej = e;
    }
});

p1.then(res => res).catch(rej => rej);

const p2 = new Promise();
const p3 = new Promise();

let values = Promise.all([p1,p2,p3]);
/**
 * [
 *  {},
 *  {},
 *  '',
 *  [],
 *  1000
 * ]
 * 
 */