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
            validator: '^d+$'
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
            validator: this.validator.phone
        }
    },
    rules : {

    },
    system : {

    },
    validator: {
        phone: '',
        email: ''
    }
}

module.exports = Model;