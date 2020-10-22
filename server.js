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
      "hello",
      "howdy",
      "hiya!"];
    const commonGoodbyes = [
      "bye",
      "goodbye",
      "so long!"];

    const jokes = [
      "Most people are shocked when they find out how bad I am as an electrician.</br> Do you want to hear another joke?(y/n)",
      "Moses had the first tablet that could connect to the cloud.</br> Do you want to hear another joke?(y/n)",
      "Thanks for explaining the word “many” to me, it means a lot.</br> Do you want to hear another joke?(y/n)",
      "I went to buy some camo pants but couldn’t find any.</br> Do you want to hear another joke?(y/n)",
      "Don’t you hate it when someone answers their own questions? I do.</br> Do you want to hear another joke?(y/n)",
      "The problem with kleptomaniacs is that they always take things literally.</br> Do you want to hear another joke?(y/n)",
      "I was addicted to the hokey pokey, but then I turned myself around.</br> Do you want to hear another joke?(y/n)",
      "A told my girlfriend she drew her eyebrows too high. She seemed surprised.</br> Do you want to hear another joke?(y/n)",
      "The last thing I want to do is hurt you; but it’s still on the list.</br> Do you want to hear another joke?(y/n)"

    ]


    const getBotMessage = (inputText) => {
      let botMsg = inputText;
      let containsHello = false;
      let containsGoodbye = false;
      let hearJoke = false;

      if (inputText.toLowerCase() === "something funny") {
        hearJoke = true;
      }

      if (inputText.toLowerCase() === "n") {
        containsGoodbye = true;
      }

      if (inputText.toLowerCase() === "y") {
        botMsg = jokes[Math.floor(Math.random() * jokes.length)]
      }

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
      } else if (hearJoke) {
        botMsg = "do you want to hear a joke?(y/n)";
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
