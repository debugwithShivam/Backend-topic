<!-- Chapter 1 -->

# Backend/Full-stack

1.Node and express fundamentals
2.complex Rest API
3.Mern App
4.Node Fundamentals
5.express.js
6.mongoDB
7.application
8.deployment

# NodeJs

Enviroment to run JS outside Browser
build on chrome's V8 Js Engine
Big Community
Full-stack

# What is the Diff B/W Browser and Node.js

Browser | Node.js
DOM | No Dom
Window | No window
Interactive App | Server Side Apps
No FileSystem | FileSystem
Fragmentation | Versions
ES6 Modules | CommonJs

# what is Node.js

1. Js Runtime : node is an opensource, cross platform runtime envirnoment for executing js code outside of a browser.
2. Nodejs is a js in a different enviroment means Running Js on the server or any Computer
3. Build on chrome's V8 Engine:it runs on the V8 engine,
   which compiles js directly to navtive machine code, enhancing performance
4. V8 is written in C++ for speed
5. V8 + Backend Features = Node.js
6. Design : Features an event-driven , non-blocking I?O model for efficiency.
7. Full-stack JS allows using js on both server and client side
8. Scalability: Ideal for Scalable network application due to its architecture.
9. Versatility: suitable for web, real-time
   chate , and Rest API server

# nodeJs Features (Added)

1. Non-blocking I/O : Designed To perform non-blocking operations By default,
   making it Suitable for I/O-heavy Operation.
2. Networking Support Lower-level network application that browser cant't handle. and Support TCP/UDP sockets, which are crucial for build lower-level network application that browsers can't hamdle.
3. File system Access: Provides API to read and write files directly, whict is noy possible in browser environment for secuity resasons.
4. Server-side Capabilities : Node.js Enable JS to run on the server, handling Http reqwuests file operations, and other server-side functionalities.
5. Modules : Organize COde Into Reusable modules using require(..

# nodeJs Features (Remove)

1. Window Object the global window object which is part of web browsers, is absent in Node.js
2. DOM manipulation: node.js does not have a build-in document object Model (Dom), as it is not intended to interact with a webpage's content.
3. BOM (Broser Object Model) : No Direct Interaction with thing link
   Navigator or screen which are part of BOM in browser.
4. Webspecific API : APIs Like localStorage, sessionStorage, and Browser-based fetch are not available in Node.js.

# JavaScript on Client

1.Displays Web page: Turns HTML code Into what you see on screen.
2.User Click:Helps You Interact with the web page.
3.Update Content: Allows Changes to the page using JS
4.Loads Files:Get HTML,images,etc., from the server

# JavaScript on Server

1. Database Management: Stores, retrieves, and manages data
   efficiently through operations like CRUD (Create, Read, Update, Delete..
2. Authentication: Verifies user identities to control access to the system, ensuring that users are who they claim to be.
3. Authorization: Determines what authenticated users are allowed to do by managing permissions and access controls.
4. Input Validation: Checks incoming data for correctness,
   completeness, and security to prevent malicious data entry and errors.
5. Session Management: Tracks user activity across various
   requests to maintain state and manage user-specific settings.
   Back End/Server-Side
   node US

# JavaScript on Server

1. Database Management: Stores, retrieves, and manages data
   efficiently through operations like CRUD (Create, Read, Update, Delete).
   BackEnd/Server
2. Authentication: Verifies user identities to control access to the system, ensuring that users are who they claim to be.
3. Authorization: Determines what authenticated users are allowed to do by managing permissions and access controls.
4. Input Validation: Checks incoming data for correctness,
   completeness, and security to prevent malicious data entry and errors.
5. Session Management: Tracks user activity across various
   requests to maintain state and manage user-specific settings.
   ned
6. API Management: Provides and handles interfaces for
   applications to interact, ensuring smooth data exchange and integration.
7. Error Handling: Manages and responds to errors effectively to maintain system stability and provide useful error messages.
8. Security Measures: Implements protocols to protect data from unauthorized access and attacks, such as SQL injection and cross-site scripting (XSS).
9. Data Encryption: Secures sensitive information by encrypting data stored in databases and during transmission.
10. Logging and Monitoring: Keeps records of system activity to diagnose issues and monitor system health and security.

# Other uses of NodeJs

1. Local Utility Scripts: Automates tasks and
   processes files locally, like using shell scripts but with JavaScript.
2. Internet of Things (IoT): Develops server-side
   applications for loT devices, managing communications and data processing.
3. Scripting for Automation: Automates repetitive
   tasks in software development processes, such as testing and deployment.
4. Real-Time Applications: Efficiently manages real-time data applications, such as chat apps and live updates, using WebSockets.
5. Desktop Applications: Creates cross-platform desktop applications using frameworks like Electron.
6. Build Tools: Powers build processes
   for front-end technologies using tools like: Webpack, Grunt,Gulp,Browserify,Brunch,Yeoman,Webpack

# Server architecture with Node

Nodejs server will:

1. Create server and listen to incoming requests
2. Business logic: validation, connect to db, actual processing of Data
3. Return response HTML, JSON, CSS, JS

<!-- Chapter 2 -->

# Installation of NodeJS

1. What is IDE
2. Need of IDE
3. MAC Setup
   Install latest Node & VsCode
4. Windows Setup
   Install latest Node & VsCode
5. Linux Setup
   Install latest Node & VsCode
6. VsCode (Extensions and Settings)
7. Executing first.js file
8. What is REPL (REPL = Read → Eval → Print → Loop) Node
9. Executing Code via REPL

# What is IDE (Integrated Development Environment)
1. IDE stands for Integrated Development Environment.
2. Software suite that consolidates basic tools required   for software development.
3. Central hub for coding, finding problems, and testing.
4. Designed to improve developer efficiency.


(Ek aisi software jisme programming ke saare tools ek hi jagah milte hain.)
🧠 Simple analogy

Soch:
Notepad = sirf likhne ke liye
IDE = full setup workshop 🔥
likhna
check karna
run karna
debug karna

# Need of IDE
1. Streamlines development.
2. Increases productivity.
3. Simplifies complex tasks.
4. Offers a unified workspace.
5. IDE Features
1. Code Autocomplete
2. Syntax Highlighting
3. Version Control
4. Error Checking

# Node Core Modules
1. Built-in: Core modules are included with Node.js installation.
2. No Installation Needed: Directly available for use without npm install.
3. Performance: Highly optimized for performance.

# Node Core Modules
1. fs (File System): Handles file operations like reading and writing files.
2. http: Creates HTTP servers and makes HTTP requests.
3. https: Launch a SSL Server.
4. path: Provides utilities for handling and transforming file
5. paths.os: Provides operating system-related utility methods and properties.
6. events: Handles events and event-driven programming.
7. crypto: Provides cryptographic functionalities like hashing and encryption.
8. url: Parses and formats URL strings.

# Require Keyword
1. Purpose: Imports modules in Node.js.
2. Caching: Modules are cached after the first require call.
3. .js is added automatically and is not needed to at the end of module name.
4. Path Resolution: Node.js searches for modules in core, node_modules, and file paths.

Syntax:
const moduleName = require('module')

// Load the built-in http module 
const http = require('http');

// Load the third party express module 
const express = require('expres') 

// Load the custom myModule module
const myModule = require('./mymodule')



# process
1. process ek aisa object hai jo har Node.js file me automatically available hota hai, bina require() ke
2. Ye bina kisi import ke kaam karega (console.log(process))
3. Ye represent karta hai: current running Node program

📦 Example:
console.log(process.pid) 👉 tera program ka process ID
console.log(process.platform) 👉 kaunsa OS chal raha hai
console.log(process.argv) 👉 command line arguments



# Node jab start hota hai:
👉 wo internally kuch cheeze inject karta hai:
process
console
setTimeout
setImmediate

👉 Ye sab automatically available hote hain

# process.exit() kya karta hai
👉 Simple: Node.js program ko turant band kar deta hai

console.log("Start")

process.exit()

console.log("End")

🧠 Output:
Start

👉 “End” kabhi print nahi hoga
👉 kyunki program beech me hi band ho gaya

# Internally kya hota hai

Jab tu likhta hai:

process.exit()

👉 Node:

event loop stop karta hai
pending kaam ignore karta hai
process terminate kar deta hai

🔥 Important properties
1. process.env console.log(process.env.PORT) 👉 environment variables
2. process.cwd()  👉 current working directory
3. process.exit()  👉 program close
4. process.nextTick() 👉 microtask queue me kaam daalna


<!-- Sync code → Microtasks → Macrotasks -->




event loop and its faces 
kasa async task libuv handle karta hai 