const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     slackUsername: "cchimdindu",
//     backend: true,
//     age: 29,
//     bio: "I'm passionate about growth",
//   });
// });

app.post("/", (req, res) => {
  console.log(req.body);
  let { operation_type, x, y } = req.body;

  const addition = [
    "add",
    "top up",
    "positive",
    "join",
    "plus",
    "combine",
    "+",
    "sum",
    "addition",
  ];
  const subtraction = [
    "minus",
    "short of",
    "negative",
    "smaller",
    "less",
    "remove",
    "subtract",
    "-",
    "deficient",
    "subtraction",
  ];
  const multiplication = ["times", "*", "multiply", "multiplication"];
  const division = [
    "divide",
    "/",
    "by",
    "split",
    "cut up",
    "cut",
    "cleave",
    "carve up",
    "slice up",
    "chop up",
    "split up",
    "dissect",
    "bisect",
    "halve",
    "quarter",
    "sunder",
    "rive",
    "fractionate",
    "disjoin",
    "diverge",
    "division",
  ];

  let result;

  const calculate = new Calculator(x, y);

  if (addition.indexOf(operation_type) > -1) {
    result = calculate.add;
    operation_type = "addition";
  }
  if (subtraction.indexOf(operation_type) > -1) {
    result = calculate.subtract;
    operation_type = "subtraction";
  }
  if (division.indexOf(operation_type) > -1) {
    result = calculate.divide;
    operation_type = "division";
  }
  if (multiplication.indexOf(operation_type) > -1) {
    result = calculate.multiply;
    operation_type = "multiplication";
  }

  res.status(200).json({
    operation_type: operation_type,
    slackUsername: "ogmaro",
    result: Number(result),
  });
});
class Calculator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get add() {
    return this.addition();
  }
  get subtract() {
    return this.subtraction();
  }
  get divide() {
    return this.division();
  }
  get multiply() {
    return this.multiplication();
  }
  addition() {
    return this.toDecimal(this.x + this.y);
  }
  subtraction() {
    return this.toDecimal(this.x - this.y);
  }
  division() {
    return this.toDecimal(this.x / this.y);
  }
  multiplication() {
    return Number(this.toDecimal(this.x * this.y));
  }
  toDecimal(value) {
    return value.toFixed(2);
  }
}

app.listen(process.env.PORT ||1234, function(){
    console.log("listening on port 1234");
});