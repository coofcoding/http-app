
/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async () => {

    const res = await fetch(import.meta.env.VITE_API_URL);
    const data = await res.json(res);

    return data[0];
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async (element) => {

    document.querySelector('#app-title').innerHTML = 'Breakingbad App';
    element.innerHTML = 'Loading...';

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'New Quote';

    const renderQuote = ( { quote, author } ) => {
        quoteLabel.innerHTML = quote;
        authorLabel.innerHTML = author;
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    }

    const renderError = ( error ) => {
        quoteLabel.innerHTML = `Error: ${ error }, please try again!`;
        authorLabel.innerHTML = '';
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    }

    const doRequest = () => fetchQuote().then( renderQuote ).catch( renderError );

    nextQuoteButton.addEventListener('click', () => {
        
        element.innerHTML = 'Loading...';

        doRequest();
    });

    doRequest();
}