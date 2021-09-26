// Eventos del sitio

let buttonAereo = document.getElementById("reservaAereo");
buttonAereo.addEventListener("click", function(){reservaClick("aereo")});

let buttonCrucero = document.getElementById("reservaCrucero");
buttonCrucero.addEventListener("click", function(){reservaClick("crucero")});

let buttonAuto = document.getElementById("reservaAuto");
buttonAuto.addEventListener("click", function(){reservaClick("auto")});

let buttonVerCruceros = document.getElementById("verCrucerosReservados");
buttonVerCruceros.addEventListener("click", function(){verReservasClick("crucero")});

let buttonVerAereos = document.getElementById("verAereosReservados");
buttonVerAereos.addEventListener("click", function(){verReservasClick("aereo")});

let buttonVerAutos = document.getElementById("verAutosReservados");
buttonVerAutos.addEventListener("click", function(){verReservasClick("auto")});


// Eventos del sitio con jquery

$("#limpiarAereo").click({parametro: "aereo"},limpiarCampos);

$("#limpiarCrucero").click({parametro: "crucero"},limpiarCampos);

$("#limpiarAuto").click({parametro: "auto"},limpiarCampos);

$("#cotizacionDolar").click(cotizaciones);



// Validación de campos

$("#cantidadPersonasAereo").bind("keyup",function(e) { controlCampos("#cantidadPersonasAereo","#etiquetaReservaAereo","numero", e); });
$("#pasajeroAereo").bind("keyup",function(e) { controlCampos("#pasajeroAereo","#etiquetaReservaAereo","texto", e); });

$("#cantidadPersonasCrucero").bind("keyup",function(e) { controlCampos("#cantidadPersonasCrucero","#etiquetaReservaCrucero","numero", e); });
$("#pasajeroCrucero").bind("keyup",function(e) { controlCampos("#pasajeroCrucero","#etiquetaReservaCrucero","texto", e); });

$("#cantidadDiasAuto").bind("keyup",function(e) { controlCampos("#cantidadDiasAuto","#etiquetaReservaAuto","numero", e); });
$("#pasajeroAuto").bind("keyup",function(e) { controlCampos("#pasajeroAuto","#etiquetaReservaAuto","texto", e); });

function controlCampos(campo, etiqueta, tipo, tecla)
{
let keyCode = tecla.which ? tecla.which : tecla.keyCode
      
    switch (tipo){

        case "texto":

                        
                        // Si es diferente a las letras de la "a" a la "z", la tecla shift, la tecla tab o la tecla backspace
                        // Si cumple con la condicion envío mensaje al usuario del error, sino lo dejo escribir.
                        if (!(keyCode >= 65 && keyCode <= 90 || keyCode==16 || keyCode == 8 || keyCode == 9)) {

                                $(etiqueta).text("Ingrese letras solamente");
                                $(campo).val("");
                                animacionResultado(etiqueta,3);

                        } else {

                                $(etiqueta).text("Complete los datos y realice su reserva");
                                animacionResultado(etiqueta,4);
                        }

                        
        break;

        case "numero":
                       
                        // Si es diferente a los número del teclado o del teclado numerico, la tecla tab o la tecla backspace
                        // Si cumple con la condicion envío mensaje al usuario del error, sino lo dejo escribir.
                        if (!(keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105 || keyCode == 8 || keyCode == 9)) {

                                $(etiqueta).text("Ingrese números solamente");
                                $(campo).val("");
                                animacionResultado(etiqueta,3);

                                return false;

                        } else {

                                $(etiqueta).text("Complete los datos y realice su reserva");
                                animacionResultado(etiqueta,4);
                        }   
                                
                        break;

        default:
                break;

       
    }
       

}

// Animaciones con jquery

$("#imagenPrincipal").fadeIn(2000); // Aplica al iniciar el sitio. Aparece la imagen

function animacionResultado (etiqueta, opcion) // Le agrego un poco de CSS al dar un resultado o al limpiar el formulario
{
    switch (opcion){
        case 1: // Resultado de la reserva
                $(etiqueta).css("color", "white")
                        .css("background", "#18bc9c")
                        .css("padding", "1rem")
                        .slideUp(0)
                        .slideDown(1000);
        break;

        case 2: // Volver a los colores iniciales del sitio
                $(etiqueta).css("color", "#2c3e50")
                           .css("background", "white")
                           .css("padding", "0")
                           .slideUp(0)
                           .slideDown(1000);
                break;
        case 3: // Resultado de error
                $(etiqueta).css("color", "white")
                        .css("background", "red")
                        .css("padding", "1rem")
                        .slideUp(0)
                        .slideDown(1000);
                break;
        
        case 4: // Volver a los colores iniciales del sitio sin animación
                $(etiqueta).css("color", "#2c3e50")
                                .css("background", "white")
                                .css("padding", "0")
                                
                break;
        default:
                break;
    }
        
}


// JS con Ajax - Traer la cotización del dolar

function cotizaciones(){

        const container = document.querySelector('#dolar');
        removeAllChildNodes(container);
        const urlget = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"; //API del Dolar
        $.get(urlget, function(respuesta,estado)
        {
        if (estado === "success")
        {
        let valores = respuesta
        let cotizaciones = "";
        $('#dolar').append(`<div><h4>Cotizacion del Dolar</h4></div>`);

        for (const valor of valores)
        {
                if (valor.casa.nombre == "Dolar Oficial" || valor.casa.nombre == "Dolar Blue") 
                {
                
                $('#dolar').append(`<div"><h5>${valor.casa.nombre + ": " + valor.casa.compra + " - " + valor.casa.venta}</h5></div>`);
                }
                
        }

        $('#dolar').append(`<hr>`);

        }
        })
        

}


//Limpieza de campos con Jquery

function limpiarCampos(opcion) {  
        
switch (opcion.data.parametro){
        
        //Aereo
        case "aereo":
                        $("#cantidadPersonasAereo").val("");
                        $("#pasajeroAereo").val("");
                        $("#etiquetaReservaAereo").text("Complete los datos y realice su reserva");
                        animacionResultado("#etiquetaReservaAereo",2);
                        break;
        //Crucero
        case "crucero":
                        $("#cantidadPersonasCrucero").val("");
                        $("#pasajeroCrucero").val("");
                        $("#etiquetaReservaCrucero").text("Complete los datos y realice su reserva");
                        animacionResultado("#etiquetaReservaCrucero",2);
                        break;

        //Alquiler
        case "auto":
                        $("#cantidadDiasAuto").val("");
                        $("#pasajeroAuto").val("");
                        $("#etiquetaReservaAuto").text("Complete los datos y realice su reserva");
                        animacionResultado("#etiquetaReservaAuto",2);
                        break;

        default:
                        break;
}
}


//Función para limpiar los child nodes. Se utliza para limpiar los modals

function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

// Ver las reservas realizadas

function verReservasClick(opcion){
        let container;
        let container2;
        let almacenados;
        
        switch (opcion)
                {
                
                case "crucero": 
                                //// Cruceros  
                                container = document.querySelector('#crucerosReservados');
                                removeAllChildNodes(container);
                                almacenados = JSON.parse(sessionStorage.getItem("pasajesCruceros"));
                                
                                //Recorro lo que viene del JSON e inserto DIV con cada objeto almacenado
                                
                                for (const objeto of almacenados)
                                {
                                contenedor2 = document.createElement("div");
                                contenedor2.innerHTML = `<h4>${objeto.nombre}</h4>
                                                        <h5>  Reservado por: ${objeto.reservadoPor}</h5>
                                                        <h5>  Cantidad de personas: ${objeto.cantidad}</h5>
                                                        <h5> $ ${objeto.precio}</h5>`;
                                document.body.appendChild(contenedor2);
                                document.getElementById("crucerosReservados").appendChild(contenedor2);
                                }
                                break;
        
        
                case "aereo":
                                ///// Aereos
                                container = document.querySelector('#aereosReservados');
                                removeAllChildNodes(container);
                                almacenados = JSON.parse(sessionStorage.getItem("pasajesAereos"));
                                
                                //Recorro lo que viene del JSON e inserto DIV con cada objeto almacenado
                                
                                for (const objeto of almacenados)
                                {
                                        contenedor2 = document.createElement("div");
                                        contenedor2.innerHTML = `<h4>${objeto.nombre}</h4>
                                                                <h5>  Reservado por: ${objeto.reservadoPor}</h5>
                                                                <h5>  Cantidad de personas: ${objeto.cantidad}</h5>
                                                                <h5> $ ${objeto.precio}</h5>`;
                                        document.body.appendChild(contenedor2);
                                        document.getElementById("aereosReservados").appendChild(contenedor2);
                                }
                                break;
        
                case "auto":                    
                                //// AUTOS
        
                                container = document.querySelector('#autosReservados');
                                removeAllChildNodes(container);
                                almacenados = JSON.parse(sessionStorage.getItem("autosReservados"));
                                
                                //Recorro lo que viene del JSON e inserto DIV con cada objeto almacenado
                                
                                for (const objeto of almacenados)
                                        {
                                        contenedor2 = document.createElement("div");
                                        contenedor2.innerHTML = `<h4>${objeto.nombre}</h4>
                                                                <h5>  Reservado por: ${objeto.reservadoPor}</h5>
                                                                <h5>  Cantidad de días: ${objeto.cantidad}</h5>
                                                                <h5>  ${objeto.seguro}</h5>
                                                                <h5> $ ${objeto.precio}</h5>`;
                                        document.body.appendChild(contenedor2);
                                        document.getElementById("autosReservados").appendChild(contenedor2);
                                        }
                                
                                break;
        
                default:
                                break;
        }
        
        }
        
// Agrega las reservas de cada servicio

function reservaClick(tipoReserva){
        let select;
        let eleccion;
        let nombrePaquete;
        let numeroPersonas;
        let pasajero;
        let cantidadPersonas;
        let pasajeroReservado;
        let cantDigitosPas;
        let cantDigitosPer;
        switch (tipoReserva)
            {
                
                //AEREO
                case "aereo":
                            select = document.getElementById('aereos');
                            eleccion = select.options[select.selectedIndex].value;
                            nombrePaquete = select.options[select.selectedIndex].text;
                            
    
                            numeroPersonas = document.getElementById('cantidadPersonasAereo');
                            cantidadPersonas = numeroPersonas.value;

                            


                            pasajero = document.getElementById('pasajeroAereo');
                            pasajeroReservado = pasajero.value;

                            cantDigitosPas = $('#pasajeroAereo').val().length;
                            cantDigitosPer = $('#cantidadPersonasAereo').val().length;
                            

                            if(parseInt(cantDigitosPer)>0 && parseInt(cantDigitosPas)>0)
                             {
                                switch (parseInt(eleccion)) {
                                        case 1:
                                                precioPaquete=15000;
                                                precioTotal=multiplicacion(parseInt(precioPaquete),parseInt(cantidadPersonas));
                                                document.getElementById('etiquetaReservaAereo').innerHTML = "Estimado "+pasajeroReservado+", confirmamos la reserva de su viaje para "+cantidadPersonas+ ' personas en el paquete aereo "'+nombrePaquete+'" con valor de $'+precioTotal;   
                                                pasajesAereos.push(new Aereo(nombrePaquete,pasajeroReservado,precioTotal,cantidadPersonas));
                                                sessionStorage.setItem('pasajesAereos',JSON.stringify(pasajesAereos));
                                                break;
        
                                        case 2:
                                                precioPaquete=25000;
                                                precioTotal=multiplicacion(parseInt(precioPaquete),parseInt(cantidadPersonas));
                                                document.getElementById('etiquetaReservaAereo').innerHTML = "Estimado "+pasajeroReservado+", confirmamos la reserva de su viaje para "+cantidadPersonas+ ' personas en el paquete aereo "'+nombrePaquete+'" con valor de $'+precioTotal;   
                                                pasajesAereos.push(new Aereo(nombrePaquete,pasajeroReservado,precioTotal,cantidadPersonas));
                                                sessionStorage.setItem('pasajesAereos',JSON.stringify(pasajesAereos));
                                                break;
        
                                        
                                        
                                        default:
                                                break;
        
                                        }
                                        animacionResultado("#etiquetaReservaAereo",1);
                             }
                             else{
                                    
                                document.getElementById('etiquetaReservaAereo').innerHTML = "Es necesario que complete los campos de cantidad de personas y nombre completo";
                                animacionResultado("#etiquetaReservaAereo",3);
                             }
                            break;
                            
                //AUTO
                case "auto":
                            select = document.getElementById('autos');
                            eleccion = select.options[select.selectedIndex].value;
                            let nombreVehiculo = select.options[select.selectedIndex].text;
                            
                            let selectSeguro = document.getElementById('seguroAuto');
                            let opcionSeguro = selectSeguro.options[selectSeguro.selectedIndex].value;
                            let nombreOpcionSeguro = selectSeguro.options[selectSeguro.selectedIndex].text;
    
                            let numeroDias = document.getElementById('cantidadDiasAuto');
                            let cantidadDias = numeroDias.value;
    
                            pasajero = document.getElementById('pasajeroAuto');
                            pasajeroReservado = pasajero.value;
                            
                            cantDigitosPas = $('#pasajeroAuto').val().length;
                            cantDigitosPer = $('#cantidadDiasAuto').val().length;
                            

                            if(parseInt(cantDigitosPer)>0 && parseInt(cantDigitosPas)>0)
                             {            
                            switch (parseInt(eleccion)) {
                                    case 1:
                                            
                                            precioAuto=800;
                                            switch (parseInt(opcionSeguro)) {
                                                    case 1:
                                                        
                                                        precioTotal=suma(multiplicacion(parseInt(precioAuto),parseInt(cantidadDias)),parseInt(precioSeguroAuto));
                                                        document.getElementById('etiquetaReservaAuto').innerHTML = "Estimado "+pasajeroReservado+", se confirmó la reserva. Su precio por el alquiler del "+nombreVehiculo+" por "+cantidadDias+ " días es: $"+precioTotal;
                                                        autosReservados.push(new Auto(nombreVehiculo,pasajeroReservado,precioTotal,cantidadDias, nombreOpcionSeguro));
                                                        sessionStorage.setItem('autosReservados',JSON.stringify(autosReservados));
                                                        break;
    
                                                    default:
                                                        
                                                        precioTotal=multiplicacion(parseInt(precioAuto),parseInt(cantidadDias));
                                                        document.getElementById('etiquetaReservaAuto').innerHTML = "Estimado "+pasajeroReservado+", se confirmó la reserva. Su precio por el alquiler del "+nombreVehiculo+" por "+cantidadDias+ " días es: $"+precioTotal;
                                                        autosReservados.push(new Auto(nombreVehiculo,pasajeroReservado,precioTotal,cantidadDias, nombreOpcionSeguro));
                                                        sessionStorage.setItem('autosReservados',JSON.stringify(autosReservados));
                                                        break;
                                                
                                            } 
                                            break;
    
                                    case 2:
                                            
                                            precioAuto=1200;
                                            switch (parseInt(opcionSeguro)) {
                                                    case 1:
                                                        
                                                        precioTotal=suma(multiplicacion(parseInt(precioAuto),parseInt(cantidadDias)),parseInt(precioSeguroAuto));
                                                        document.getElementById('etiquetaReservaAuto').innerHTML = "Estimado "+pasajeroReservado+", se confirmó la reserva. Su precio por el alquiler de la "+nombreVehiculo+" por "+cantidadDias+ " días es: $"+precioTotal;
                                                        autosReservados.push(new Auto(nombreVehiculo,pasajeroReservado,precioTotal,cantidadDias, nombreOpcionSeguro));
                                                        sessionStorage.setItem('autosReservados',JSON.stringify(autosReservados));
                                                        break;
    
                                                    default:
                                                        
                                                        precioTotal=multiplicacion(parseInt(precioAuto),parseInt(cantidadDias));
                                                        document.getElementById('etiquetaReservaAuto').innerHTML = "Estimado "+pasajeroReservado+", se confirmó la reserva. Su precio por el alquiler de la "+nombreVehiculo+" por "+cantidadDias+ " días es: $"+precioTotal;
                                                        autosReservados.push(new Auto(nombreVehiculo,pasajeroReservado,precioTotal,cantidadDias, nombreOpcionSeguro));
                                                        sessionStorage.setItem('autosReservados',JSON.stringify(autosReservados));
                                                        break;
                                                
                                            } 
                                            break;
    
                                    
                                    default:
                                            
                                            break;
    
                            }
                            animacionResultado("#etiquetaReservaAuto",1);
                        }
                        else{
                               
                           document.getElementById('etiquetaReservaAuto').innerHTML = "Es necesario que complete los campos de cantidad de días y nombre completo";
                           animacionResultado("#etiquetaReservaAuto",3);
                        }
                        break;
                //CRUCERO
                case "crucero":
                            select = document.getElementById('cruceros');
                            eleccion = select.options[select.selectedIndex].value;
                            nombrePaquete = select.options[select.selectedIndex].text;
    
    
                            numeroPersonas = document.getElementById('cantidadPersonasCrucero');
                            cantidadPersonas = numeroPersonas.value;
    
                            pasajero = document.getElementById('pasajeroCrucero');
                            pasajeroReservado = pasajero.value;
    
                            cantDigitosPas = $('#pasajeroCrucero').val().length;
                            cantDigitosPer = $('#cantidadPersonasCrucero').val().length;
                            

                            if(parseInt(cantDigitosPer)>0 && parseInt(cantDigitosPas)>0)
                             {  
                            switch (parseInt(eleccion)) {
                                case 1:
                                        precioPaquete=85000;
                                        
                                        if(parseInt(cantidadPersonas)>3){
                                        precioTotal=multiplicacion(descuento(precioPaquete,0.2),parseInt(cantidadPersonas));
                                        document.getElementById('etiquetaReservaCrucero').innerHTML = "Estimado "+pasajeroReservado+", confirmamos la resrva de su viaje en el crucero para "+cantidadPersonas+ ' personas en el paquete de crucero "'+nombrePaquete+'" con valor de $'+precioTotal;   
                                        }
                                        else{
                                        precioTotal=multiplicacion(parseInt(precioPaquete),parseInt(cantidadPersonas));
                                        document.getElementById('etiquetaReservaCrucero').innerHTML = "Estimado "+pasajeroReservado+", confirmamos la reserva de su viaje en el crucero para "+cantidadPersonas+ ' personas en el paquete de crucero "'+nombrePaquete+'" con valor de $'+precioTotal;   
                                            
                                        }
                                        pasajesCruceros.push(new Crucero("MSC Miami-Bahamas",pasajeroReservado,precioTotal,cantidadPersonas));
                                        sessionStorage.setItem('pasajesCruceros',JSON.stringify(pasajesCruceros));
                                        break;
    
                                case 2:
                                        precioPaquete=35000;
                                        precioTotal=multiplicacion(parseInt(precioPaquete),parseInt(cantidadPersonas));
                                        document.getElementById('etiquetaReservaCrucero').innerHTML = "Estimado "+pasajeroReservado+", confirmamos su viaje en el crucero para "+cantidadPersonas+ ' personas en el paquete de crucero "'+nombrePaquete+'" con valor de $'+precioTotal;   
                                        pasajesCruceros.push(new Crucero("Norwegian Brasil",pasajeroReservado,precioTotal,cantidadPersonas));
                                        sessionStorage.setItem('pasajesCruceros',JSON.stringify(pasajesCruceros));
                                        break;
    
                            
                                
    
                                default:
                                        
                                        break;
    
                            }
                            animacionResultado("#etiquetaReservaCrucero",1);
                        }
                        else{
                               
                           document.getElementById('etiquetaReservaCrucero').innerHTML = "Es necesario que complete los campos de cantidad de personas y nombre completo";
                           animacionResultado("#etiquetaReservaCrucero",3);
                        }
                        break;
    
                default:
                            break;
            }
    }


//Definición de variables globales

let opcion=0;
let precioTotal=0;
let precioAuto=0;
let precioPaquete=0;
let precioCrucero=0;
let cantidadDias=0;
let precioSeguroAuto=500;
const pasajesCruceros=[];
const pasajesAereos=[];
const autosReservados=[];

//Definición de funciones para operaciones

const suma  = function (a, b) { return a + b };
const multiplicacion  = function (a, b) { return a * b };
const resta = function (a, b) { return a - b };

const descuento = (precio,descuento) => {return resta(precio, multiplicacion(precio,descuento))};

//Definicion de clases

class Crucero {
        constructor(nombre, reservadoPor, precio, cantidad) {
            this.nombre  = nombre;
            this.reservadoPor = reservadoPor;
            this.precio  = parseFloat(precio);
            this.cantidad = parseInt(cantidad);

        }        
        
    }


class Aereo {
        constructor(nombre, reservadoPor, precio, cantidad) {
        this.nombre  = nombre;
        this.reservadoPor = reservadoPor;
        this.precio  = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        }  

}

class Auto {
        constructor(nombre, reservadoPor, precio, cantidad, seguro) {
        this.nombre  = nombre;
        this.reservadoPor = reservadoPor;
        this.seguro = seguro;
        this.precio  = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        }


}







