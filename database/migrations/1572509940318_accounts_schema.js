'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountsSchema extends Schema {
  up () {
    this.table('accounts', (table) => {
      // alter table
      table.string('verify_email').default('2')
    })
  }

  down () {
    this.table('accounts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AccountsSchema
