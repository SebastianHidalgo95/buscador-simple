//variables
const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda ={
    marca:'',
    year:'',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
} 
//eventos
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos); //muestra los autos al cargar
    llenarSelect(); //llena las opciones de años    
})

//Event listeners para la seleccion 
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
})

 //funciones

function noResultado(){
    limpiarHTML(); 
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function mostrarAutos(autos){

    limpiarHTML();    
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto; 
        const autoHTML = document.createElement('p');
        
        autoHTML.textContent = `
            ${marca}-${year}-${puertas}-${transmision}-${precio}-${color}
            `;

        //insertar en el html
        resultado.appendChild(autoHTML);
    });
}

//filtrar en base a la busqueda
function filtrarAuto (){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor);   
    
    if (resultado.length) {
        console.log(resultado);

        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}

function filtrarMarca (auto) {
    
    const {marca} = datosBusqueda;
    if (marca)
    {        
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear (auto) {    
    const {year} = datosBusqueda;
    //Todos los datos de un form vienen como string  
    if (year)
    {       
        return auto.year === year;
    }
    return auto;
}

function filtrarPuertas (auto) {    
    const {puertas} = datosBusqueda;
    //Todos los datos de un form vienen como string  
    if (puertas)
    {       
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarColor (auto) {    
    const {color} = datosBusqueda;
    //Todos los datos de un form vienen como string  
    if (color)
    {       
        return auto.color === color;
    }
    return auto;
}

function filtrarMinimo (auto) {
    const {minimo} = datosBusqueda;
    if(minimo)
    {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo (auto) {
    const {maximo} = datosBusqueda;
    if(maximo)
    {
        return auto.precio <= maximo;
    }
    return auto;
}

function llenarSelect(){
    for (let i = max; i > min ; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega los años como opciones        
    }
}

function limpiarHTML ()
{
    while(resultado.firstChild)
    {   
        resultado.removeChild(resultado.firstChild);
    }
}