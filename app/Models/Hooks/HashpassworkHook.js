'use strict'
const Hash = use('Hash')
const HashpassworkHook = exports = module.exports = {}

HashpassworkHook.method = async (modelInstance) => {
     modelInstance.name = await Hash.make(modelInstance.name)
}
