const express = require('express')
const app = express()
const cors = require('cors')
const req = require('express/lib/request')
const PORT = 8000

app.use(cors())
app.use(express.json())









app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})
// Get all Quotes
app.get('/api/quotes', (request, response) => {
    response.json(quotes)
})
// Gets random quote
app.get('/api/random', (request, response) => {
    let randomChoice = Math.ceil(Math.random() * quotes.length)
    response.json(quotes[randomChoice])
})
// Gets quote by Author
app.get('/api/author/:author', (request, response) => {
    let userChoice = request.params.author.toLowerCase()
    let authorsQuotes = quotes.filter(quote => quote.author.toLowerCase() === userChoice)
    if(authorsQuotes){
        response.json(authorsQuotes)
    }else{
        response.sendStatus(404).end()
    }
    
})
// Get quote by ID
app.get('/api/id/:id', (request, response) => {
    const id = Number(request.params.id)
    const quote = quotes.find(quote => quote.id === id)

    if (quote) {
        response.json(quote)
    } else {
        response.status(404).end()
    }
})


// app.delete('/api/quotes/:id', (request, response) =>{
//     const id = String(request.params.id)
//     const quote = quotes.find(quote => quote.id === id)
    
    
//         response.sendStatus(204).end()
// })
app.post('/api/quotes', (request, response) => {
    
    const maxId = quotes.length > 0
    ? Math.max(...quotes.map(n => n.id)) 
    : 0

    const quote = request.body
    quote.id = maxId + 1
    quotes = quotes.concat(quote)
    response.json(quote)
})



app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on ${PORT}`)
})






let quotes = [
    // Epictetus
    {
        quote: 'Seek not that the things which happen should happen as you wish; but wish the things which happen to be as they are, and you will have a tranquil flow of life.',
        author: 'Epictetus',
        source: 'Enchiridion',
        id: 1
    }, {
        quote: 'On the occasion of every accident that befalls you, remember to turn to yourself and inquire what power you have for turning it to use.',
        author: 'Epictetus',
        source: 'Discourses',
        id: 2
    }, {
        quote: 'We must not believe the many, who say that only free people ought to be educated, but we should rather believe the philosophers who say that only the educated are free.',
        author: 'Epictetus',
        source: 'Enchiridion',
        id: 3
    }, {
        quote: 'You become what you give your attention to.',
        author: 'Epictetus',
        source: 'The Art of Living',
        id: 4
    }, {
        quote: 'Your happiness depends on three things, all of which are within your power: your will, your ideas concerning the events in which you are involved, and the use you make of your ideas.',
        author: 'Epictetus',
        source: 'Enchiridion',
        id: 5
    },

    // Marcus Aurelius
    {
        quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
        id: 6
    }, {
        quote: 'Dwell on the beauty of life. Watch the stars, and see yourself running with them.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
        id: 7
    }, {
        quote: 'The happiness of your life depends upon the quality of your thoughts.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
        id: 8
    }, {
        quote: 'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
        id: 9
    }, {
        quote: 'Waste no more time arguing about what a good man should be. Be one.',
        author: 'Marcus Aurelius',
        source: 'Meditations',
        id: 10
    },

    // Seneca
    {
        quote: 'They lose the day in expectation of the night, and the night in fear of the dawn.',
        author: 'Seneca',
        source: 'On the Shortness of Life',
        id: 11
    }, {
        quote: 'But life is very short and anxious for those who forget the past, neglect the present, and fear the future.',
        author: 'Seneca',
        source: 'On the Shortness of Life',
        id: 12
    }, {
        quote: 'Of all people only those are at leisure who make time for philosophy, only those are really alive. For they not only keep a good watch over their own lifetimes, but they annex every age to theirs.',
        author: 'Seneca',
        source: 'On the Shortness of Life',
        id: 13
    }, {
        quote: 'All things that are still to come lie in uncertainty; live straightway!',
        author: 'Seneca',
        source: 'On the Shortness of Life',
        id: 14
    }, {
        quote: `The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today. You are arranging what is in Fortune's control and abandoning what lies in yours.`,
        author: 'Seneca',
        source: 'On the Shortness of Life',
        id: 15
    },
]