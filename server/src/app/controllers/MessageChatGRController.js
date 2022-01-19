const MessageGR = require('../models/MessagesGR')

class MessageChatGRController {

    createMSGR(req, res,next) {
        const msgr = new MessageGR(req.body)
        if(req.body.message == '') {}
        else {
            msgr.save()
                    .then(() => {
                        res.status(201).send(req.body);
                    } )
                    .catch(next)
        }
    }

    findMessageByGroup(req, res, next) {

        MessageGR.find({idGroup:req.params.id})
            .then((data)=>{
                if(data){
                    res.status(201).send(data)
                }
                else{}
            })
    }

    findMessageByUser(req, res, next) {
        MessageGR.find({username: req.params.username})
            .then((data) => {
                if(data){
                    res.status(200).send(data)
                }
                else{

                }
            })
    }
    

}

module.exports = new MessageChatGRController();