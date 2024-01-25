const Redis = require('ioredis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let redisUrl = ""; 

// Create an array to store Answers for the questions asked about Redis endpoint, password and port. 
const questions = [
  'Enter the endpoint: ',
  'Enter the password: ',
  'Enter the port: ',
  'Enter the input type [String, Hash]: ',
  'Enter the operation type [SET, GET]: ',
  'Enter the key: ',
  'Enter the value/field: '
];

// Create an empty object to store answers
const answers = {};

function askQuestion(index) {
  if (index < questions.length) {
    rl.question(`${questions[index]} `, (answer) => {
      answers[questions[index]] = answer;
      askQuestion(index + 1); // Ask the next question
    });
  } 
  else {
    // All questions have been asked, close the interface and process the answers
    rl.close();
    let redisUrl = processAnswers();
    const redis = new Redis(redisUrl);
    redis.on('connect', () => { 
        console.log('Connected to Redis! Proceeding with the command execution...'); 
        
        let keyType = answers[questions[3]];
        let operationType = answers[questions[4]];

// To set the value for a key in String datatype       

        if (keyType == "String" && operationType == "SET"){
            const redisStringInsert = new Redis(redisUrl);
 
            redisStringInsert.set(answers[questions[5]], answers[questions[6]])
            .then(() => {
            console.log(`Successfully set value for key '${answers[questions[5]]}' as '${answers[questions[6]]}'`);
            })
            .catch(err => {
            console.error('Error setting value in Redis:', err);
            })
            .finally(() => {
            // Close the Redis connection
           redisStringInsert.quit();
           });

        }

// To retrieve the value for a key in String datatype

        if (keyType == "String" && operationType == "GET"){

            const redisStringRetrieve = new Redis(redisUrl);

            // Specify the key you want to retrieve
            const keyToRetrieve = answers[questions[5]];
            
            // Use the 'get' method to retrieve the value associated with the key
            redisStringRetrieve.get(keyToRetrieve)
              .then(value => {
                console.log(`Value for key '${keyToRetrieve}': ${value}`);
              })
              .catch(err => {
                console.error(err);
              })
              .finally(() => {
                // Close the Redis connection
                redisStringRetrieve.quit();
              });

        }
       
 // To set the value for a key in Hash datatype

        if (keyType == "Hash" && operationType == "SET"){     
            
            const redisHashInsert = new Redis(redisUrl);
            hashKey = answers[questions[5]]; 
            hashFieldAndValue = answers[questions[6]];
            const [hashField, hashValue] = hashFieldAndValue.split(':');

            redisHashInsert.hmset(hashKey, hashField, hashValue)
            .then(() => {
            console.log(`Fields set in hash ${hashKey}`);
            })
            .catch((err) => {
            console.error('Error setting fields in hash:', err);
            })
            .finally(() => {
            // Close the connection when done
            redisHashInsert.quit();
           });


       }
// To get the value for a key/field in Hash datatype

       if (keyType == "Hash" && operationType == "GET"){          
            const redisHashRetrieve = new Redis(redisUrl);
            hashGetKey = answers[questions[5]]; 
            hashGetField = answers[questions[6]];

            redisHashRetrieve.hget(hashGetKey, hashGetField)
            .then((value) => {
            if (value !== null) {
            console.log(`Value of ${hashGetField} in hash ${hashGetKey}: ${value}`);
            } else {
            console.log(`Field ${hashGetField} does not exist in hash ${hashGetKey}`);
            }
            })
            .catch((err) => {
            console.error('Error getting value from hash:', err);
            })
            .finally(() => {
            // Close the connection when done
            redisHashRetrieve.quit();
            });

       }

    redis.quit(); 
    });

    redis.on('error', (err) => {console.error('Error connecting to Redis:', err);});
  }
}

function processAnswers() {
  // Process and use the answers as needed
  redisUrl = "redis://default:" + answers[questions[1]] + "@" + answers[questions[0]] + ":" + answers[questions[2]];  
  return redisUrl; 
}

// Start asking questions
askQuestion(0);




