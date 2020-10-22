'use strict';

const { query } = require('express');
// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: "meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);

  })

  .get('/monkey-message', (req, res) => {
    const randomTime = Math.floor(Math.random() * 3000);
    const messages = [
      "oohooh aaaaH aaaah",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];

    const message = { author: 'monkey', text: messages[Math.floor(Math.random() * messages.length)] };
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime)
  })

  .get('/parrot-message', (req, res) => {
    const { userMessage } = req.query;
    const message = { author: 'parrot', text: userMessage }
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);

  })

  .get('/bot-message', (req, res) => {
    console.log(req.query.text)
    const randomTime = Math.floor(Math.random() * 3000);
    const commonGreetings = [
      "hi",
      "hello",
      "howdy",
      "hiya!"];
    const commonGoodbyes = [
      "bye",
      "goodbye",
      "see ya!",
      "so long!"];


    const getBotMessage = (inputText) => {
      let botMsg = inputText;
      let containsHello = false;
      let containsGoodbye = false;

      commonGreetings.forEach((greeting) => {
        if (inputText.toLowerCase().includes(greeting)) {
          containsHello = true;
        }
      })

      commonGoodbyes.forEach((greeting) => {
        if (inputText.toLowerCase().includes(greeting)) {
          containsGoodbye = true;
        }
      })

      if (containsHello) {
        botMsg = "Hello!";
      } else if (containsGoodbye) {
        botMsg = "Goodbye";
      }
      return botMsg;
    }
    console.log(getBotMessage("hi"))

    const message = { author: 'bot', text: `Bzzt ${getBotMessage(req.query.text)}` };


    setTimeout(() => {
      res.status(200).json({ status: 200, message })
    }, randomTime);

  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
