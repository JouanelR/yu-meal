process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const express = require('express');
const router = express.Router();


//------------ Importing Controllers ------------//

const authController = require('../controllers/authController.js')

router.get('/dashboard');
//router.post('/dashboard', authController.dashboardRecomendation);

let xhr = null;
getXmlHttpRequestObject = function () {
    if (!xhr) {
        // Create a new XMLHttpRequest object 
        xhr = new XMLHttpRequest();
    }
    return xhr;
};
function dataCallback() {
    // Check response is ready or not
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("User data received!");
        console.log(1)
    
        dataDiv = document.getElementById('result-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
    }
}
function sendDataCallback() {
    // Check response is ready or not
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Creation data received");
        
    
        dataDiv = document.getElementById('result-container');
        // Set current data text
        dataDiv.innerHTML = xhr.responseText;
    }
}

function sendData() {
    dataToSend = id;
    if (!dataToSend) {
        console.log("Data is empty.");
        return;
    }
    console.log("Sending data: " + dataToSend);
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = sendDataCallback;
    // asynchronous requests
    console.log("Sending request to server...");
    xhr.open("POST", "http://localhost:6969/dashboard", true);
    console.log("Receving data...");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Send the request over the network
    xhr.send(JSON.stringify({"data": dataToSend}));
}


function getDashboard() {
    sendData();
    /*console.log("Get users...");
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = dataCallback;
    // asynchronous requests
    xhr.open("GET", "http://localhost:6969/dashboard", true);
    // Send the request over the network
    xhr.send();*/
}
