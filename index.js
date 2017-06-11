const Alexa = require('alexa-sdk');
// facts.json contains an array of various city facts.
const facts = require('./facts.json');
// Your app id (appears near the top of the page in the Alexa Developer Console).
// We will pass this into our script via an environment variable.
const MY_APP_ID = process.env.APP_ID;
const VoiceLabs = require('voicelabs')('<App ID from the Voice Insights Dashboard>');
const track = (session, name, slots, text, callback) => VoiceLabs.track(session, name, slots, text, callback);

// Define some handlers
const handlers = {

  // A catch all handler when we don't understand the request
  Unhandled: function() {
    const text = 'Sorry, I\'m not sure what you mean.';

    track(this.event.session, 'Unhandled', null, text, () => {
      this.emit(':ask', text);
    });
  },

  // A handler to get a city fact.
  GetCityFactIntent: function() {
    const intent = this.event.request.intent;
    const index = Math.floor(Math.random() * facts.length);
    const text = facts[index];

    track(this.event.session, intent.name, intent.slots, text, () => {
      this.emit(':tell', text);
    });
  },

  'AMAZON.HelpIntent': function() {
    const intent = this.event.request.intent;
    const text = 'You can say tell me a fact, or, you can say exit... What can I help you with?',
          reprompt = 'What can I help you with?';

    track(this.event.session, intent.name, intent.slots, text, () => {
      this.emit(':ask', text, reprompt);
    });
  },

  'AMAZON.CancelIntent': function() {
    const intent = this.event.request.intent;

    track(this.event.session, intent.name, intent.slots, text, () => {
      this.emit(':tell', 'Goodbye!');
    });
  },

  'AMAZON.StopIntent': function() {
    const intent = this.event.request.intent;

    track(this.event.session, intent.name, intent.slots, text, () => {
      this.emit(':tell', 'Goodbye!');
    });
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
