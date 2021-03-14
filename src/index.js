import myCurrentLocation, { getGreeting, message, name } from './myModule';
import myAddFunction, { subtract } from './math'

console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(getGreeting('Jessica'));

console.log(myAddFunction(1, 1));
console.log(subtract(5, 1));
