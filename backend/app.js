const sqlite3 = require('sqlite3').verbose();
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    // /api/task : GET
    if (req.url === "/api/task" && req.method === "GET") {
        const todos = await new Todo().getTodos();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));
    }

    // /api/task/:id : GET
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const todo = await new Todo().getTodo(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/task/:id : DELETE
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
            let message = await new Todo().deleteTodo(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/task/:id : UPDATE
    else if (req.url.match(/\/api\/task\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[3];
            let updated_todo = await new Todo().updateTodo(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/task/ : POST
    else if (req.url === "/api/task" && req.method === "POST") {
        let todo_data = await getReqData(req);
        let todo = await new Todo().createTodo(JSON.parse(todo_data));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});



// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)`;

// insert = `INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)`;

// select = `SELECT * FROM users`;

// db.run(
//     insert,
//     ["aaa", 'bbb', 'w8nvm', '123qwe', 'abc@ya.ru'],
//     (err) => {
//         if (err) return console.error(err.message);
//     });

// db.all(
//     select,
//     [],
//     (err, rows) => {
//         if(err) return console.error(error.message);
//         rows.forEach((row) => {
//             console.log(row);
//         })
//     }

// )