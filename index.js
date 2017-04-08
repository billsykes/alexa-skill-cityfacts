const Alexa = require('alexa-sdk');
// facts.json contains an array of various city facts.
const facts = require('./facts.json');
// Your app id (appears near the top of the page in the Alexa Developer Console).
// We will pass this into our script via an environment variable.
const MY_APP_ID = process.env.APP_ID;

// Define some handlers
const handlers = {

  // A catch all handler when we don't understand the request
  Unhandled: function() {
    this.emit(':ask', 'Sorry, I\'m not sure what you mean.');
  },

  // A handler to get a city fact.
  GetCityFactIntent: function() {
    const index = Math.floor(Math.random() * facts.length);

    this.emit(':tell', facts[index]);
  }
};

// This will be the handler called by AWS lambda when invoked by Alexa.
exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);

  // Note that Amazon's Alexa tutorial incorrectly uses alexa.APP_ID
  alexa.appId = MY_APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
