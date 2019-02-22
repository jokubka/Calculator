"use strict";

/**
 * @param somebody
 */

 /**
 * @param e - event
*/
function calc(e) {
    var btnValue = '',
        calcScreen = document.querySelector('.screen'),
        buttons = document.querySelectorAll('.btn');

        console.log(e.target.tagName);



    //Lighting up calc buttons when pressing

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    if (e.target.tagName == 'DIV') {

        e.target.classList.add('active');
    }
    if (e.target.tagName == 'SPAN'){
        e.target.parentElement.classList.add('active')
    }




    if (e.type == 'click') {
        btnValue = e.target.innerText;
    }
    else {
        btnValue = e.key;
        switch(btnValue){
            case 'Enter':
                btnValue = '=';
                break;
            case 'Delete':
                btnValue = 'AC';
                break;
            case '+':
                btnValue = '+';
                break;
            case '-':
                btnValue = '−';
                break;
            case '*':
                btnValue = '✕';
                break;
            case '.':
                btnValue = ',';
                break;
            case '/':
                btnValue = '÷';
                break;
        }
    }

    // Entering numbers
    if (parseInt(btnValue) >= 0) {
        //If math operator been entered befor number clearing a screen for new number
        if(clear_screen && number_present != "0.") {
            number_present = btnValue
            calcScreen.innerHTML = number_present;
            clear_screen = false;
            return;
        }

        if (number_present.length == 9) {
            return;
        }
        //Checking for double zeros as first digits
        if (number_present != '0') {
            number_present += btnValue;
            calcScreen.innerHTML = number_present;
        } else {
            number_present += "." + btnValue;
            calcScreen.innerHTML = number_present;
            return;
        }
    }

    //No double coma's in a number
    if (btnValue == ',') {
        if (number_present.length == 9) {
            return;
        }
        for ( var i = 0; i < number_present.length; i++) {
            if (number_present[i] == '.') {
                return;
            }
        }
        if (number_present == '') {
            number_present = '0.';
            calcScreen.innerHTML = number_present;
            return;
        } else {
            number_present += '.';
            calcScreen.innerHTML = number_present;
            return;
        }

    }

    //Clear all button
    if (btnValue == 'AC') {
        calcScreen.innerHTML = '';
        number_present = '',
        number_saved = '',
        operation = '',
        clear_screen = false;
        sum = 0;
        return;
    }

    if (btnValue == '±') {
        if (number_present[0] == '-') {
            number_present = number_present.substring(1);
            calcScreen.innerHTML = number_present;
            return;
        }
        if (number_present[0] != '-' &&
            number_present != '0' &&
            number_present.length != 0) {
                number_present = '-' + number_present;
                calcScreen.innerHTML = number_present;
        }
    }

    if (btnValue == '%' && number_saved.length != 0) {
        number_present = (number_saved /100) * number_present;
        calcScreen.innerHTML = number_present;
    }

    //Math operator buttons
    if (btnValue == '÷' ||
        btnValue == '✕' ||
        btnValue == "−" ||
        btnValue == "+" ||
        btnValue == "=") {

        clear_screen = true;

        if (number_present.length == 0 && number_saved.length == 0) {
            return;
        }
        if (btnValue == '=' && operation == '') {
            return;
        }

        //Checking previous math operator entered and making calculations
        if (operation.length != 0) {
            switch(operation){
                case '÷':
                    sum = parseFloat(number_saved) / parseFloat(number_present);
                    number_present = '';
                    number_saved = sum;
                    calcScreen.innerHTML = sum;
                    break;
                case '✕':
                    sum = parseFloat(number_saved) * parseFloat(number_present);
                    number_present = '';
                    number_saved = sum;
                    calcScreen.innerHTML = sum;
                    break;

                case '−':
                    sum = parseFloat(number_saved) - parseFloat(number_present);
                    number_present = '';
                    number_saved = sum;
                    calcScreen.innerHTML = sum;
                    break;
                case '+':
                    sum = parseFloat(number_saved) + parseFloat(number_present);
                    number_present = '';
                    number_saved = sum;
                    calcScreen.innerHTML = sum;
                    break;
                case '=':
                    number_saved = sum;
                    break;
            }

        } else { //If a operatot button used first time
            number_saved = number_present;
        }

        operation = btnValue;

        if (sum.toString().length > 9) {
            document.querySelector('.screen').style = 'font-size: 28px';
        }

    }

}
