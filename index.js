import fs from "fs";

const array = [
  2,
  10,
  "go",
  4,
  "c#",
  6,
  "nodejs",
  true,
  "java",
  9,
  1,
  "python",
  12,
  "ruby",
  "php",
  false,
];

let condition = "string";

const testingFunction = (arr, condition) => {
  const primitives = [
    "string",
    "number",
    "boolean",
    "null",
    "undefined",
    "NaN",
  ];

  if (typeof condition !== "string") {
    throw new Error(
      "The received argument needs to be an String type only for the comparison to work!"
    );
  }

  if (condition === "" || !primitives.find((type) => type === condition)) {
    throw new Error("The type received is not a valid");
  }

  const filteredArr = arr.filter((e) => typeof e === condition).sort(compare);

  if (filteredArr.length === 0) {
    console.log("No elements found with the matching type:");
  } else {
    console.log(`   - ${filteredArr.length} Elements found:`);
    const values = filteredArr.join(", ");
    fs.writeFile("results.txt", values, (error) => {
      if (error) throw new Error("Error writing text file!");
    });
    console.log("   - Text file created with the resulting values");
  }

  return filteredArr;
};

function compare(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  return (a ? 1 : 0) - (b ? 1 : 0);
}

try {
  console.log("Preview:");
  console.log(testingFunction(array, condition));
} catch (error) {
  console.error("An error has ocurred: " + error.message);
}
