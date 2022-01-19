const DRRoom = require('../models/DRRoom')

class DRRoomController {

    //[POST]/drroom/create
    create(req, res,next) {
        const drroom = new DRRoom(req.body)
        drroom.save()
            .then(() => {
                res.status(201).send(req.body);
            } )
            .catch(next)
    }

    findRoom(req, res, next) {
        DRRoom.findOne({$or:[{username1:req.body.username1,username2:req.body.username2}, {username2:req.body.username1,username1:req.body.username2}]})
            .then((data)=>{
                if(data){
                    res.send({exists:true,data})
                }
                else{
                    res.send({exists:false})
                }
            })
    }

    findRoomByUser(req, res, next) {

        DRRoom.find({$or:[{username1:req.params.username},{username2:req.params.username}],status:"on"})
            .then((data)=>{
                if(data){
                    res.send(data)
                }
                else{}
            })
    }

    //[PUT]//drroom/:id
    update(req, res, next) {
        DRRoom.updateOne({_id: req.params.id}, req.body)
            .then(() => res.status(201))
            .catch(next)
    }


}

module.exports = new DRRoomController();