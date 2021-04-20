import "./styles.css";

var num = 10;
let num1 = 11;
const num2 = 12;
//global scope is runtime scope

function outer() {
  function inner() {
    function inner2() {
      console.log("num is ", num, num1, num2);
    }
    inner2();
  }
  inner();
}
outer();
