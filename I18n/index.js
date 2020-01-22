import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { AsyncStorage } from 'react-native';



import fr from './fr.json';
import de from './de.json';
import en from './en.json';
import es from './es.json';

const STORAGE_KEY = '@APP:languageCode';

// creating a language detection plugin using expo
// http://i18n.com/docs/ownplugin/#languagedetector
const languageDetector = {
    init: Function.prototype,
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: async (callback) => {
        const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const lng = (savedDataJSON) ? savedDataJSON: null;
        const selectLanguage = lng || null;
      // console.log('detect - selectLanguage:', selectLanguage);
        callback(selectLanguage);
    },
    cacheUserLanguage: () => {}
};

i18n
    .use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        resources: { fr, en, de, es},

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: true,

        //   cache: {
        //  enabled: true
        // },

        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        }
    });


export default i18n;