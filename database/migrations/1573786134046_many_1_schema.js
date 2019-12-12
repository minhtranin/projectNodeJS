'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Many1Schema extends Schema {
  up () {
    this.create('many_1_s', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('many_1_s')
  }
}

module.exports = Many1Schema
