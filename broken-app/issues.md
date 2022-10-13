# Broken App Issues

## Project Setup

* Packages imported with `let` and `var` - should all be declared with `const` since they should never change
* `app.listen` missing callback function
* not exporting the app - `module.exports = app`



## Other Issues

* Async needed for the post request function so we can use `await` to wait for requests to finish before handling the promises
* Need to handle the promises array with `Promise.all()` once requests are completed to get the data
* `catch(err)` missing `err` 
* not handling errors - needs error handler middleware for `next(err)` to move to 
