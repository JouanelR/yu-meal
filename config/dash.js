process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const express = require('express');
const router = express.Router();


module.exports = {
    

    dataCallback: function (req, res) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("User data received!");
            console.log(1)
            dataDiv = document.getElementById('result-container');
            // Set current data text
            dataDiv.innerHTML = xhr.responseText;
        }
    },  
    
    sendDataCallback: function (req, res) {
        if (xhr.readyState == 4 && xhr.status == 201) {
            res.render(xhr.responseText);
        }
    },

    getDashboard: function (req, res) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        xhr = null;
        /*dataToSend = req.body.id;
        if (!dataToSend) {
            console.log("Data is empty.");
        }*/
        dataToSend = req.body.douille.value;
        if (!dataToSend) {
            console.log("Data is empty.");            
        }
        console.log("Sending data: " + dataToSend);
        if (!xhr) {
            // Create a new XMLHttpRequest object 
            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            xhr = new XMLHttpRequest();
        }
        xhr.onreadystatechange = dataCallback();
        
        // asynchronous requests
        console.log("Sending request to server...");
        xhr.open("POST", "http://localhost:6969/dashboard", true);
        console.log("Receving data...");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Send the request over the network
        xhr.send(JSON.stringify({"data": dataToSend}));
        console.log("Data sent!");
        console.log("ici")
    },

    test: function (req, res) {
        console.log("test")
    },

    recommendationHandle: function(req, res) {
        console.log("recommendationHandle")
        const { email, password} = req.body;
        console.log(email);
        console.log(password);
        res.render('dashboard', {
            email,
            password
        })
    }
};