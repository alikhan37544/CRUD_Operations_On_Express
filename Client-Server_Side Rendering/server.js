const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    // here, we read the HTML from the disk
    // This is what Vivek sir mentioned, I'm using a very very basic kind of approach on the same. 

    fs.readFile('index.html', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error loading page');
        }
        // This is the point where the server side modificaiton is done.
        // We are going to use the data.replace command here, to replace the HTML
        // Javascript to me seems like a mix of C++ and Python, with new syntax.
        const updated = data.replace(
            '<h1 id="greeting">Hello world, this is what will be replaced!</h1>',
            '<h1 id="greeting">Hello world, this is what will be replaced!</h1>'
        );
        res.send(updated);
    });
}); 

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});