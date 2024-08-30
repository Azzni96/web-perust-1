'use strict';
const temp = prompt('enter temperature');

const fahrenheit = (temp * 9) / 5 + 32;

const kelvin = temp + 273.15;

document.querySelector('#Fahrenheit').innerHTML = fahrenheit + 'F';
document.querySelector('#Kelvin').innerHTML = kelvin + 'K';
