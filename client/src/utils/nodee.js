const value = ["a", "b", "c"];
const inputValue = "hello";
const index = 3;

const newValue = [...value]; // newValue is now ['a', 'b', 'c']
newValue[index] = inputValue.slice(-1); // newValue[1] is now 'o'

console.log(newValue);
