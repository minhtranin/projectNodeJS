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
Route.get('/test',({response})=>{
    console.log('toi')
    return response.send('kaka')})
Route.get('/pay','PaymethodTestController.home')
Route.group(()=>{
    Route.post('/create','TransactionController.home')
    Route.get('/returnTransaction','TransactionController.returnTransaction')
    Route.post('/event','TransactionController.event')
})
.prefix('api/admin/transaction')

Route.group(()=>{
    Route.post('/create','RelationshipController.create')
}).prefix('api/relationship')

Route.group(()=>{
    Route.post('/create','EthereumController.create')
}).prefix('api/ethereum')


/*upload video with AWS*/
Route.post('/video','AwController.uploadVideo').prefix('api/admin/')
Route.post('/deletevideo','AwController.delete').prefix('api/admin/')
Route.post('/list','AwController.list').prefix('api/admin/')
Route.post('/createBucket','AwController.createBucket').prefix('api/admin/')
Route.post('/create','AwController.tao').prefix('api/vip/')