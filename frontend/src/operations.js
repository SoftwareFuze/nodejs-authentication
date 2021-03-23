export const toHex = (string) => {
    let _string = string;
    let _hexOutput = "";
    for (let i = 0; i < _string.length; ++i) 
        _hexOutput += String(_string.charCodeAt(i).toString(16));
    return _hexOutput &&
        String(_hexOutput);
}

export const toString = (string) => {
    let _string = String(string);
    let _stringOutput = "";
    for (let i = 0; i < _string.length; i += 2) 
        _stringOutput += String.fromCharCode(parseInt(_string.substr(i, 2), 16));
    return _stringOutput &&
        String(_stringOutput);
}