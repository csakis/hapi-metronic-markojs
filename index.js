const Hapi = require('hapi')
const Marko = require('marko')
const Path = require('path')
const Inert = require('inert')
const Vision = require('vision')

const server = Hapi.server({
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
})

const start = async() => {
    await server.register(Inert)
    await server.register(Vision)

    server.views({
        relativeTo:__dirname,
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
        isCached: false,
       // layout: true,
      //  partialsPath: 'partials',
      //  helpersPath: 'helpers',
       path: 'views'
    }) //end views

    server.route({
        path: '/',
        method: 'GET',
        handler:  (req, h) =>{
            return h.view('index', {title: "Marko!!"})
        }
    })

    //serving static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    }) //end route


    await server.start()
    console.log("Hapi server started on %s", server.info.uri)
}

start()