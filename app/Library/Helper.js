'use strict'
const Env = use('Env')
const axios = require('axios')
class Helper {
    static generateToken(limit=40){
        var uid   = require('rand-token')
        var token = "minhAPI"+'-'+uid.generate(limit)
        return token
        
    }
    static async sendGrid(data){
        
            const URL = "https://api.sendgrid.com/v3/mail/send"
			const Authenticate = `Bearer ${Env.get('SENDGIRD_SERECT_KEY')}`
            var body = {
                "from":{
                   "email" : "minhtran.in@outlook.com",
                },
                "personalizations":[
                    {
                      "to":[
                         {
                          "email":data.toMail
                          }
                     ],
                      
                      "dynamic_template_data" : data.drawData
                   }
                ],
                "template_id": data.template,
                        }
                      const status =  await axios({
                            method: 'POST',
                            url: URL,
                            data : body,
                            headers: {"Authorization" : Authenticate}
                        }).then(status=>"success")
                        .catch(err=>"error")
                        return status
    }



}
module.exports = Helper