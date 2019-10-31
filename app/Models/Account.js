'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Account extends Model {
    tk(){
        return this.hasOne('App/Models/Token','id','user_id')
      }
}

module.exports = Account
