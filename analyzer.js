function makeLexicalAnalysis() {
    var expression = document.getElementById('expression').value;
    expression = expression.replace(/ /g, '');

    if (allValidCharacters(expression)) {

        var table = [];
        var tmpExpression = expression;
        var lastCharOfPreviousTmpExpression;

        while (tmpExpression.length !== 0) {
            if (typeOfFirstElement(tmpExpression, lastCharOfPreviousTmpExpression) === "Number") {
                table.push({
                    lexem: getNumber(tmpExpression, "Number"),
                    type: 'NUMBER',
                    value: getNumber(tmpExpression, "Number"),
                });
                lastCharOfPreviousTmpExpression = getNumber(tmpExpression, "Number").slice(-1);
                tmpExpression = tmpExpression.substring(getNumber(tmpExpression, "Number").length, tmpExpression.length);
            } else if (typeOfFirstElement(tmpExpression, lastCharOfPreviousTmpExpression) === "Signed Number") {
                table.push({
                    lexem: getNumber(tmpExpression, "Signed Number"),
                    type: 'NUMBER',
                    value: getNumber(tmpExpression, "Signed Number"),
                });
                lastCharOfPreviousTmpExpression = getNumber(tmpExpression, "Signed Number").slice(-1);
                tmpExpression = tmpExpression.substring(getNumber(tmpExpression, "Signed Number").length, tmpExpression.length);
            } else if (typeOfFirstElement(tmpExpression, lastCharOfPreviousTmpExpression) === "Operator") {
                table.push({
                    lexem: getOperator(tmpExpression),
                    type: 'OPERATOR',
                    value: getValueOperator(getOperator(tmpExpression)),
                });
                lastCharOfPreviousTmpExpression = getOperator(tmpExpression).slice(-1);
                tmpExpression = tmpExpression.substring(getOperator(tmpExpression).length, tmpExpression.length);
            } else if (typeOfFirstElement(tmpExpression, lastCharOfPreviousTmpExpression) === "Symbol") {
                table.push({
                    lexem: getSymbol(tmpExpression),
                    type: 'SYMBOL',
                    value: getValueSymbol(getSymbol(tmpExpression)),
                });
                lastCharOfPreviousTmpExpression = getSymbol(tmpExpression).slice(-1);
                tmpExpression = tmpExpression.substring(getSymbol(tmpExpression).length, tmpExpression.length);
            }
        }

        var strTable = '<thead><tr><th>LEXEM</th><th>TYPE</th><th>VALUE</th></tr></thead><tbody>'
        for (let object of table) {
            strTable += '<tr>';
            strTable += '<td>' + object.lexem + '</td>';
            strTable += '<td>' + object.type + '</td>';
            strTable += '<td>' + object.value + '</td>';
            strTable += '</tr>';
        }
        strTable += '</tbody>';
        document.getElementById('tableLexem').innerHTML = strTable;
        tada();
    } else {
        alert('Expression contains invalid character(s)');
    }
}

function typeOfFirstElement(expression, previousCharacter) {

    var firstCharacter = expression[0];
    var nextCharacter = expression[1];

    if (firstCharacter.match(/[0-9]/)) {
        return "Number";
    } else if (firstCharacter.match(/\*\*|\*|\+|\-|\//)) {
        var complexOperators = ['*', '/'];

        if (complexOperators.find(operator => operator === firstCharacter)) {
            return "Operator";
        } else {
            if (previousCharacter !== undefined) {
                if (!previousCharacter.match(/[0-9]/) && !previousCharacter.match(/\)|\]/)) {
                    return "Signed Number";
                } else {
                    return "Operator";
                }
            } else {
                if (nextCharacter.match(/\(|\[/)) {
                    return "Operator";
                } else {
                    return "Signed Number";
                }
            }
        }
    } else if (firstCharacter.match(/\(|\)|\[|\]/)) {
        return "Symbol";
    }
}

function getNumber(expression, type) {
    if (type === "Signed Number") {
        return expression.match(/(\+|\-)[0-9]*/)[0];
    } else {
        return expression.match(/[0-9]*/)[0];
    }
}

function getOperator(expression) {
    return expression.match(/\*\*|\*|\+|\-|\//)[0];
}

function getValueOperator(operator) {
    if (operator === '+') {
        return 'SUM';
    } else if (operator === '-') {
        return 'DIFF';
    } else if (operator === '*') {
        return 'MULT';
    } else if (operator === '**') {
        return 'POW';
    } else if (operator === '/') {
        return 'DIV';
    }
}

function getSymbol(expression) {
    return expression.match(/\(|\)|\[|\]/)[0];
}

function getValueSymbol(symbol) {
    if (symbol === '(') {
        return 'LPAR';
    } else if (symbol === ')') {
        return 'RPAR';
    } else if (symbol === '[') {
        return 'LBRACK';
    } else if (symbol === ']') {
        return 'RBRACK';
    }
}

function isNumber(element) {
    return element.match(/[0-9]/) !== null;
}

function isOperator(element) {
    var operators = ['+', '-', '/', '*'];
    return operators.find(operator => operator === element) !== undefined;
}

function isSymbol(element) {
    var symbols = ['(', ')', '[', ']'];
    return symbols.find(symbol => symbol === element) !== undefined;
}

function allValidCharacters(expression) {
    for (let element of expression) {
        if (!isNumber(element) && !isOperator(element) && !isSymbol(element)) {
            return false;
        }
    }
    return true;
}

function tada() {
    micron.getEle('#tableLexem').interaction('bounce').duration('.45').timing('ease-out');
}