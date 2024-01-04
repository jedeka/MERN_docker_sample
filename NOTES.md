# Building full stack website 

## Preparation
1. create server.js file
2. `npm init` and install express, mongoose, body-parser. Mongoose is used for node to talk with mongo

## About JS
- Arrow function `=>` can be used to simplify function
```
e.g. 
- => (param1, param2) => param1 + param2;
- param1 => param1 * param 1; // can use no parantheses for single param
- wishlist.save()
    .then(newWishlist => {
        response.send(newWishlist);
    })
    .catch(err => {
        response.status(500).send({error:"Could not create wishlist"})
    });
``` 
- Promise is an important concept in js asynchronous programming. Example of the object will proceed, with the order of execution:
```
class HttpService {
    getProducts = () => {
        // 1st
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3004/product')  // 2nd
            .then(response => { console.log(response.json()); }); //4th, if resolved
            .catch(error => {...})  // 4th, if rejected
        })
        return promise; // 3rd
    }
}
```
Promise created -> Promise pending, and can be returned -> If Promise "fulfilled", it will execute the then(...) if Promise resolved, else it will catch the catch(...) to return the error. 
Note that during pending, another Promise in the next iteration can be created simultaneously (Q: is it using another thread?).
- JS function binding: https://www.geeksforgeeks.org/javascript-function-binding/#:~:text=We%20use%20the%20Bind(),function%20or%20method%20is%20invoked.
e.g.
```
this.loadData = this.loadData.bind(this);
^the variable           ^the function declared inside the object
```

## About MongoDB
- On promises, callback, async/await
    - Callback: function called as an argument for other function. This function must be done executing and return back result to the calling function in order to work. 
    - Promises: the object returned during asynchronous programming that might be currently running, will eventually (i.e. _promised_ to) succeed/fail. 

- Mongo pluralizes the singular collection name by default. Refer to this to force the name: https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name
- 

## About ReactJS
- create-react-app.
    - Install by `npm install -g create-react-app`
    - Execute `create-react-app <APP NAME>`
- React has reusable components, unlike ordinary html css. 
- ES6 is superset of js. Much more modularized than js, providing transpiler (Babel/babelrc) that convert well written ES6 to ordinary js, since most of the website still uses js.
-  `<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />` %PUBLIC_URL% will be replaced with the actual pathname for the _public_ directory here. This is a feature by react css script. 
- React Props (properties): written as a tag in html
    e.g. Say there is a class called "Product". Then, in the js file that will be exported (for example: product.js), the props can be declared `this.props.<PROP NAME>`
    ```js
    // product.js
    import React, {Component} from 'react';
    import './product.css'

    class Product extends Component {
    render() {
        return(
        <div className='card'>
            <img className="card-img-top" src={this.props.imgUrl} alt="Product"></img>
            <div className="card=block">
            <h4 className="card-title">{this.props.title}</h4>
            <p className="card-text">Price: ${this.props.price}</p>
            <a href="#" className="btn btn-primary">Add to Wishlist</a>
            </div>
        </div>
        );
    }
    }

    export default Product;
    ```     
    ```html
    <!-- App.js -->
    ...

    <div className="App-main">
        <Product price="4.23" title="Soaps" imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7Fha9JNVhi__LpZW7ZGY9A50gPbq3zl9Wuymw9DEwQ&s"/>
    </div>
    
    ...
    ```

## About Docker
- If we are using docker compose, there should be a starting command, because if not, the state will be exit(0) as follows:
```
 Name    Command   State    Ports
---------------------------------
server   bash      Exit 0       
```
This is why building through dockerfile with docker compose handy. 
- Or, for the case of running existing container without specifying command indefinitely, simple trick would be specifying command in docker-compose.yml:
```
services:
  node:
    image: webtest
    container_name: server
    command: tail -f /dev/null
    ....
```

- With docker-compose, when the container starts, a network by default will be created and all containers join and can communicate to each other (become a part of a bigger virtual container)
- Where is the volume stored at, if the specified doesn't exist? => @ "/var/lib/docker/volumes/".
Example: (See the volume's hash with `docker volume ls`)
```
jdk@jdk:~/wbdev$ docker volume inspect 0c1630c1ff11b14759fd800b38df8b2ea01d86ab02e6b6fc3866ec4c1f95bfa5
[
    {
        "CreatedAt": "2023-07-28T02:15:36+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/0c1630c1ff11b14759fd800b38df8b2ea01d86ab02e6b6fc3866ec4c1f95bfa5/_data",
        "Name": "0c1630c1ff11b14759fd800b38df8b2ea01d86ab02e6b6fc3866ec4c1f95bfa5",
        "Options": null,
        "Scope": "local"
    }
]
```

- More notes: see directly in docker-compose.yml
- Good tutorial:
    - https://www.youtube.com/watch?v=vm3YfOHf_Cc
    - https://github.com/trulymittal/Nodejs-REST-API/blob/master/app.js 

## Additional Links:
- What is a driver in software? https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/what-is-a-driver-
- https://medium.com/@Bigscal-Technologies/how-to-set-up-node-js-with-mongodb-using-docker-49b5fb849bc7
- https://hevodata.com/learn/docker-nodejs-mongodb/
- https://blog.tericcabrel.com/using-docker-and-docker-compose-with-nodejs-and-mongodb/
- https://docs.docker.com/compose/gettingstarted/
- About container reuse with previous data volume: https://stackoverflow.com/questions/36756168/reuse-containers-with-docker-compose#:~:text=1%20Answer&text=Compose%20will%20always%20reuse%20containers,any%20time%20without%20losing%20anything.
- https://www.freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/#:~:text=Just%20to%20review%2C%20a%20promise,is%20called%20the%20executor%20function%20.

## Unsolved issues:
- This issue persists
react.development.js:209 Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the App component.

### Commands
db.products.insertMany([{"product":"car", "price":"12"}])
db.products.deleteMany({"product":"car"})
db.products.find()

- Better use npm ci for package installation

## Troubleshooting
- If we want to use update for new commit (saving changes of image)
    - `docker commit <NAME/HASH OF EXISTING CONTAINER> <IMAGE NAME>`
    - run new container with new image 
    https://stackoverflow.com/questions/28302178/how-can-i-add-a-volume-to-an-existing-docker-container
- What if there is an error using mongoose inside docker?
    - Upgrade nodejs version. Install n (node version manager) with `npm install -g n`, and then execute `n stable` for latest stable version
    - Try `node --version`, if not the latest -> `cd /bin && mv node node_old && ln -s /usr/local/n/versions/node/x.x.x/bin/node`. Replace x.x.x with the version
    - Probably mongodb driver is not installed. Use `npm install --save mongodb` 
        Helpful links:
        - https://www.mongodb.com/community/forums/t/not-able-to-connect-to-database-from-the-vs-code/221533
        - https://techvblogs.com/blog/update-nodejs-latest-version-ubuntu
        - https://stackoverflow.com/questions/28943319/cannot-upgrade-node-js-using-n#:~:text=On%20occasion%20the%20n%20package,what%20I%20had%20to%20do.&text=Resolved%20by%20nvm%20.
- Changing read/write/execute (rwx) permission/mode of a directory recursively: `sudo chmod -R 777 <DIR_NAME>`
- If we encounter this error:
```
react Access to fetch at 'http://localhost:3004/product' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
This is due to CORS problem that doesn't allow localhost:3000 here to fetch from db in localhost:3004. Solved by installing cors (`npm install cors`) and adding cors in the target server (server.js) as follows:
```
var express = require('express');
var app = express();
var cors = require('cors'); 
app.use(cors());
```
    - Refs: 
        - https://stackoverflow.com/questions/49343024/getting-typeerror-failed-to-fetch-when-the-request-hasnt-actually-failed
        - https://stackoverflow.com/questions/41497674/access-control-allow-origin-issue-when-api-call-made-from-react-isomorphic-ap
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
        - ChatGPT
- Whenever the web looks odd, inspect. 




- The more you break things down, the more reusable it is, vice versa. 

## Scratch (Trash notes)    
db.products.drop()
db.wishlists.drop()

wishlist.save(function(err, newWishlist){
if (err) {
    response.status(500).send({error:""});
} else {
    response.send();
}

className is a bootstrap thing 
props.xxx => taking argument xxx when html object in react is called 

currently the database is not updated. later learn how to update

