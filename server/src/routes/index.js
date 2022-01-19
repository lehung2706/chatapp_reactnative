
const userRouter = require('./user');
const drroomRouter = require('./drroom');
const msdrRouter = require('./messagedr');
const grRouter = require('./group');
const grmRouter = require('./groupmember');
const msgrRouter = require('./messagegr');

function route(app) {
    app.use('/user',userRouter);
    app.use('/drroom',drroomRouter);
    app.use('/msdr',msdrRouter);
    app.use('/gr',grRouter);
    app.use('/grm',grmRouter);
    app.use('/msgr',msgrRouter);
}

module.exports = route;
