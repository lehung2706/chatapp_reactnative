const Message = require('../models/MessagesDR')

class MessageController {

    //[POST]/drroom/create
    create(req, res,next) {
        const message = new Message(req.body)
        if(req.body.message == '') {}
        else {
            message.save()
                .then(() => {
                    res.status(201).send(req.body);
                } )
                .catch(next)

        }
    }

    findMessageByRoom(req, res, next) {

        Message.find({idRoom:req.params.id})
            .then((data)=>{
                if(data){
                    res.status(201).send(data)
                }
                else{}
            })
    }

}

module.exports = new MessageController();