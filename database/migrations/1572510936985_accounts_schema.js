'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountsSchema extends Schema {
  up () {
    this.table('accounts', (table) => {
      // alter table
      table.string('token')
    })
  }

  down () {
    this.table('accounts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AccountsSchema
