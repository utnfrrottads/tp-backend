module.exports = () => {
    class trans{
        styleHyphenFormat(propertyName)
        {
            function upperToHyphenLower(match)
            {
                return '_' + match.toLowerCase();
            }
            return propertyName.replace(/[A-Z]/, upperToHyphenLower);
        }
    }
    return trans;
}


