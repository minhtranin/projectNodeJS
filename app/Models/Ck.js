'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ck extends Model {
    

    vo(){
        return this.hasMany('App/Models/Zk','id','idck').select('id','name')
    }
}

module.exports = Ck
