/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const data = {
    'es': [
        'Los girasoles jóvenes exhiben heliotropismo, lo que significa que sus cabezas siguen al sol de este a oeste durante el día..',
        'Los girasoles son nativos de América del Norte. Se cree que fueron domesticados por los nativos americanos hace más de 4,500 años y se utilizaron como fuente de alimento, aceite y pigmentos naturales..',
        'Los girasoles son una importante fuente de aceite vegetal. El aceite de girasol es valorado por su alto contenido de ácido linoleico y vitamina E.',
        'Además de su aceite, las semillas de girasol son un popular snack y una fuente de alimento para aves.',
        'Los girasoles pueden crecer hasta 3 metros de altura en unos pocos meses. La variedad más alta registrada alcanzó 9.17 metros.',
        'Un girasol no es una sola flor, sino que está compuesto de miles de pequeñas flores individuales llamadas flósculos. ',
        'Las semillas de girasol están dispuestas en un patrón de espirales que sigue la secuencia de Fibonacci, lo que maximiza la eficiencia en el empaquetamiento de las semillas.',
        'Los girasoles son excelentes para atraer polinizadores como abejas y mariposas.'
    ],
    'en': [
        'Young sunflowers exhibit heliotropism, meaning their heads follow the sun from east to west during the day.',
        'Sunflowers are native to North America. It is believed they were domesticated by Native Americans over 4,500 years ago and used as a source of food, oil, and natural pigments.',
        'Sunflowers are an important source of vegetable oil. Sunflower oil is valued for its high content of linoleic acid and vitamin E.',
        'In addition to their oil, sunflower seeds are a popular snack and a food source for birds.',
        'Sunflowers can grow up to 3 meters in height in just a few months. The tallest recorded variety reached 9.17 meters.',
        'A sunflower is not a single flower but is composed of thousands of individual small flowers called florets.',
        'Sunflower seeds are arranged in a spiral pattern following the Fibonacci sequence, maximizing efficiency in seed packing.',
        'Sunflowers are excellent at attracting pollinators such as bees and butterflies.'
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const language = locale.startsWith('es') ? 'es' : 'en';
        const greeting = language === 'es' ? '¡Hola! Bienvenida Arely a Curiosidades de los girasoles. Puedes decir, "Dime un dato curioso."' : 
                                             'Hello! Welcome Arely to curiosities Sunflowers. You can say, "Tell me a curious fact."';
        return handlerInput.responseBuilder
            .speak(greeting)
            .reprompt(greeting)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const locale = Alexa.getLocale(handlerInput.requestEnvelope);
        const language = locale.startsWith('es') ? 'es' : 'en';
        const frasesArray = data[language];
        const frasesIndice = Math.floor(Math.random() * frasesArray.length);
        const randomFrase = frasesArray[frasesIndice];
        const speakOutput = language === 'es' ? `Un dato curioso es: ${randomFrase}` : 
                                               `A curious fact is: ${randomFrase}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        FrasesIntentHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();