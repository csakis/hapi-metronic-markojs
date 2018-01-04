const Hapi = require('hapi')
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
    //await server.register(Vision)

    //serving static files
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    })
    await server.start()
    console.log("Hapi server started on %s", server.info.uri)
}

start()