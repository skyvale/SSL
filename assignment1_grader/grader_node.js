
// ----------------
// NODEJS GRADER
// ----------------


// defining a class
class Grader {

    constructor(){
        // empty
    }
    
}

// get user input

const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
});

readline.question('What is your name?', name => { 
    console.log("Name: " + name);
    
   
    readline.question('What is the assignment?', assignment => {
        console.log("Assignment: " + assignment);    
        
        readline.question('What is the grade?', grade => {

            let parsedGrade = parseFloat(grade);

            // determine the letter grade of entered grade value
            if(parsedGrade >= 90){
                 console.log('Grade: A');
            } else if (parsedGrade >= 80 && parsedGrade < 90) {
                console.log('Grade: B');
            } else if (parsedGrade >= 70 && parsedGrade < 80) {
                console.log('Grade: C');
            } else if (parsedGrade >= 60 && parsedGrade < 70) {
                console.log('Grade: D');
            } else if (parsedGrade < 60) {
                console.log('Grade: F');
            } else {
                console.log('Not a valid grade');
            }

            readline.close();

        });

    }); 
});





