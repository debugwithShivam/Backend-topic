# what is Express

1. Express.js is a minimal and flexible web application framework for Node.js.
2. It provides a robust set of features for building single-page, multi-page, and hybrid web applications.
3. Express.js simplifies server-side coding by providing a layer of fundamental web application features.


// middleware es aisa function hota hai jo har route se pahle chalta hai, iska matlab saare routes mein koi bhi chale usse pahle middleware chalta hai and usmein likha code pahle execute hota hai  


// user jo data bahje ga wo (req) handle karta hai 
// backend sa jo data cline ko bahje jay ga wo res sa baja jay ga


/*
node ke saath ek dikkat hai ki agar control ek baar bhi kisi middleware par gaya to control khud se agle route/middleware par nahi jaayega, use agle par lejaane ke liye aapko push karna padega aur ye push kahlaayega
next ko chalaana
*/


// templete engines
// templete engines example => pug, handledars, ejs, jade
// ejs is html with superpower 
// ejs setup karna ke liya 
// 1) ejs install (npm i ejs)
// 2) configure ejs app.set("view engine ejs")
// 3)ek views folder banao
// 4)usmein ejs files banao
// 5)send ki jagah render karo => render karte waqt make aure aap view folder ke ander waali hi koi file kaa name likha aur render function ma .ejs mention naa karein

// static files
// images, stylesheets, frontend js setup karna
// static files setup karne ke liya
// 1)create a folder called public
// 2)create three folders inside it, images, stylesheets,javascript
// 3)configure the express static in script.js file
// 4) understand the path



// dynamic routing
// asia koi bhi route jiska koi hissa baar baar same rehta hai and kuchh hissa baar baar change hota hai iska liya aap ek dynaimg route bana skte ho

// url mein jab bhi aapke pass ek aisa pattern ho
// /profile/:useename
// :useename<--params



// route parameters
// - to make any route dynamic you can use : at the place where you want to make it dynamic, and to access there value use req.params





// req mein saara data hota hai aane waale user ki request ki taraf ka, jaise ki uski location, device onfo and other things, 
// res mein controls hote hai jinke basis pe hum server se response bhej paate hai, next is just a push so that our request moves to the next thing which should be executed
