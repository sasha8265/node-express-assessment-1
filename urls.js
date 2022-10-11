const axios = require('axios');
const fs = require('fs');
const argv = process.argv;


const readFile = argv[2];

fs.readFile(readFile, 'utf8', function (err, data) {
    if (err) {
        console.error(`Could not read file: ${readFile}`, err);
        process.kill(1);
    }
    urlArr = data.toString().split('\n')

    async function writeFiles(urlArr) {
        const promises = urlArr.map((url) =>
            axios.get(url)
                .then((response) => response.data)
                .catch(e => console.log('Invalid URL'))
        );

        const data = await Promise.all(promises);
        console.log(data);
        return data;
    }
    writeFiles(urlArr);
    // fs.appendFile(path, data, 'utf8', err => {
    // if (err) {
    //     console.log("ERROR!!!", err)
    //     process.kill(1)
    // }
    // console.log("IT WORKED!")
    // })

    // console.log(urlArr);
    // return urlArr;
});





// fs.readFile(readFile, (err, data) => {
//     if (err) {
//         console.error(`Could not read file ${path}`, err);
//         process.kill(1);
//     }
//     async function getData(urlsArr) {
//         const urls = []

//         for (url of urlsArr) {
//             urls.push(url)
//         }

//         const promises = urls.map((url) =>
//             axios.get(url)
//                 .then((response) => response.data)
//                 .catch(e => console.log("INVALID USERNAME", e))
//         );
//         const data = await Promise.all(promises);
//         console.log(data);
//         return data;
//     }

//     fs.appendFile(path, data, 'utf8', err => {
//         if (err) {
//             console.error("Could not save data", err);
//             return;
//         }
//         console.log("IT WORKED!")
//     })
// });




// fs.appendFile(path, data, 'utf8', err => {
//     if (err) {
//         console.log("ERROR!!!", err)
//         process.kill(1)
//     }
//     console.log("IT WORKED!")
// })


// fs.appendFile(path, data, 'utf8', err => {
//     if (err) {
//         console.error("Could not save data", err);
//         process.kill(1);
//     }
//     console.log("IT WORKED!")
// })



async function getUsers(usersArr) {
    const baseUrl = 'https://api.github.com/users/'
    const urls = []

    for (user of usersArr) {
        urls.push(baseUrl + user)
    }

    const promises = urls.map((url) =>
        axios.get(url)
            .then((response) => response.data)
            .catch(e => console.log("INVALID USERNAME", e))
    );
    const data = await Promise.all(promises);
    console.log(data);
    return data;
}