const Group = require('../models/Group')



class GroupChatController {

    createGR(req, res,next) {
        const group = new Group(req.body)
        group.save()
                .then(() => {
                    res.status(201).send(req.body);
                } )
                .catch(next)
    }



    listgroup(req, res,next){
        Group.find({})
            .then((data)=> res.status(200).send(data))
    }

    updateGroup (req, res, next){
        Group.updateOne({_id: req.params.id}, req.body)
            .then(() => res.status(201))
            .catch(next)
    }
    

}

module.exports = new GroupChatController();