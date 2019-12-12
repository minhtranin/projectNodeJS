'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Many2 extends Model {
    static getTable(){
        return 'many_1_s'
    }

    
}

module.exports = Many2
