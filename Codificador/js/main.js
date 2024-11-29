
// var palabraCodificada =[];

var arrayLetras = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ','o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
var arrayNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];



document.getElementById("codify").onclick = function(){

    //Primero guardamos el valor de la clave. Y debemos comprobar que solo son caracteres
    let key = document.getElementById("key").value;

    if(key.match(/^[a-zA-ZñÑ]+$/)){
        document.getElementById("error").innerHTML = "";
        codify(key);
    }
    else{
        document.getElementById("error").innerHTML = "La clave proporcionada debe contener unicamente letras";
        document.getElementById("error").style = "color:red;"
    }


}

//funcion para comprobar si hay un texto en el primer textArea. En caso afirmativo, guarda cada palabra en un string.

function recogeTexto(texto){

    // let texto = document.getElementById("codificador").value;

    if(texto == ""){
        document.getElementById("error").innerHTML = "Debe introducir algun texto en el campo de texto correspondiente";
        document.getElementById("error").style = "color:red;"
        return texto;
    }
    else{
        document.getElementById("error").innerHTML = "";
        return texto.split(" ");
    }

}

function contarVocales(palabra){

    let total = 0;

    total = palabra.match(/[aeiouAEIOU]/g);

    return total==null?0:total.length;

}

//funcion principal para codificar
function codify(key){

    let texto = recogeTexto(document.getElementById("codificador").value);

    // Limpiamos el area del resultado para evitar problemas
    document.getElementById("result").value = "";
    let desplazamiento = 0;
    let pos;
    let aux;

    if (texto[0] !== "") {
        texto.forEach(element => {
            aux = ""; 

            for (let i = 0; i < element.length; i++) {
                pos = element.charAt(i); 
                if (pos.search(/[a-zA-Z0-9ñÑ]/) == -1) {
                    aux += "*"; // Reemplazar todo lo que no sea letra con *
                }
                // Si es una letra
                else if (pos.search(/[0-9]/) == -1) {
                    desplazamiento = (key.length * contarVocales(key)) + (element.length * contarVocales(element));
                    pos = arrayLetras.indexOf(pos); 
                    for (let j = 1; j <= desplazamiento; j++) {
                        pos++;
                        if (pos >= arrayLetras.length) {
                            pos = 0;
                        }
                    }
                    aux += arrayLetras[pos];
                } 
                // Si es un número
                else {
                    desplazamiento = key.length * contarVocales(key) + element.length;
                    pos = parseInt(pos); 
                    for (let j = 1; j <= desplazamiento; j++) {
                        pos++;
                        if (pos >= arrayNumeros.length) { 
                            pos = 0;
                        }
                    }
                    aux += arrayNumeros[pos]; 
                }
            }

            element = aux;
            // palabraCodificada.push({
            //     codigo:desplazamiento,
            //     palabra:element
            // })
            document.getElementById("result").value += desplazamiento+"."+element+" ";

        });


    }
    
}

//DESCODIFICADOR
document.getElementById("discodify").onclick=function(){

    let texto = recogeTexto(document.getElementById("result").value);
    // Limpiamos el area del codificador para evitar problemas
    document.getElementById("codificador").value = "";
    let arrayKeys = [];
    let arrayPalabras = [];
    let arrayTexto = [];

    for(let i = 0; i<texto.length;i++){
        arrayTexto = texto[i].split(".");
        arrayKeys.push(arrayTexto[0]);
        arrayPalabras.push(arrayTexto[1]);
    }

    let pos;
    let aux;
    for(let i = 0;i<arrayKeys.length;i++){
        aux = "";
        for(let j = 0; j<arrayPalabras[i].length;j++){
            pos = arrayPalabras[i].charAt(j); 
            if (pos.search(/[a-zA-Z0-9ñÑ]/) == -1) {
                aux += "*"; // Reemplazar todo lo que no sea letra con *
            }
            // Si es una letra
            else if (pos.search(/[0-9]/) == -1) {
                pos = arrayLetras.indexOf(pos); 
                for (let k = 1; k <= parseInt(arrayKeys[i]); k++) {
                    pos--;
                    if (pos < 0) {
                        pos = arrayLetras.length-1;
                    }
                }
                aux += arrayLetras[pos];
            }
            //Si es un numero
            else {
                pos = parseInt(pos); 
                for (let k = 1; k <= parseInt(arrayKeys[i]); k++) {
                    pos--;
                    if (pos < 0) { 
                        pos = arrayNumeros.length-1;
                    }
                }
                aux += arrayNumeros[pos]; 
            }
        } 
        document.getElementById("codificador").value += aux+" ";
        }
        
        
    }