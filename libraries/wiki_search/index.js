const wiki = require('wikijs').default
const settings = require('./settings');

const getApiUrlByLanguage = (languageISOCode) => {
    return `https://${languageISOCode}.wikipedia.org/w/api.php`;
};

const fetchSearchToWikiAPI = async (elementToSearch, languageISOCode = null) => {
    const results = { searchedBy: elementToSearch, content: null, error: false, stack: null };
    const wikiSettings = settings.wiki;

    wikiSettings.apiUrl = languageISOCode ? getApiUrlByLanguage(languageISOCode) : wikiSettings.apiUrl;

    try {
        const search = await wiki(wikiSettings).page(elementToSearch);
        const content = await search.content();

        results.content = content;
    } 
    catch (error) {
        results.stack = error;
        results.error = true;
    }

    return results;
};

const wiki_search = {
    searchElement: async (element) => {
        const results = await fetchSearchToWikiAPI(element);

        return results;
    },

    searchElementByLanguage: async (element, languageISOCode) => {
        const results = await fetchSearchToWikiAPI(element, languageISOCode);

        return results;
    }
};

module.exports = wiki_search;