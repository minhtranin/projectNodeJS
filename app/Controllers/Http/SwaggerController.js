'use strict'
const Helper = use('App/Library/Helper')
const { validate } = use('Validator')
const Account = use('App/Models/Account')
const Token = use('App/Models/Token')
const Hash  = use('Hash')
class SwaggerController {
   /**
      * @swagger
      * /api/admin/register:
      *   post:
      *     tags:
      *       - Admin Auth
      *     summary: SignUp Account
    
      *     parameters:
      *       - name: info
      *         description: 
      *         in: body
      *         required: false
      *         type: string
      *         schema:
      *             example : {
      *               username: "minhtc",
      *               password: "123",
      *               email: "minhtc97@gmail.com"
      *         }
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async register({request,response}){
        const data = request.all()
        const rules = {
          username: "required|unique:accounts",
          password: "required",
          email   : "required|email|unique:accounts"
        }
        const validation = await validate(request.all(),rules);
        if (validation.fails()){
          return response.status(404).send(validation.messages())
        } 
        const token = Helper.generateToken()
        const account = new Account()
        account.username = data.username
        account.password = await Hash.make(data.password)
        account.email    = data.email
        account.token    = token
        await account.save()
       // const account_withToken =await Account.query().where('username',data.username).first()
        console.log(`${use('App/Library/Const').LINK_ACTIVE_ACCOUNT}${token}`)
        const dataMail= {
          template : use('App/Library/Const').TEMPLATE_REGISTER,
          toMail   : data.email,
          drawData :  {
                      name:data.username,
                      link_active :`${use('App/Library/Const').LINK_ACTIVE_ACCOUNT}${token}`
                  }
        }
        const  status =  await Helper.sendGrid(dataMail)
        console.log('ok')
        console.log(status)
        if (status === "success")
        return response.status(200).send('please check your email to active account')
        //return response.status(404).send("Can't created account") //+status)
    }
    /**
      * @swagger
      * /api/admin/login:
      *   post:
      *     tags:
      *       - Admin Auth
      *     summary: login Account
    
      *     parameters:
      *       - name: info
      *         description: 
      *         in: body
      *         required: false
      *         type: string
      *         schema:
      *             example : {
      *               email   : "minhtc97@gmail.com",
      *               password: "123"
      *         }
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
     async login({request,response}){
      const data = request.all()
      let account = await Account.query().where('email',data.email).first()
      if(!account) return response.status(404).send('email not found')
      let password =await Hash.verify(data.password,account.password)
      if(!password) return response.status(404).send('password incorrect')
      let user = await Account.findBy('id',account.id)
      let acc_token =await Token.query().where('user_id',account.id).first()
      
      if (!acc_token){
        acc_token = Helper.generateToken()
        const token = new Token()
        token.user_id = account.id
        token.token = acc_token
        token.type = ""
        await token.save()
      }
        let accessToken =await user.tk().fetch()
        return response.send(accessToken)
     }
     /**
      * @swagger
      * /api/admin/logout:
      *   post:
      *     tags:
      *       - Admin Auth
      *     summary: Logout Account
      *     security:
      *       - Bearer: []
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
     async logout({request,response}){
        let bearer = request.header('Authorization')
        bearer =bearer.replace("Bearer ","")
        const token = await Token.query().where('token',bearer).delete()
        return response.status(200).send('Log out Success ')
     }
     /**
      * @swagger
      * /api/admin/verifyEmail/{token}:
      *   get:
      *     tags:
      *       - Admin Auth
      *     summary: verifyEmail Account
      *     parameters:
      *       - name: token
      *         description: verify email
      *         in: path
      *         required: false
      *         type: string
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */    
  async verifyEmail({ request, response }) {
    const { token } = request.params
    const account =await Account.query().where('token',token).first()
      if (account){
        await Account.query().where('token',token).update({verify_email:'1'})
        let account = await Account.query().where('token',token).first()
        return response.send(account)
      }
    return response.status(404).send('verify email fail. Please try to again!')
  }

}

module.exports = SwaggerController
