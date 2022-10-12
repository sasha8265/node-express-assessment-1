const axios = require('axios');
const fs = require('fs');
const argv = process.argv;


function processFile(path) {
    fs.readFile(path, 'utf8', async function (err, data) {
        if (err) {
            console.error(`Could not read file ${readFile}: ${err}`);
            process.exit(1);
        }
        //add individual urls from file to new array, splitting at line break and removing any unusable spaces
        let urlArr = data.split('\n').filter(u => u != '');
        for (let url of urlArr) {
            let resp;

            try {
                resp = (await axios.get(url)).data;
            } catch {
                console.error(`Invalid URL: ${url}`);
                //this is what I was missing:
                continue; //lets our code move on to the next url even if a url fails
            }

            //reads and modifies the url
            //returns a string of the url with only the domain name
            let fileName = new URL(url).hostname; 

            //writes the data to a new file if one doesn't exist or replaces the file is one exists
            fs.writeFile(fileName, resp, 'utf8', err => {
                if (err) {
                    console.error(`Could not save data for ${fileName}`);
                }
                console.log(`Successfully created ${fileName}`);
            });
        }
    });
}

//executes the function using the path name passed in the command line at index 2
processFile(argv[2]);