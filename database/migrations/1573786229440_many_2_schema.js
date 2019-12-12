'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Many2Schema extends Schema {
  up () {
    this.create('many_2_s', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('many_2_s')
  }
}

module.exports = Many2Schema
