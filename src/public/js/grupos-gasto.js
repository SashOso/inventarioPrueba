async function Listar() {
    let data=await articulos.lista();
    
    let content="";
    data.forEach((item,index) => {
        content+=`
            <tr>
                <td>${item.descripcion}</td>
                <td>
                    <button class="btn-editar" onclick="Editar(${item.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-eliminar" onclick="Eliminar(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `
    });
    document.querySelector("tbody").innerHTML=content;
}
async function Nuevo(){
}
async function Editar(id){
}
async function Eliminar(id){
}

//-------------main--------------//
const busqueda=document.getElementById("busqueda");

window.addEventListener("load",async ()=>{
    await Listar();
});
busqueda.addEventListener("keyup",async ()=>{
    await Listar();
})