// Immediately Invoked Function Expressions

// se usan para que nadie te rompa el script ya que el entorno del programa pasa a ser una funcion anonima
// se hacer envolviendo el script en una funcion
// (function () {

let primerOperando = '';
let operandos = [];
let operadores = [];
let buttonsPresed = '';

let cuentaBoton = 0;

const $result = document.getElementById('result');
const $cuenta = document.getElementById('cuenta');

let n = 0;
let op = 0;

let parcialResult = 0;
let result = 0;

let cuenta = [];
const reducer = (acc, current) => acc + current;

$button = document.querySelectorAll('.button');

$button.forEach(($boton)=>{
    $boton.addEventListener('click', getTypeButton)   
});

function getTypeButton() {
    let button = this.dataset;
    cuentaBoton ++ ;

    switch (button.type) {         
        case 'number':
            n = button.info;
            esNumero(n);           
        break;

        case 'operator':
            op = button.info;
            esOperador(op);
        break;
        
        case 'clear':
            esClear();
        break;
        
        case 'equal':
            esEqual();
        break;
    }    
    
    if(button.info) {
        buttonsPresed += button.info;
    }

    $cuenta.innerHTML= buttonsPresed;

}


function esNumero (n) {
    operandos.push(n);    
}

function esOperador(op) {
    // debugger;
    agregaOperandos();
    operadores.push(op);
    cuenta.push(op);
    
    if(operadores.length >= 2){
        resultadoParcial();  
    }
    
}

function esClear(){
    operadores = [];
    operandos = [];    
    cuenta = [];
    cuenta.push(result);
}

function esEqual() {
    agregaOperandos();    
    let result = hacerCuenta(cuenta);
    mostrarResultado(result);  
    limpiarCuenta();  
}

function resultadoParcial() {
    let cuentaParcial = cuenta.slice(0, cuenta.length - 1);
    let resultParcial = hacerCuenta(cuentaParcial);
    mostrarResultado(resultParcial);
}

function agregaOperandos() {
    if (operandos.length != 0){
       let l = operandos.length;
       operandos.splice(0, l, (parseFloat(operandos.join(''))));
       cuenta.push(operandos[0]);
       operandos = []; 
    }
    
    // console.log(cuenta);
}

function mostrarResultado(result) {
    $result.innerHTML = result;
    
}

function limpiarCuenta(){
    // debugger;
    buttonsPresed = '';
    cuenta = [];
}


function hacerCuenta(cuenta){

    if ( cuenta.includes('*') || cuenta.includes('/')) {
        
        cuenta.forEach((elemento, i) => {
        
            let elm_anterior = cuenta[(i-1)];   
            let elm_siguiente = cuenta[(i+1)]; 

            
            switch (elemento.toString()) {
                case '*':{
                    let mult = elm_anterior * elm_siguiente;
                    cuenta.splice((i-1), 3, mult);         
                    hacerCuenta(cuenta);}

                break;

                case '/':{
                    let div = elm_anterior / elm_siguiente;
                    cuenta.splice((i-1), 3, div);         
                    hacerCuenta(cuenta);
                    break;}
            }
        });
    }

    if (( cuenta.includes('+') || cuenta.includes('-'))){
        
        cuenta.forEach((elemento, i) => {
        
            let elm_anterior = cuenta[(i-1)];   
            let elm_siguiente = cuenta[(i+1)]; 

            switch (elemento.toString()) {
                case '+':{
                    let sum = elm_anterior + elm_siguiente;
                    cuenta.splice((i-1), 3, sum);
                    hacerCuenta(cuenta);
                    break;}

                case '-':{
                    let resta = elm_anterior - elm_siguiente;
                    cuenta.splice((i-1), 3, resta);
                    hacerCuenta(cuenta);
                    break;}   
            }
        });    
        
    }

    if (cuenta.length == 1) {
        console.log({operandos, cuenta});
        // operandos.push(cuenta[0]);
        return cuenta[0];
    }; 
} 


// })() <-- ahi, con los (), ejecutas la función anonima
