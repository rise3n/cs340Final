const config = require('./src/config');

module.exports = {

    createViewContext: (identity, obj) => {
        if (identity == 'manager') {
            Object.assign(
                {
                    menuitems: [
                        { location: '/see_Employee', Pagename: 'see_Employee' },
                        { location: '/register', Pagename: 'register' },
                        { location: '/check', Pagename: 'check' }
                    ]
                },
                obj
            )
        }
        else if (identity == 'employee') {

            Object.assign(
                {
                    menuitems: [
                        { location: '/rate', Pagename: 'rate' },
                        { location: '/schedule', Pagename: 'schedule' }
                    ]
                },
                obj
            )

        }
        else if (identity == 'viewer') {
            Object.assign(
                {
                    menuitems: [
                        { location: '/menu', Pagename: 'menu' },
                        { location: '/login', Pagename: 'login' }
                    ]
                },
                obj
            )

        }

        else {

            Object.assign(
                {
                    menuitems: [
                        { location: '/editRecipe', Pagename: 'editRecipe' }
                    ]
                },
                obj
            )

        }
    }
};

