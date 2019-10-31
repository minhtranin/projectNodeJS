'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Token = use('App/Models/Token')
class AuthAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Reponse} ctx.response
   * @param {Function} next
   */
  async handle ({ request,response }, next) {
    // call next to advance the request
    let bearer = request.header('Authorization')
    bearer = bearer.replace('Bearer ','')
    
    const token =await Token.query().where('token',bearer).first()
    if(token) return  await next()
    return response.status(404).send('token invalid')
  }
}

module.exports = AuthAdmin
