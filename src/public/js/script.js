function formatoFecha(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
}
function formatoSoles(numero) {
    let opciones = { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 };
    return numero.toLocaleString('es-PE', opciones);
}

function fechaActual(){
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    
    return `${año}-${mes}-${dia}`;
}
function mesActual() {
    return new Date().getMonth() + 1;
}
function diaActual() {
    return new Date().getDate();
}
function añoActual() {
    return new Date().getFullYear();
}