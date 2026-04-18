const fs = require('fs')
const readline = require('readline')

function userInputIntro() {
    console.log('What you want \n 1)id number \n 2)Phone Number \n 3) userNumber')
    console.log('If you want reset Enter reset')
}

function userInfo(input) {
    if (input == '1') {
        console.log('Your User ID number is 29642');
    }
    if (input == '2') {
        console.log('Your User Phone number is 9811442710');

    }
    if (input == '3') {
        console.log('Your User User name is harsh');
    }
}

function processStream(req, res) {
    res.setHeader('Content-Type', 'text/html')
    if (req.url === '/') {
        // 1. write() — newline nahi lagata
        process.stdout.write("Hello ");
        process.stdout.write("World\n"); // Output: Hello World

        //process.stdout.columns;    // terminal width (e.g. 80)
        //process.stdout.rows;       // terminal height (e.g. 24)
        //process.stdout.isTTY;      // true if terminal, false if pipe/file

        // 2. console.log ke andar stdout hi use hota hai
        console.log("Hi"); // internally: process.stdout.write("Hi\n")
        console.log(process.stdout.columns)
        console.log(process.stdout.rows)
        console.log(process.stdout.isTTY)
    } else if (req.url === '/Progress') {
        let i = 0;
        let timer = setInterval(() => {
            process.stdout.clearLine(0);       // line clear karo
            process.stdout.cursorTo(2, 4);        // cursor start pe le jao first argu is for cloume and second argu is for row 
            process.stdout.write(`Loading ${i++}`)
            if (i > 50) {
                clearInterval(timer)
                process.stdout.write('\nDone!\n')
            }
        }, 50)
    } else if (req.url === '/hijack') {
        const fileStream = fs.createWriteStream('Output.txt')
        process.stdout.write = fileStream.write.bind(fileStream)
        console.log('yeh file mein jayega') // terminal pe nahi dikhega Output.txtx ma print hogaa
        console.log('hello') // terminal pe nahi dikhega Output.txtx ma print hogaa
    } else if (req.url === '/Stream') {
        let state = 'idle'
        process.stdin.setEncoding("utf8");
        process.stdin.on('data', (input) => {
            let userInput = input.trim()
            if (userInput == 'exit') {
                console.log("Exiting...");
                // process.exit() // pusra server or process.stdin.on sub close hojay ga 
                process.stdin.pause(); // only process.stdin.on  close hoga
            }
            if (state == 'idle') {
                if (userInput == 'hello') {
                    userInputIntro()

                    state = 'main'
                }
            } if (state == 'main') {
                userInfo(userInput)
                if (userInput == 'reset') {
                    state = 'idle'
                    console.log("Reset ho gaya. Type 'hello' again.");
                }

            }
        })
        process.stdin.on("end", () => {
            console.log("Input band ho gaya");
        });
    } else if (req.url == '/readline') {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        let state = 'idle'
        rl.on('line', (data) => {
            const userInput = data.trim();
            if (userInput == 'exit') {
                rl.close();
                return
            }
            if (state === 'idle') {
                if (userInput === 'hello') {
                    userInputIntro()
                    state = 'main'
                }
            } else if (state === 'main') {
                userInfo(userInput)
                if (userInput == 'reset') {
                    state = 'idle'
                    console.log("Reset ho gaya. Type 'hello' again.");
                }
            }
        })
        // rl.question('Do you want your OS info then write yes or no',(answer)=>{
        //     if(answer == 'hello')
        //     rl.close()
        // })
    } else if (req.url === '/Multiple') {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        function poocho(sawaal) {
            return new Promise((resolve) => rl.question(sawaal, resolve));
        }

        async function main() {
            const naam = await poocho("Naam: ");
            const umar = await poocho("Umar: ");
            console.log(`${naam} ki umar ${umar} saal hai`);
            rl.close();
        }

        main();
    }
    res.end()
}

module.exports = processStream