/**
 * Utilidade para clonar objetos recursivamente.
 * 
 * @example
 * const myObj = {a: 1, b: 2}
 * deepCopy(myObj) // {a: 1, b: 2}
 * myObj === deepCopy(myObj) // false
 */
export function deepCopy<T>(obj: T): T {
    // Não é a maneira mais performática de clonar objetos, mas no momento é o bastante
    return JSON.parse(JSON.stringify(obj))
}