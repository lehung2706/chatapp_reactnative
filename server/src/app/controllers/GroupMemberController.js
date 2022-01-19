const GroupMember = require('../models/GroupMember')


class GroupMemberController {

    createGRM(req, res,next) {
        const groupM = new GroupMember(req.body)
        groupM.save()
                .then(() => {
                    res.status(201).send(req.body);
                } )
                .catch(next)
    }

    findRoomByUser(req, res, next) {
        GroupMember.findOne({username: req.params.username})
            .then((data)=> {
                res.status(201).send(data)
            })
            .catch((res) => res.status(500))
    }


    
    

}

module.exports = new GroupMemberController();