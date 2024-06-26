document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByTagName('button'));
    let error = false;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (error && !isNaN(value)) {
                display.value = '';
                error = false;
            }

            if (value === '=') {
                try {
                    display.value = evaluateExpression(display.value);
                    error = false;
                } catch {
                    display.value = 'Error';
                    error = true;
                }
            } else if (value === 'C' || value === 'AC') {
                display.value = '';
                error = false;
            } else if (isOperator(value)) {
                if (display.value === '' && value !== '-') {
                    return;
                }
                if (isOperator(display.value.slice(-1))) {
                    display.value = display.value.slice(0, -1) + value;
                } else {
                    display.value += value;
                }
            } else {
                display.value += value;
            }
        });
    });

    function isOperator(char) {
        return ['+', '-', '*', '/', '^', 'r'].includes(char);
    }

    function evaluateExpression(expression) {
        expression = expression.replace(/\^/g, '**');

        expression = expression.replace(/r(\d+(\.\d+)?)/g, 'Math.sqrt($1)');

        if (expression.startsWith('r')) {
            expression = expression.replace(/r/g, 'Math.sqrt');
        }

        return eval(expression);
    }
});
