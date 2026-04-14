# What is process in Node.js?

👉 process is a global object in Node.js
👉 It represents the currently running Node.js program

console.log(process);



# 📌 process.argv (Node.js Notes)

## 🔹 What is process.argv?

`process.argv` is a **built-in global array in Node.js** that stores the **command-line arguments** passed when running a script.

It belongs to the `process` object in Node.js.

---

## 🔹 Structure of process.argv

When you run:

```bash
node app.js hello 123
```

Node creates:

```js
[
  '/path/to/node',   // index 0 → Node executable path
  '/path/to/app.js', // index 1 → Script file path
  'hello',           // index 2 → First argument
  '123'              // index 3 → Second argument
]
```

---

## 🔹 Key Points

* It is always an **array**
* First two values are **system-related**, not user input
* Your actual inputs start from **index 2**

---

## 🔹 Getting Only User Arguments

```js
const args = process.argv.slice(2);
console.log(args);
```

Output:

```js
['hello', '123']
```

---

## 🔹 Data Type Warning ⚠️

All values are **strings**, even numbers:

```js
typeof process.argv[3]; // "string"
```

Convert manually if needed:

```js
const num = Number(process.argv[3]);
```

---

## 🔹 How It Works Internally

1. You type a command in terminal:

   ```bash
   node app.js hello 123
   ```

2. The **operating system splits input by spaces**

3. Arguments are passed to Node (from low-level C/C++ `argv`)

4. Node exposes them as:

   ```js
   process.argv
   ```

---

## 🔹 Use Cases

* Building CLI tools
* Passing dynamic input to scripts
* Automation scripts
* Custom commands (like npm, git)

---

## 🔹 Mental Model

```
Terminal Input → OS Parsing → Node Receives → process.argv → Your Code Uses It
```

---

## 🔹 Common Mistake ❌

Thinking Node parses the command itself.

✔️ Reality:

* Terminal/OS splits arguments
* Node just receives them

---

## 🔹 Example

```js
const args = process.argv.slice(2);

if (args[0] === "greet") {
  console.log(`Hello, ${args[1]}`);
}
```

Run:

```bash
node app.js greet fullStrack
```

Output:

```
Hello, fullStrack
```

---

## 🔥 Summary

* `process.argv` = command-line arguments
* First 2 values = system info
* Use `.slice(2)` for user input
* Everything is a string
* Core building block for CLI tools


# 📌 process.exit() (Node.js Notes)

## 🔹 What is process.exit()?

`process.exit()` is a built-in method in Node.js that **immediately terminates the running process**.

It belongs to the `process` object in Node.js.

---

## 🔹 Syntax

```js
process.exit(code);
```

* `code = 0` → success ✅
* `code ≠ 0` → error ❌

---

## 🔹 What it Does Internally

When `process.exit()` is called:

1. Node stops the **event loop instantly**
2. Pending async tasks are **abandoned**
3. Control is returned to the **operating system**
4. Exit status code is sent to OS

---

## 🔹 Common Use Cases

### 1️⃣ Fatal Error Handling

```js
if (!process.env.API_KEY) {
  console.error("API key missing");
  process.exit(1);
}
```

👉 Stop execution when critical data is missing

---

### 2️⃣ CLI Input Validation

```js
const args = process.argv.slice(2);

if (!args[0]) {
  console.log("Please provide a command");
  process.exit(1);
}
```

👉 Prevent running invalid commands

---

### 3️⃣ Script Success / Failure Status

```js
if (success) {
  process.exit(0);
} else {
  process.exit(1);
}
```

👉 Used in automation tools, CI/CD pipelines

---

### 4️⃣ Force Stop Execution

```js
console.log("Stopping program...");
process.exit(0);
```

👉 Immediately ends the program

---

## 🔹 Exit Codes

| Code | Meaning       |
| ---- | ------------- |
| 0    | Success       |
| 1    | General error |
| 2+   | Custom errors |


## 🔹 Important Warning ⚠️

`process.exit()` **kills everything immediately**, including async tasks.

setTimeout(() => {
  console.log("This will NOT run");
}, 1000);

process.exit(0);

👉 Timer never executes

## 🔹 Best Practice
✔️ Use `process.exit()` only when:

* CLI tools
* Scripts
* Fatal errors

❌ Avoid in:
* Servers
* Long-running apps
## 🔹 Better Alternative
Let Node exit naturally:
return;
or allow the event loop to finish.

## 🔹 Mental Model
process.exit() → Stop program instantly → Return status to OS

## 🔥 Summary
* `process.exit()` stops Node immediately
* Skips async operations
* Returns exit code to OS
* Useful for CLI tools and error handling
* Dangerous if overused



4. process.cwd()
console.log(process.cwd());

👉 Where Node is running from



🔹 Exit Event
process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});

🔹 Uncaught Error
process.on('uncaughtException', (err) => {
  console.log('Error:', err);
});

👉 Prevents crash (use carefully)