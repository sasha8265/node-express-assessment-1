# Conceptual Exercise

Answer the following questions below:



### What are some ways of managing asynchronous code in JavaScript?

Using Callbacks - provide functions to be executed after asynchronous code has finished.

Using Promises to chain methods together - wait until `getPromise()` has completed and `then()` call a function

Using async and await keywords to tell the code to execute in a certain order. Uses try/catch to `try` running a block of code and if it fails `catch` any errors. 

### What is a Promise?

Has 3 states: pending, resolved, rejected. 

A promise is an object that represents *eventual* completion of an operation - either a resolved value or a reason why it was rejected. 

### What are the differences between an async function and a regular function?

**Regular functions** will continue to run in order even if they haven't received response data back yet from a request, which could result in an error. 

**Async functions** have at least one piece of code that depends on the completion of another part (exp an api call). They run in the order we tell them to - Other code within the scope of the function will be blocked from running everytime we await until we tell it to continue, and code outside the function can continue to run even if the one before didn't complete.

### What is the difference between Node.js and Express.js?

**Node.js** is a Javascript environment that runs on the server side to build web applications, scripts nd command line tools. 

**Express.js** is a framework to work with Node.js that provides a set of features for building applications.

### What is the error-first callback pattern?

`function(error, request, response, next)`

### What is middleware?

Code that runs in the middle of a request and response cycle - it runs between the time that the request comes to the servers and when the server responds back with something.

### What does the `next` function do?

Tells Express to run the next set of relevent code - A route will run and `next` will move on to the next handler if one matches: either another route handler if one matches, or some middleware, like our error handler.

### What are some issues with the following code? 

***(consider all aspects: performance, structure, naming, etc)***

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

* each request is dependant on the request before it finishing, but we don't need any of the data from the previous request for the next one
* We can fire all of our promises at (almost) the same time and catch the responses at the same time with promise.all() instead

```javascript
async function getUsers(usersArr) {
    const baseUrl = 'https://api.github.com/users/'
    const urls = []

    for (user of usersArr) {
        urls.push(baseUrl + user)
    }

    const promises = urls.map((url) =>
        axios.get(url)
            .then((response) => response.data)
            .catch(e => console.log("INVALID USERNAME", e))
    );
    const data = await Promise.all(promises);
    console.log(data);
    return data;
}
```

