'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Many1Schema extends Schema {
  up () {
    this.table('many_1_s', (table) => {
      // alter table
      table.string('stuf')
    })
  }

  down () {
    this.table('many_1_s', (table) => {
      // reverse alternations
    })
  }
}

module.exports = Many1Schema
