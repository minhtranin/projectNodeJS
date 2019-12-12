'use strict'
const sendGrid = use('App/Library/sendGrid')

class PaymethodTestController {
    async home({request,response}){
       const drawdata= {
                        name:'TCM',
                        link_active :`LINK`
                    }
              
        const sendMailGrid = new sendGrid({
            toEmail      : 'minhtc97@gmail.com',
            drawData     :drawdata,
            nameTemplate : 'a'
        })

        const status =await sendMailGrid.sendMail()
        return response.status(200).send(status)
    }
}

module.exports = PaymethodTestController
