

/* Linking HTML ID's with their respective JS variables*/


const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');



// Adding click event and inserting what the click event is looking for - it evaluates if a checkbox is checked or what value it contains


generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

// telling the click event to generate the password in the location of the result using the values assigned to the properties in the argument
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});



/* Function that actually assembles the pieces to make the password
first we imput the arguemnts, then we initialize the variable that 
will hold the password
then we put in our failsafes to deal with someone checking 0 boxes
the loop function took a long time to understand - you create an array of objects
which serve as a key for your if function where you create a loop. The array of objects 
has the falsey values filtered out - meaning that when a box is unchecked, it will not appear in the array
when it passes through the if function
*/

function generatePassword(lower, upper, number, symbol, length) {
// decalring generatedPassword variable
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// If no boxes are checked - return an empty string
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop that will run for the length chosen by the user (maximum of 20, minumum of 1)
	// this loop will only incorporate what is checked
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	/* without using the slice method the length of the generated password 
	will be at a minimum 4, because it is incrimenting by the typesCount variable, which at its minimum is 4. 
	So we use slice to ensure the final password begins at 0, and then has the length chosen by the 
	user applied.
	*/
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

/* Making the values of our elements randomized 
in the way we want them to be. I decided to use character codes */


function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

/* Incorporating the above random values into a function */


const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}