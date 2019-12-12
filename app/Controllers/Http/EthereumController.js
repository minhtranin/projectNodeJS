'use strict'


class EthereumController {
     /**
      * @swagger
      * /api/ethereum/create:
      *   post:
      *     tags:
      *       - Eth
      *     summary: events
      *     parameters:
      *       - name: info
      *         description: 
      *         in: body
      *         required: false
      *         type: string
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async create({request,response}){
        var Web3 = require('web3');
        const rpcURL = "https://mainnet.infura.io/v3/4a929cde0ac14b8f95ffffb0ea3d66ac"
        var web3 = new Web3(rpcURL)
        const account = "0x5861C91090302AE3EDdd13d1eecE94083B925A12"
        
        let balance = web3.eth.getBalance(account, (err, wei) => {
            balance = web3.utils.fromWei(wei, 'ether')
          })
          return response.send(balance)
    }
    
    
}

module.exports = EthereumController
