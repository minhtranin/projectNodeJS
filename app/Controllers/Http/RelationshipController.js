'use strict'
const Many1 = use('App/Models/Many1')
class RelationshipController {
    /**
      * @swagger
      * /api/relationship/create:
      *   post:
      *     tags:
      *       - Test Relationship
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
        //const person = await Many1.find(2);
        const person = await Many1.create({name:"hoa"})
        const pivot = await person.many().attach(person.id)
         return response.send(pivot)
     }
}

module.exports = RelationshipController
