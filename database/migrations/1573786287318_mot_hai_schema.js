'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MotHaiSchema extends Schema {
  up () {
    this.create('mot_hais', (table) => {
      table.increments('id').primary()
      table.integer('id_mot')
      table.integer('id_hai')
      table.timestamps()
    })
  }

  down () {
    this.drop('mot_hais')
  }
}

module.exports = MotHaiSchema
