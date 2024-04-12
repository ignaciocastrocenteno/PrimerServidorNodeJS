// Importamos la librería externa para utilizar la gestión de archivos
import fs from "fs";

// Vector de valores propuesto para la búsqueda
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

// Condición que será aplicada a la función de búsqueda
let condition = "string";

/* Función que busca elementos, basado en un tipo de dato específico brindado por el usuario
    - First Arg (arr: Array) Vector a ser analizado
    - Second Arg (condition: String) Condición que será aplicada a la búsqueda
*/
const testingFunction = (arr, condition) => {
  const primitives = [
    "string",
    "number",
    "boolean",
    "null",
    "undefined",
    "NaN",
  ];

  // Si la condición no es del tipo 'String', se arroja una excepción
  if (typeof condition !== "string") {
    throw new Error(
      "The received argument needs to be an String type only for the comparison to work!"
    );
  }

  /* Si la condición es un 'String', pero el mismo no se encuentra definido dentro de mi array 'primitives'
  o está vacío, se arroja otra excepción. */
  if (condition === "" || !primitives.find((type) => type === condition)) {
    throw new Error("The type received is not a valid");
  }

  // Llegado a este punto, los parámetros están validados y se filtran los valores según el tipo solicitado por el usuario
  /* Una vez filtrado el array, utilizando el método .filter(), se organizarán todos los valores de forma ascendente */
  const filteredArr = arr.filter((e) => typeof e === condition).sort(compare);

  /* Se da feedback al usuario, si la función no encontró elementos que coincidan con el tipo de dato y se retorna
  un array vacío */
  if (filteredArr.length === 0) {
    console.log("No elements found with the matching type:");
  } else {
    // Si se encontraron elementos, también se da feedback al usuario
    console.log(`   - ${filteredArr.length} Elements found:`);
    /*  Convertimos el array filtrado en un String, utilizando una coma como separador, para facilitar su lectura
    posterior desde el archivo de texto */
    const values = filteredArr.join(", ");
    /* Creamos un archivo de texto con el nombre 'results.txt', el cual será escrito con lo guardado en la 
    variable 'values'. Si el archivo ya existe, no se realizarán cambios. Si no existe, se crea con los valores. */
    fs.writeFile("results.txt", values, (error) => {
      // Si en algún momento, sistema de archivos falla al realizar la escritura, se lanzará un error avisando el problema
      if (error) throw new Error("Error writing text file!");
    });
    // Si no entró al callback atado al error, el archivo se creó exitosamente y se cargó con los valores esperados
    console.log("   - Text file created with the resulting values");
  }

  // Finalmente se retornan los valores dentro del array, en caso que el usuario los necesite para otras operaciones
  return filteredArr;
};

// Función ad-hoc para ordenar de manera ascendente todos los valores que satifacen la búsqueda
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
