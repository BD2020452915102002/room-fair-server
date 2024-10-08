const { createContainer, asValue } = require('awilix')

const initDI = (mediator, defaultData) => {
    console.log('init DI')
    const container = createContainer()
    container.register(()=>{
        return {
            .....
        }
    })
    container.registerValue = (key, value) => {
        container.register({ [key]: asValue(value) })
    }
    mediator.emit('di.ready', container)
}

module.exports = { initDI }
