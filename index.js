const http = require('http');
const url = require('url');
const PORT = 3001;

http.createServer( (req, res) => {
    const fullPath = url.parse(req.url, true);

    console.log("Href :" + fullPath.href)
    console.log("Path :" + fullPath.pathname)
    console.log("Search :" + fullPath.search)

    res.writeHead(200, "Woohoo! Connection Successful", {"Content-type": "text/html"})
    if (req.url === "/") {
        res.write("<h1>One Beautiful European Country</h1>")
        res.write("<p>This is a web page about one beautiful country</p>")
        res.write("<a style='margin-right: 16px' href='/country'>Sweden is the Country</a>")
        res.write(("<a style='margin-right: 16px' href='/capital'>Stockholm</a>"))
    }
    
    res.end();
}).listen(PORT, () => console.log(`Connected on port ${PORT}`))