const redis = require('ioredis');

function showConnectionPopup() {
  document.getElementById('popupManipulation').style.display = 'none';
        document.getElementById('popupConnection').style.display = 'block';
    }

    function showManipulationPopup() {
  document.getElementById('popupConnection').style.display = 'none';
        document.getElementById('popupManipulation').style.display = 'block';
    }

function testConnection() {
  // Retrieve credentials from input fields
  var endpoint = document.getElementById('dbEndpoint').value;
  var password = document.getElementById('dbPassword').value;
  var port = document.getElementById('dbPort').value;

  const url = "redis://default:"+password+"@"+endpoint+":"+port;

  var connectionResult = simulateDatabaseConnectionTest(url);
  document.getElementById('result').innerText = connectionResult;
}

function simulateDatabaseConnectionTest(url) {
  const redis = new Redis(url);
  redis.on('connect', () => { 
    return 'Connected to Redis! Proceeding with the command execution...';
  }); 
}

//function simulateDatabaseConnectionTest(url) {

//    if (url) {
//        return 'Connection successful!';
//    } else {
//        return 'Connection failed. Please provide valid credentials.';
//    }
//  }
  
function testManipulation() {
  // Retrieve credentials from input fields
  var dataType = document.getElementById('datatype').value;
  var operationType = document.getElementById('operationtype').value;
  var operationKey = document.getElementById('operationKey').value;
  var operationValue = document.getElementById('operationValue').value;
}


