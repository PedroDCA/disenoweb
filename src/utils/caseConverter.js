export const convertToPascalCase = (objectToConvert) => {
    const pascalCaseObject = {};
    for(const key in objectToConvert){
        const newKey = key.charAt(0).toUpperCase() + key.slice(1);
        pascalCaseObject[newKey] = objectToConvert[key];
    }
    return pascalCaseObject;
}

export const convertToCamelCase = (objectToConvert) => {
    const camelCaseObject = {};
    for(const key in objectToConvert){
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        camelCaseObject[newKey] = objectToConvert[key];
    }
    return camelCaseObject;
}