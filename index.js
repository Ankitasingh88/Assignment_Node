const http = require('http');
const url = require('url');
const fs = require("fs");

const PORT = 3001;

http.createServer( (req, res) => {
    const fullPath = url.parse(req.url, true);
   
    res.writeHead(200, "Woohoo! Connection Successful", {"Content-type": "text/html"})

    if (fullPath.pathname === "/") {
        res.write("<h1>A Beautiful European Country!</h1>")
        res.write("<a style='margin-right: 16px' href='/country'>Sweden</a>")
        res.write("<a style='margin-right: 16px' href='/capital'>Stockholm</a>")
        res.write("<div>This is a web page about Sweden - A beautiful country in Europe !!</div>")     
    }

    if (fullPath.pathname === "/country") {
        res.write("<h1>Sweden is one of the most beautiful countries in Europe !!</h1>")
        res.write("<div><p>Sweden has some of the best cities in Europe </p></div>")
        res.write("<a style='margin-right: 16px' href='/'>Home</a>")
        res.write("<a style='margin-right: 16px' href='/capital'>Stockholm</a>")
        res.write("<div>To read more about Sweden , please click on a link below</div>")
        res.write("<a style='margin-right: 16px' href='/country?name=stockholm'>Largest City of Sweden</a>")
        res.write("<a style='margin-right: 16px' href='/country?name=malmo'>Great City in South of Sweden</a>")

        let queries = fullPath.query

        if (queries.name === "stockholm") {
            res.write("<div> </div>")
            fs.readFile('./data/stockholm.txt', (err, data) => {
                if (err) {
                    res.write("Something went wrong")
                } else {
                    res.write(data)
                }
                res.end();
            })
        }

        if (queries.name === "malmo") {
            fs.readFile('./data/malmo.html', (err, data) => {
                if (err) {
                    res.write(`<div>Something went wrong: ${err}</div>`)
                } else {
                    res.write(data)
                }
                res.end();
            })
        }

    } else if (fullPath.path.includes("capital")) {
        res.write("<h1>Stockholm Is The Capital Of Sweden!!</h1>")
        res.write("<p>It is the most poulated city of Sweden</p>")
        res.write("<a href='/'>Home</a>")
        res.write("<p> </p>")
        fs.readFile('./data/stockholm.txt', (err, data) => {
            if (err) {
                res.write("Something went wrong")
            } else {
                res.write(data)
            }
            res.end();
        })
    }

    fs.readFile('./data/footer.html', (err, data) => {
        if (err) {
            console.log("Oops!")
        } else {
            res.write(data)
        }
        res.end()
     })

}).listen(PORT, () => console.log(`Connected on port ${PORT}`))
