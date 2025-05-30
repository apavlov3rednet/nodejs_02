const validator = {
    phone: '', //"^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$"
    email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
}

const Model = {
    fields: {
        _id: {
            type: 'string',
            important: true,
            system: true,
        },
        login: {
            type: 'string',
            important: true,
            validator: ''
        },
        password: {
            type: 'string',
            important: true,
            validator: '[0-9aA]{12,24}'
        },
        group: {
            type: 'list',
            important: true,
            multiply: true,
            ref: 'group',
        },
        phone: {
            type: 'string',
            important: false,
            validator: validator.phone
        },
        email: {
            type: 'string',
            important: true,
            validator: validator.email
        }
    },
    rules : {

    },
    system : {

    }
}

module.exports = Model;