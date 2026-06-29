click here--->event listener--->event queue--->eventLoop--->event handler

# v8 vs libuv

*V8*

1. Open-source : javaScript engine by google
2. Used in Chorm and Node.js
3. Compiles javaScript to Native machine
4. Ensures high-perFormmance JavaScrit execution

*Libuv*
1. Multi-platform support library for Node.js
2. Handles asynchronous I?O operations.
3. Manages File system, network, and timers non-blockingly across platforms.

# Event Loop

1. timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
2. pending callbacks: executes I/O callbacks deferred to the next loop iteration.
3. idle, prepare: only used internally.
4. poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
5. check: setImmediate() callbacks are invoked here.
6. close callbacks: some close callbacks, e.g. socket.on('close', ...).

    |-> timers            |     
    |   pending callbacks |   |-------|
    |   idle, prepare     |<--|       |
    |   poll              |<--|       |
    |   check             |   |-------|
    |-> close callbacks   |


