const axios = require('axios');
const { response } = require('express');

async function getArnold() {
    const quote = await axios.get('https://api.chucknorris.io/jokes/random')
    
    //console.log(quote.data.value)
    return quote
}
let output = getArnold().then(onfulfilled => response.data.value)
console.log(output)