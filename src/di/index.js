const { createContainer, asValue } = require('awilix')

const initDI = (mediator, defaultData) => {
    console.log('init DI')
    const container = createContainer()
    // Đăng ký từng giá trị trong defaultData
    Object.entries(defaultData).forEach(([key, value]) => {
        container.register({ [key]: asValue(value) });
    });
    container.registerValue = (key, value) => {
        container.register({ [key]: asValue(value) })
    }
    mediator.emit('di.ready', container)
}

module.exports = { initDI }
