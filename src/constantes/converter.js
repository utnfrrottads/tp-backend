const converter = (propertyName) => {
    function upperToHyphenLower(match)
    {
        return '_' + match.toLowerCase();
    }
    return propertyName.replace(/[A-Z]/, upperToHyphenLower);
}

module.exports = {
    converter
}


