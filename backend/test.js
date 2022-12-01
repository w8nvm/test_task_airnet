const sqlite3 = require('sqlite3').verbose();
const data = require("./data");

let db;
const tableName = `tasks`

async function initializeDB() {
    db = new sqlite3.Database('./tasks.db');
    await create_table();
    await add_initial_data();
    await create_task('abc', 1, 1669775360525);
    await show_all();
}

async function create_table() {
    return new Promise(function (resolve, reject) {
        db.run(`CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY, desc TEXT, completed INTEGER, date INTEGER)`, err => {
            if (err) return reject(err);
            resolve();
        });
    })
}

async function add_initial_data() {
    const insertGivenData = `INSERT INTO ${tableName}(desc, completed, date) VALUES (?, ?, ?)`;
    for await (const task of data) {
        db.run(
            insertGivenData,
            [task.desc, task.completed, task.date],
            (err) => {
                if (err) return (err);
                return ;
            })
    }
}

async function show_all() {
    return new Promise(function (resolve, reject) {
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) return reject(err);
            for (const row of rows) {
                resolve(console.log(row));
            }
        });
    })
}

async function create_task(...data) {
    const insertGivenData = `INSERT INTO ${tableName}(desc, completed, date) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(insertGivenData,
            [...data],
            (err) => {
                if(err) return reject(err);
                return resolve();
            })
    })
}

initializeDB();


// db2.serialize(function () {
//     // Create a table
//     db2.run("CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT)");

//     // Insert data into the table
//     db2.run("INSERT INTO Foo (name) VALUES ('bar')");

//     // Query data from the table
//     db2.each("SELECT id, name FROM Foo", function (err, row) {
//         console.log(row.id + ": " + row.name);
//     });
// });

// db2.close();