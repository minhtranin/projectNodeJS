'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CkSchema extends Schema {
  up () {
    this.create('cks', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('address')
      table.timestamps()
    })
  }

  down () {
    this.drop('cks')
  }
}

module.exports = CkSchema
