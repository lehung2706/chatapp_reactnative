const User = require('../models/User')

class UserController {

   
    findUsers (req, res, next) {
       User.find({fullname:RegExp(req.params.fullname)})
           .then((data)=> {
                res.status(201).send(data)
           })
           .catch((res) => res.status(500))
    }

    //[POST]/user/register
    create(req, res,next) {
        const user = new User(req.body)
        user.save()
            .then(() => {
                res.status(201).send(req.body);
            } )
            .catch(next)
    }

    //[POST]/user/login
    login(req, res, next) {
        User.findOne({username: req.body.username, password: req.body.password})
            .then((data)=>{
                if(data){
                    res.send({exists:true,data})
                }
                else{
                    res.send({exists:false})
                }
            })

    }

    findUserByUserName(req, res, next) {
        User.findOne({username: req.params.username})
            .then((data)=> {
                res.status(201).send(data)
            })
            .catch((res) => res.status(500))

    }

    updateUser(req, res, next) {
        User.updateOne({username: req.params.username},req.body)
            .then(() => {
                res.status(201)
            } )
            .catch(next)
    }
}

module.exports = new UserController();