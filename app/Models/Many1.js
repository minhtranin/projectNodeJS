'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Many1 extends Model {
    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'HashpassworkHook.method')
      }    
    many(){
        return this.belongsToMany('App/Models/Many2').pivotTable('mot_hais')
     }
}
module.exports = Many1
