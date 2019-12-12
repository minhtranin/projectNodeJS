'use strict'
const Ck = use('App/Models/Ck')
const Zk = use('App/Models/Zk')
class CkController {
async Home({response}){
    //await Zk.create({idck:1,name:"2uh",address:"vung tau"})
    
    const ck = await Ck.query().fetch()
    
    return response.send(ck)
}
}

module.exports = CkController
