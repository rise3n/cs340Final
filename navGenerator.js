const config = require('./src/config');

function createViewContext(identity, obj) {
        if (identity == 'manager') {
            var items = {
                Pagename: 'Manager',
                menuitem: [
                    { location: 'see_employee', Linkename: 'AllEmployees' },
                    { location: 'register', Linkename: 'Register' },
                    { location: 'check', Linkename: 'Check' }
                ]
            }
            var newobj = new Object(items);

            Object.assign(obj, newobj, obj);
        }

        else if (identity == 'employee') {
            var items = {
                Pagename: 'Employee',
                menuitem: [
                    { location: 'rate', Linkename: 'rate' },
                    { location: 'schedule', Linkename: 'schedule' }
                ]
            }
            var newobj = new Object(items);

            Object.assign(obj, newobj, obj); 

        }

        else if (identity == 'viewer') {
            var items = {
                Pagename: 'Home',
                menuitem: [
                    { location: '/menu', Linkename: 'menu' },
                    { location: '/about', Linkename: 'about' }
                ]
            }
            var newobj = new Object(items);

            Object.assign(obj,newobj, obj);
        }

        else {
            var items = {
                Pagename: 'Chef',
                menuitem: [
                    { location: '/edit_recipe', Linkename: 'Edit_recipe' }
                ]
            }
            var newobj = new Object(items);

            Object.assign(obj, newobj, obj);
        }
}

module.exports = { createViewContext };

