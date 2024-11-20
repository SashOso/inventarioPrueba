async function Listar() {
    let data=await articulos.lista();
    data=data.filter(item=>
        item.codigo.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase()) ||
        item.descripcion.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase()) ||
        item.unidad_medida.nombre.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())
    );
    
    let content="";
    data.forEach((item,index) => {
        content+=`
            <tr>
                <td>${item.codigo}</td>
                <td>${item.descripcion}</td>
                <td>${item.unidad_medida.nombre}</td>
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
    let data_unidades_medida = await unidades_medida.lista();
    const options_unidades_medida = data_unidades_medida.map(x => 
        `<option value="${x.id}">${x.nombre}</option>`
    ).join('');


    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Registrar nuevo",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="codigo">Codigo <span class="color-red">(*)</span>: </label>
            <input id="codigo" type="text" class="swal2-input" placeholder="Codigo">

            <label for="descripcion">Descripción <span class="color-red">(*)</span>: </label>
            <input id="descripcion" type="text" class="swal2-input" placeholder="Descripción">
            
            <label for="unidad_medida">Unidad de Medida <span class="color-red">(*)</span>: </label>
            <select id="unidad_medida" class="swal2-select"><option value=""> </option>${options_unidades_medida}</select>
        </div>
        `,
        didOpen: async () => {
            const unidad_medida=document.getElementById('unidad_medida');
        },
        preConfirm:async () => {
            const codigo=document.getElementById('codigo').value.trim().toUpperCase();
            const descripcion=document.getElementById('descripcion').value.trim();
            const unidad_medida_id=document.getElementById('unidad_medida').value;

            if (!codigo || !descripcion || !unidad_medida_id) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }

            return {codigo,descripcion,unidad_medida_id};
        }
    })

    if (value) {
        const agrego=await articulos.agregar(value);
        if(agrego){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Agregado!', timer: 3000, showCloseButton: true});
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true });
        }
    }
}
async function Editar(id){
    let data_unidades_medida = await unidades_medida.lista();
    const options_unidades_medida = data_unidades_medida.map(x => 
        `<option value="${x.id}">${x.nombre}</option>`
    ).join('');

    
    const obj=await articulos.buscar(id);
    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Editar",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="codigo">Codigo <span class="color-red">(*)</span>: </label>
            <input id="codigo" type="text" class="swal2-input" placeholder="Codigo" value="${obj.codigo}">

            <label for="descripcion">Descripción <span class="color-red">(*)</span>: </label>
            <input id="descripcion" type="text" class="swal2-input" placeholder="Descripción" value="${obj.descripcion}">
            
            <label for="unidad_medida">Unidad de Medida <span class="color-red">(*)</span>: </label>
            <select id="unidad_medida" class="swal2-select"><option value=""> </option>${options_unidades_medida}</select>
        </div>
        `,
        didOpen: () => {
            document.getElementById('unidad_medida').value = obj.unidad_medida.id;
        },

        preConfirm:async () => {
            const codigo=document.getElementById('codigo').value.trim().toUpperCase();
            const descripcion=document.getElementById('descripcion').value.trim();
            const unidad_medida_id=document.getElementById('unidad_medida').value;

            if (!codigo || !descripcion || !unidad_medida_id) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }

            return {id, codigo,descripcion,unidad_medida_id};
        }
    })

    if (value) {
        console.log(value);
        
        const actualizado=await articulos.editar(value);
        if(actualizado){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Modificado!', timer: 3000, showCloseButton: true});
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true });
        }
    }
}
async function Eliminar(id){
    const obj = await articulos.buscar(id);

    const { value } = await Swal.fire({
        position: "center",
        title: `¿Deseas eliminar ${obj.codigo}?`,
        text: `${obj.descripcion}`,
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
    });

    if (value) {
        const respuesta=await articulos.eliminar(id);
        if(respuesta){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Eliminado!', timer: 3000, showCloseButton: true });
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