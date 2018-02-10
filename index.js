const Convertor = require('./convertor');
let convertor = new Convertor();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
});


rl.question("whould you like to decode or encode(D/E)?", (answer) => {
    if(answer.toUpperCase() == "E") {
        rl.question("what is the number you wish to encode?", (number) => {
            console.log(number + " encoded = " + convertor.encode(parseInt(number)));
            rl.close();
        });

    } else if (answer.toUpperCase() == "D") {
        rl.question("what is your hi?", (hi) => {
            rl.question("what is your lo?", (lo) => {
                console.log(hi + " " + lo + " decoded = " + convertor.decode(hi,lo));
                rl.close();
            });
        });
    
    } else {
        console.log("that was not D or E");
        console.log("good bye");
        rl.close();
    }
});

