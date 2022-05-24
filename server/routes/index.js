const userRoute = require('./user');

function route(app) {
    app.use('/api/auth', userRoute);
    app.get('/', (req, res) => {
        res.send('hello');
    });
}

module.exports = route;
