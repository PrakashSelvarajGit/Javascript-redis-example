This is a simple code(from a Javascript Beginner!) to connect Redis using ioredis library using Javascript. Developed on Mac. 

1. Install node.js(https://nodejs.org/en/download).
2. Install ioredis library: 
```
npm install ioredis
```

4. Refer to the library in the code:
```
const Redis = require('ioredis')
```

To create a connection, a URL can be formed, and it can be used to create the connection object like the following: 
```
const redis = new Redis(URL);  // URL format: redis://<username>:<Password>@<Endpoint>:<Port> 
``` 

Then, the available methods from this library can perform operations on the Redis database like 
redis.get(), redis.set(), etc.

Run the Javascript like the following:
```
node JSUsingIoRedis.js
```
It will ask for a series of inputs about the Redis database connection credentials, the type of operation to perform(currently String and Hash are added) and performs the specific operation on the database. 
