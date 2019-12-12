'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ZkSchema extends Schema {
  up () {
    this.create('zks', (table) => {
      table.increments('id').primary()
      table.integer('idck').references('cks.id')
      table.string('name')
      table.string('address')
      table.timestamps()
    })
  }

  down () {
    this.drop('zks')
  }
}

module.exports = ZkSchema
