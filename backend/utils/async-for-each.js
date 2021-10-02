/**
 * Es un for que sirve para recorrer de manera asíncrona usando async-await.
 */
const asyncForEach = async (array, callback) => { 
    for (let index = 0; index < array.length; index++) {
        await callback(array[index]); 
    }
};

module.exports = asyncForEach;
