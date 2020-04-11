// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory,ActionTypes, CardFactory } = require('botbuilder');
const { QnAMaker } = require('botbuilder-ai');
const { TranslationSettings } = require('./translationSettings');

const englishEnglish = TranslationSettings.englishEnglish;
const englishSpanish = TranslationSettings.englishSpanish;
const spanishEnglish = TranslationSettings.spanishEnglish;
const spanishSpanish = TranslationSettings.spanishSpanish;
const englishDutch = TranslationSettings.englishDutch;
const dutchDutch = TranslationSettings.dutchDutch;

const WelcomeCard = require('./welcomeCard.json');

class MyBot extends ActivityHandler {
      constructor(userState, languagePreferenceProperty, configuration, qnaOptions) {
         super();
         if (!configuration) throw new Error('[QnaMakerBot]: Missing parameter. configuration is required');
         if (!userState) {
            throw new Error('[MultilingualBot]: Missing parameter. userState is required');
        }
        if (!languagePreferenceProperty) {
            throw new Error('[MultilingualBot]: Missing parameter. languagePreferenceProperty is required');
        }
        this.userState = userState;
        this.languagePreferenceProperty = languagePreferenceProperty;
         // now create a qnaMaker connector.
         this.qnaMaker = new QnAMaker(configuration, qnaOptions);
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {

            if (isLanguageChangeRequested(context.activity.text)) {
                const currentLang = context.activity.text.toLowerCase();
                const lang = currentLang; //=== englishEnglish || currentLang === spanishEnglish ? englishEnglish : englishSpanish;

                // Get the user language preference from the user state.
                await this.languagePreferenceProperty.set(context, lang);

                // If the user requested a language change through the suggested actions with values "es" or "en",
                // simply change the user's language preference in the user state.
                // The translation middleware will catch this setting and translate both ways to the user's
                // selected language.
                // If Spanish was selected by the user, the reply below will actually be shown in spanish to the user.
                await context.sendActivity(`Your current language code is: ${ lang }`);
            } else{
 
//            
            // send user input to QnA Maker.
            const qnaResults = await this.qnaMaker.getAnswers(context);
            
    
            // If an answer was received from QnA Maker, send the answer back to the user.
            if (qnaResults[0]) {
                
                if(qnaResults[0].score > 0.6 && qnaResults[0].answer != 'hello')
                    await context.sendActivity( qnaResults[0].answer);
                else 
                    await context.sendActivity("Sorry, we couldn't determine any advice");
            }
            else {
                // If no answers were returned from QnA Maker, reply with help.
                await context.sendActivity('Enter patient\'s symptoms'
                    + ` such as Fever,dizziness, shortness of breath`);
            }
            await next();
            }
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
 
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {

                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
    async run(context) {
        await super.run(context);

        // Save state changes
        await this.userState.saveChanges(context);
    }
}
function isLanguageChangeRequested(utterance) {
    // If the utterance is empty or the utterance is not a supported language code,
    // then there is no language change requested
    if (!utterance) {
        return false;
    }

    // We know that the utterance is a language code. If the code sent in the utterance
    // is different from the current language, then a change was indeed requested
    utterance = utterance.toLowerCase().trim();
    return utterance === englishSpanish || utterance === englishEnglish || utterance === spanishSpanish || utterance === spanishEnglish || utterance === englishDutch || utterance === dutchDutch;
}

module.exports.MyBot = MyBot;
