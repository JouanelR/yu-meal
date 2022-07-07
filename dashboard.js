process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var requirejs = require('requirejs');


const passport = require('passport');


const User = require('../models/User');

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
                        dataToSend = "1234";
                        if (!dataToSend) {
                            console.log("Data is empty.");
                            return;
                        }
                        console.log("Sending data: " + dataToSend);
                        xhr = getXmlHttpRequestObject();
                        xhr.onreadystatechange = sendDataCallback;
                        // asynchronous requests
                        xhr.open("POST", "http://localhost:6969/dashboard", true);
                        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        // Send the request over the network
                        xhr.send(JSON.stringify({"data": dataToSend}));
                    }
                   
                    

function getDashboard() {
    console.log("Get users...");
    xhr = getXmlHttpRequestObject();
    xhr.onreadystatechange = dataCallback;
    // asynchronous requests
    xhr.open("GET", "http://localhost:6969/dashboard", true);
    // Send the request over the network
    xhr.send();
}