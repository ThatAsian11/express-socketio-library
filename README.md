# Library 2.0

Remade my [express-library](https://github.com/ThatAsian11/express-library) project using SocketIO and Express

This one looks and behaves almost exactly like Library 1.0 except that the page never reloads and some other refinements (animations, loading gif, etc.)

I also didn't use a templating engine for this one (Unlike the previous iteration which uses Pug/Jade)
Everything is rendered using pure Javascript

Use `npm start` or `nodemon start` to start server


Yo, this is me from the future. Looking back, I realize that I had a very poor understanding of what `socketio` actually does. I was under the impression that it was used to transfer data and trigger events between the front and the back end without reloading the entire page. I know now that is not the case at all. What I've created is something that can be done much more easily with `AJAX`. Lesson learned, it was fun anyway.