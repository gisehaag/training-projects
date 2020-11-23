/* La mejor manera de representar los billetes es una clase, porque en el cajero se tienen los billetes que tienen
un valor y una cantidad (los atributos).*/

class Billetes{

    constructor (m,c){

        this.fotos = {
            "1000": "http://giselahaag.com/img/atm/billete1000.jpg",
            "500": "http://giselahaag.com/img/atm/billete500.jpg",
            "200": "http://giselahaag.com/img/atm/billete200.jpg",
            "100": "http://giselahaag.com/img/atm/billete100_2018.jpg",
            "50": "http://giselahaag.com/img/atm/billete50_2018.jpg",
            "20": "http://giselahaag.com/img/atm/billete20_2017.jpg",
        };

        this.monto = m;
        this.cantidad = c;
        this.url_billete = this.fotos[m];
    }

    mostrar() {

        var respuesta = document.getElementById("respuesta");

        for (var i=0; i<this.cantidad; i++){
            var new_img_billete = new Image(70, 170);
            new_img_billete.src = this.url_billete;
            respuesta.appendChild( new_img_billete );
        }
    }
}

caja = [];
caja.push(new Billetes (1000,3));
caja.push(new Billetes (500,3));
caja.push(new Billetes (200,5));
caja.push(new Billetes (100,5));
caja.push(new Billetes (50,10));
caja.push(new Billetes (20,10));

// dinero es lo que te pide el usuario

var papeles = 0;
var div = 0;
var b = document.getElementById("extraer");
var f = document.getElementById("form");
b.addEventListener("click", entregarDinero);
f.addEventListener("submit", entregarDinero);

function dineroEnCaja(monto){
    var totalCaja = caja.reduce(function(valorAnterior, valorActual){
        return valorAnterior + ( valorActual.monto * valorActual.cantidad );
    }, 0);

    return monto <= totalCaja;
}

function entregarDinero(event){

    event.preventDefault();
    var respuesta = document.getElementById("respuesta");
    var dinero = document.getElementById("dinero").value;
    var entregado = [];
    respuesta.innerHTML = "";


    // Errores
    if( !dineroEnCaja(dinero) ){
        respuesta.innerHTML = "Ingresa un monto menor";
        return;
    }

    if( dinero == 30 || dinero == 10 ){
        respuesta.innerHTML = "No podemos entregar el monto solicitado";
        return;
    }

    if( dinero %10 != 0 ){
        respuesta.innerHTML = "Por favor ingresa un monto multiplo de 10";
        return;
    }

    // Excepciones
    if (dinero.toString().endsWith("10")){
        dinero = dinero - 110;
        entregado["20"] = new Billetes(20, 3);
        entregado["50"] = new Billetes(50, 1);
    }

    if (dinero.toString().endsWith("30")){
        dinero = dinero - 130;
        entregado["20"] = new Billetes(20, 4);
        entregado["50"] = new Billetes(50, 1);
    }

    if (dinero.toString().endsWith("60")){
        dinero = dinero - 60;
        entregado["20"] = new Billetes(20, 3);
    }

    if (dinero.toString().endsWith("80")){
        dinero = dinero - 80;
        entregado["20"] = new Billetes(20, 4);
    }

    // Script
    for (var bi of caja){
        if (dinero >0) {
            div = Math.floor(dinero / bi.monto);

            if (div > bi.cantidad) {
                papeles = bi.cantidad;
            } else {
                papeles = div;
            }

            if( entregado[bi.monto] ){
                entregado[bi.monto].cantidad += papeles;
            } else {
                entregado[bi.monto] = new Billetes(bi.monto, papeles);
            }

            dinero = dinero - (bi.monto*papeles);
        }
    }

    // Devuelvo dinero
    respuesta.innerHTML += "<p>Acá tenés tu dinero:</p>";

    entregado.sort(function(a,b){
        return b.monto - a.monto;
    });

    for (var bi in entregado){
        entregado[bi].mostrar();
    }
}