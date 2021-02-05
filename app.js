// IMPORT PACKAGES
import dotenv from 'dotenv';
dotenv.config();
import express, { response } from 'express';
import pkg from 'node-wit';
const {Wit} = pkg;

// APP
const app = express();
// WIT.AU TOKEN
// GO TO https://wit.ai/ 
// login with your facebook account
// Create a new app and
// Get the token
// TRAIN THE AI

const accessToken = process.env.WIT_AI_TOKEN;
// console.log(accessToken)

// DEFINE THE CLIENT AND HANDLE MESSAGES
const handleMessage = async message =>{
    try{
        const client = new Wit({accessToken});
        // Send the message to the AI
        const response = await  client.message(message, {});
        // CHECK RESPONSE
        if(response) {
        
            // return console.log(response);
            // HANDEL RESPONSE FUNCTION
            handleResponse(response);
        }

    }catch(error){
        if(error) console.log(error);
    }
}
// Run message function
handleMessage('Hello');

// HANDLE RESPONSE
const handleResponse = response =>{
    let name = undefined;
    let confidence = 0;
    // Loop
    Array(response).forEach(r=>{
        if(r.intents.length > 0){
            name = r.intents[0].name;
            confidence = r.intents[0].confidence;
        }
         console.log(name, confidence);
    });

    // SWITCH
    switch(name){
        case 'hello':
            // return console.log('Hello, can I help you?');
            return handleHello();
        default:
            // return console.log("Please don't forget good manners, say hello first!");
            return handleGibberish();
    }
}

// HANDLE HELLO
const handleHello = ()=>{
    return console.log('Hello, can I help you?');
}
// HANDLE GIBBERISH
const handleGibberish = ()=>{
    return console.log("Please don't forget good manners, say hello first!");
}

// SERVER LISTENER
app.listen(process.env.PORT, ()=>{
    console.log(`Server running 🏃‍♂️ 💨 🏃💨 on port ${process.env.PORT}`);
})