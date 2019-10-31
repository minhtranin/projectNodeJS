'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/',({response})=>{response.redirect('docs')})
Route.group(()=>{
    Route.post('/register','SwaggerController.register')
    Route.post('/login','SwaggerController.login')
    Route.post('/logout','SwaggerController.logout').middleware(['AuthAdmin'])
    Route.get('/verifyEmail/:token','SwaggerController.verifyEmail')
    Route.post('/upload','FileuploadController.Upload')
})
.prefix('/api/admin')
Route.get('/test','CkController.Home')



