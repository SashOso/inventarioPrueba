async function Listar() {
    let data=await tipos_documento.lista();
    data=data.filter(item=>
        item.nombre.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())
    );
    
    let content="";
    data.forEach((item,index) => {
        content+=`
            <tr>
                <td>${item.nombre}</td>
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
    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Registrar nuevo",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="nombre">Nombre: <span style="color: red;">(*)</span></label>
            <input id="nombre" type="text" class="swal2-input" placeholder="Nombre">
        </div>
        `,

        preConfirm:async () => {
            const nombre=document.getElementById('nombre').value.trim().toUpperCase();

            if (!nombre) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }
            return { nombre };
        }
    })

    if (value) {
        const respuesta=await tipos_documento.agregar(value);
        if(respuesta){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Agregado!', timer: 3000, showCloseButton: true, });
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true, });
        }
    }
}
async function Editar(id){
    const obj=await tipos_documento.buscar(id)

    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Editar Fuente de Ingreso",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="nombre">Nombre: <span style="color: red;">(*)</span></label>
            <input id="nombre" value="${obj.nombre}" type="text" class="swal2-input" placeholder="Nombre">
        </div>
        `,

        preConfirm:async () => {
            const nombre=document.getElementById('nombre').value.trim().toUpperCase();

            if (!nombre) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }
            return { id,nombre };
        }
    });

    if (value) {
        const respuesta=await tipos_documento.editar(value);
        if(respuesta){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Editado!', timer: 3000, showCloseButton: true, });
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true, });
        }
    }
}
async function Eliminar(id){
    const obj = await tipos_documento.buscar(id);

    const { value } = await Swal.fire({
        position: "center",
        title: `¿Deseas eliminar ${obj.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
    });

    if (value) {
        const respuesta=await tipos_documento.eliminar(id);
        if(respuesta){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Eliminado!', timer: 3000, showCloseButton: true,});
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true });
        }
    }
}

//-------------main--------------//
const busqueda=document.getElementById("busqueda");

window.addEventListener("load",async ()=>{
    await Listar();
});
busqueda.addEventListener("keyup",async ()=>{
    await Listar();
})