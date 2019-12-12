'use strict'


const sha256        = require('sha256')
const querystring   = require('qs')

const ee = use('App/Listeners/Test')
class TransactionController {
    /**
      * @swagger
      * /api/admin/transaction/create:
      *   post:
      *     tags:
      *       - Admin transaction
      *     summary: create transaction 
    
      *     parameters:
      *       - name: info
      *         description: 
      *         in: body
      *         required: false
      *         type: string
      *         schema:
      *             example : {
      *               amount   : 100000,
      *               bankCode: "NCB",
      *               orderDescription: "none nothing ",
      *                 orderType: "topup",
      *                 
      *         }
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async home({ request, response }) {
      
        var ipAddr = '27.71.204.118'/*request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
*/
    
    var dateFormat = require('dateformat');
    
    var tmnCode = 'EF1YI58G' //ok
    var secretKey = 'YVXFLXICKWAQEDPXKQUHWSIVFHSZICWY' //ok
    var vnpUrl = 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html' //ok
    var returnUrl = 'http://localhost:3333/api/admin/transaction/returnTransaction'

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    console.log(createDate)
    var orderId = dateFormat(date, 'HHmmss');
    const data = request.all()
    var amount = data.amount;
    var bankCode = data.bankCode;
    
    var orderInfo = data.orderDescription;
    var orderType = data.orderType;
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = '3';
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = bankCode;

    vnp_Params = this.sortObject(vnp_Params);

    
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

    

    var secureHash = sha256(signData);

    vnp_Params['vnp_SecureHashType'] =  'SHA256';
    vnp_Params['vnp_SecureHash'] = secureHash;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });

    //Neu muon dung Redirect thi dong dong ben duoi
    return response.status(200).json({code: '00', data: vnpUrl})
    //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
    //res.redirect(vnpUrl)


        
    }
    // function sort object 
     sortObject(o) {
        var sorted = {},
            key, a = [];
    
        for (key in o) {
            if (o.hasOwnProperty(key)) {
                a.push(key);
            }
        }
    
        a.sort();
    
        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }

    async returnTransaction ({request,response}){
        console.log( request.headers('x-forwarded-for'))
        response.send('okokok')
    }
  /**
      * @swagger
      * /api/admin/transaction/event:
      *   post:
      *     tags:
      *       - Admin transaction
      *     summary: events
    
      *     parameters:
      *       - name: info
      *         description: 
      *         in: body
      *         required: false
      *         type: string
      *         schema:
      *             example : {
      *               amount   : 100000,
      *               bankCode: "NCB",
      *               orderDescription: "none nothing ",
      *                 orderType: "topup",
      *                 
      *         }
      *     responses:
      *       200:
      *         description: Server is OK!
      *       500:
      *         description: Error Server Internal!
      */
    async event({request,response}){
        const data = {
            toEmail : 'minhtran.in@outlook.com',
            drawData:{},
            nameTemplate: 'none'
        }

        ee.emit('sendMail',data)
        return response.send('kka')
    }

}

module.exports = TransactionController
