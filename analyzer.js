function makeLexicalAnalysis() {
    var expression = document.getElementById('expression').value;
    expression = expression.replace(/ /g, '');

    if (allValidCharacters(expression)) {

        var table = [];
        var tmpExpression = expression;

        while (tmpExpression.length !== 0) {
            if (isNumber(charAtFirstPosition(tmpExpression))) {
                table.push({
                    lexem: getNumber(tmpExpression),
                    type: 'NUMBER',
                    value: getNumber(tmpExpression),
                });
                tmpExpression = tmpExpression.substring(getNumber(tmpExpression).length, tmpExpression.length);
            } else if (isOperator(charAtFirstPosition(tmpExpression))) {
                table.push({
                    lexem: getOperator(tmpExpression),
                    type: 'OPERATOR',
                    value: getValueOperator(getOperator(tmpExpression)),
                });
                tmpExpression = tmpExpression.substring(getOperator(tmpExpression).length, tmpExpression.length);
            } else if (isSymbol(charAtFirstPosition(tmpExpression))) {
                table.push({
                    lexem: getSymbol(tmpExpression),
                    type: 'SYMBOL',
                    value: getValueSymbol(getSymbol(tmpExpression)),
                });
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

function isNumber(element) {
    return element.match(/[0-9]/) !== null;
}

function getNumber(expression) {
    return expression.match(/[0-9]*/)[0];
}

function isOperator(element) {
    var operators = ['+', '-', '/', '*'];
    return operators.find(operator => operator === element) !== undefined;
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

function isSymbol(element) {
    var symbols = ['(', ')', '[', ']'];
    return symbols.find(symbol => symbol === element) !== undefined;
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

function allValidCharacters(expression) {
    for (let element of expression) {
        if (!isNumber(element) && !isOperator(element) && !isSymbol(element)) {
            return false;
        }
    }
    return true;
}

function charAtFirstPosition(expression) {
    return expression.charAt(0);
}

function tada() {
    micron.getEle('#tableLexem').interaction('bounce').duration('.45').timing('ease-out');
}
