const express = require('express');
const app = express();
const port = 8080;
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser('someSecureSignature'));

app.post('/login', (req, res) => {
    const option = {
        signed: true,
        httpOnly: true,
        sameSite: 'strict'
    }
    const { username } = req.body;

    res.cookie('username', username, option);
    res.send(`cookie was created for ${username}`);
})

app.get('/hello', (req, res) => {
    const { username } = req.signedCookies;
    if(username) {
        res.status(200).send(`Welcome ${username}`);
    } else {
        res.send(`${username} could not be found`);
    }
})

app.listen(port,() => {
    console.log(`listening to ${port}`)
})