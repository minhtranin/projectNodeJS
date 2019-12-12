'use strict'
const Env= use('Env')
const axios = require('axios')
const { URL_SENDGRID }= use('App/Library/Const') 
/**
 * documentation sendgrid package
 * @version 1.00  documentation sendgrid package
 */
class sendGrid{

    /**
     * @constructor 
     * @param {object} option 
     */
    constructor(option){
        this.Url     = URL_SENDGRID
        this.toEmail = option['toEmail']
        this.drawData = option['drawData']
        this.template = this.setTemplate(option['nameTemplate'])
        this.Authenticate = `Bearer ${Env.get('SENDGIRD_SERECT_KEY')}`
        console.log (this.toEmail + ":" + this.template)
    }
    /**
     * this is a name template which in db
     * @function setTemplate RESET_PASSWORD
     * @param {str}  nameTemplate dsd
     * @returns {string} template ID in sendGrid was provided
     */
    setTemplate(nameTemplate){
        return  "d-3e41de0be207425ab10d384dc3cb9d9d"
    }

    setData (){
        this.Data = {
            "from":{
               "email" : "minhtran.in@outlook.com",
            },
            "personalizations":[
                {
                  "to":[
                     {
                      "email":this.toEmail
                      }
                 ],
                  "dynamic_template_data" : this.drawData
               }
            ],
            "template_id": this.template,
                    }
    }
    /**
     * @function sendMail
     * @returns {string} the status when sent
     */
    async sendMail() {
        this.setData()
        const status = await axios({
            method: 'POST',
            url: this.Url,
            data: this.Data,
            headers: { "Authorization": this.Authenticate }
        }).then(status => "success")
            .catch(err => "error")
        return status
    }
   
}
module.exports = sendGrid