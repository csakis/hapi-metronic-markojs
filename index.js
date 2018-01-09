const Hapi = require('hapi')
const Marko = require('marko')
const Path = require('path')
const Inert = require('inert')
const Vision = require('vision')
const Bcrypt = require('bcrypt')
const HapiAuthCookie = require('hapi-auth-cookie')
const AuthStrategy = require('./config/auth-strategy')
const Users = require('./data/users')
require('marko/node-require')
const logOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout'],

        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                error: '*'
            }]
        }]
    }
};

const server = Hapi.server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    },
    debug: {
        request: ['error'],
        log: ['error']
    }
});

const start = async() => {
    await server.register(Inert)
    await server.register(Vision)
    await server.register(HapiAuthCookie)
    await server.register({
        plugin: require('good'),
        logOptions
    })
    //This is only needed if I want to change the view engine to handlebars
    // server.views({
    //     relativeTo: Path.join(__dirname, 'views'),
    //     engines: {
    //         hbs: require('handlebars')
    //     },
    //     isCached: false,
    //     //layout: true,
    //     partialsPath: 'partials',
    //     helpersPath: 'helpers'
    // })

    server.auth.strategy('basic', 'cookie', AuthStrategy);
    server.auth.default({strategy: 'basic', mode: 'try'});

    server.views({
        relativeTo: __dirname,
        engines: {
            marko: {
                compile: (src, options) => {
                    
                    const opts = {
                        preserveWhitespace: true,
                        writeToDisk: false
                    };
                    const template = Marko.load(options.filename, opts);
                    return (context) => {
                        return template.renderToString(context);
                    };
                }
            }
        },
        path: 'templates',
        context : (request) => {
            return {
                user: request.auth.credentials
            };

        }
    }) //end views

    server.route({
        path: '/',
        method: 'GET',
        options:{
            auth:{
                strategy: 'basic',
                mode: 'required'
            }
        },
        handler: (req, h) => {
            return h.view('index', {
                title: "Marko!!"
            })
        }
    })

    server.route({
        path: '/login',
        method: 'GET',
        handler: (req, h) => {
            return h.view('login');
        }
    });

    server.route({
        path: '/login',
        method: 'POST',
        handler: async (req, h) => {
            const {
                username,
                password
            } = req.payload;
            const user = Users[username];
            if (!user || !await Bcrypt.compare(password, user.password)) {
                console.log("Hacker alert!");
                return h.redirect('/login');
            }
            req.cookieAuth.set({
                username
            })
            return h.redirect('/');
        }
    });

    //serving static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true, 
                index:true
            }
        }
    }) //end route

    await server.start()
    console.log("Hapi server started on %s", server.info.uri)
}

start()