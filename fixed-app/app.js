const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

/**
* POST /
* Given a list of GitHub users names, return information about those developers:
* Given JSON body like {developers: [username, ...]}
* Return [ {name, bio}, ... ]
*/

app.post('/', async function(req, res, next) {
    try {
        //Create array of promises from github with given usernames
        let promisesArr = req.body.developers.map(async dev => {
            return await axios.get(`https://api.github.com/users/${dev}`);
        });
        
        //wait for requests to finish and handle all promises in array
        let results = await Promise.all(promisesArr);
        
        //create new array with result data
        let out = results.map(r => ({
            name: r.data.name,
            bio: r.data.bio
        }));

        //return data as json
        return res.json(out)
    } catch(err) {
        next(err);
    }
});

/** 404 handler */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err)
});

/** general error handler */

// app.use((err, req, res, next) => {
//     let status = err.status || 500;

//     return res.status(status).json({
//         error: err.message,
//         status
//     });
// });

app.listen(3000, function () {
    console.log('App on port 3000');
})

module.exports = app;