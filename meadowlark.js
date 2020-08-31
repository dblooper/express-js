const express = require('express');
const expressHandlebars = require('express-handlebars');
const port = process.env.PORT || 3000;

const app = express();
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

const fortune = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple."
];

// app.get('/:testParam', (req, res) => {
//     res.type('text/plain');
//     res.status(200)
//     res.send(`Hello world ${req.params.testParam}`)
// });

app.get('/', (req, res) => {
    res.render('home');
});

// app.get('/about', (req, res) => {
//     res.render('about');
// });

app.get('/about', (req, res) => {
    let randomValue = Math.random()
    let index = Math.floor(randomValue * fortune.length)
    console.log(randomValue)
    console.log(index)
    randomFortune = fortune[index]
    res.render('about', {fortune: randomFortune});
});
// app.use((req, res) => {
//     res.contentType('text/plain');
//     res.status(404);
//     res.send('404 - Error not found')
// });
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

// app.use((err, req, res, next) => {
//     console.log(err.message);
//     res.type('text/plain');
//     res.status(500);
//     res.send('500 - Invernal Server Error');
// });

app.use((err,req,res,next) => {
    console.log(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(`Server started on port ${port}`));