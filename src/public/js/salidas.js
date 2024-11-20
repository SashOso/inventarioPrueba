async function Listar() {
    let data=await salidas.lista();
    data=data.filter(item=>
        item.articulo.codigo.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.articulo.descripcion.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.articulo.unidad_medida.nombre.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.tipo_documento.nombre.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())||
        item.numero_documento.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase()) ||
        item.observacion.trim().toLowerCase().includes(busqueda.value.trim().toLowerCase())
    );
    
    let content="";
    data.forEach((item,index) => {
        content+=`
            <tr>
                <td>${formatoFecha(item.fecha)}</td>
                <td>${item.articulo.codigo}</td>
                <td>${item.articulo.descripcion}</td>
                <td>${item.articulo.unidad_medida.nombre}</td>
                <td>${item.tipo_documento.nombre}</td>
                <td>${item.numero_documento}</td>
                <td>${item.cantidad}</td>
                <td>${formatoSoles(item.precio_unitario)}</td>
                <td>${formatoSoles(item.cantidad*item.precio_unitario)}</td>
                <td>${item.observacion}</td>
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
    let data_articulos = await articulos.lista();
    const options_articulos = data_articulos.map(x => 
        `<option value="${x.id}">${x.codigo+": "+x.descripcion}</option>`
    ).join('');

    let data_tipos_documento = await tipos_documento.lista();
    const options_tipos_documento = data_tipos_documento.map(x => 
        `<option value="${x.id}">${x.nombre}</option>`
    ).join('');


    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Registrar nuevo",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="fecha">Fecha <span class="color-red">(*)</span>: </label>
            <input id="fecha" type="date" class="swal2-input">
            
            <label for="articulo">Articulo <span class="color-red">(*)</span>: </label>
            <select id="articulo" class="swal2-select"><option value=""> </option>${options_articulos}</select>

            <label for="tipo_documento">Tipo Doc <span class="color-red">(*)</span>: </label>
            <select id="tipo_documento" class="swal2-select"><option value=""> </option>${options_tipos_documento}</select>

            <label for="numero_documento">N° Doc: </label>
            <input id="numero_documento" type="text" class="swal2-input">

            <label for="cantidad">Cantidad <span class="color-red">(*)</span>: </label>
            <input id="cantidad" type="text" class="swal2-input">

            <label for="precio_unitario">Prec/Uint: </label>
            <input id="precio_unitario" type="text" class="swal2-input">

            <label for="observacion">Observ: </label>
            <input id="observacion" type="text" class="swal2-input">
        </div>
        `,
        didOpen: async () => {
            document.getElementById('fecha').value=fechaActual()
        },
        preConfirm:async () => {
            const fecha=document.getElementById('fecha').value;
            const articulo_id=document.getElementById('articulo').value;
            const tipo_documento_id=document.getElementById('tipo_documento').value;
            const numero_documento=document.getElementById('numero_documento').value;
            const cantidad=parseInt(document.getElementById('cantidad').value)||0;
            const precio_unitario=parseFloat(document.getElementById('precio_unitario').value)||0;
            const observacion=document.getElementById('observacion').value;

            if (!fecha || !articulo_id || !tipo_documento_id || !cantidad) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }

            return {fecha,articulo_id,tipo_documento_id,numero_documento,cantidad,precio_unitario,observacion};
        }
    })

    if (value) {
        console.log(value);
        
        const agrego=await salidas.agregar(value);
        if(agrego){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Agregado!', timer: 3000, showCloseButton: true});
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true });
        }
    }
}
async function Editar(id){
    const obj= await salidas.buscar(id);
    

    let data_articulos = await articulos.lista();
    const options_articulos = data_articulos.map(x => 
        `<option value="${x.id}">${x.codigo+": "+x.descripcion}</option>`
    ).join('');

    let data_tipos_documento = await tipos_documento.lista();
    const options_tipos_documento = data_tipos_documento.map(x => 
        `<option value="${x.id}">${x.nombre}</option>`
    ).join('');


    const{ value: value } =await Swal.fire({
        position: "center",
        title: "Registrar nuevo",
        showCancelButton: true,
        showCloseButton: true,
        html: `
        <div class="formulario">
            <label for="fecha">Fecha <span class="color-red">(*)</span>: </label>
            <input id="fecha" type="date" class="swal2-input" value="${obj.fecha}">
            
            <label for="articulo">Articulo <span class="color-red">(*)</span>: </label>
            <select id="articulo" class="swal2-select"><option value=""> </option>${options_articulos}</select>

            <label for="tipo_documento">Tipo Doc <span class="color-red">(*)</span>: </label>
            <select id="tipo_documento" class="swal2-select"><option value=""> </option>${options_tipos_documento}</select>

            <label for="numero_documento">N° Doc: </label>
            <input id="numero_documento" type="text" class="swal2-input" value="${obj.numero_documento}">

            <label for="cantidad">Cantidad <span class="color-red">(*)</span>: </label>
            <input id="cantidad" type="text" class="swal2-input" value="${obj.cantidad}">

            <label for="precio_unitario">Prec/Uint: </label>
            <input id="precio_unitario" type="text" class="swal2-input" value="${obj.precio_unitario}">

            <label for="observacion">Observ: </label>
            <input id="observacion" type="text" class="swal2-input" value="${obj.observacion}">
        </div>
        `,
        didOpen: async () => {
            document.getElementById('articulo').value = obj.articulo.id;
            document.getElementById('tipo_documento').value = obj.tipo_documento.id;
        },
        preConfirm:async () => {
            const fecha=document.getElementById('fecha').value;
            const articulo_id=document.getElementById('articulo').value;
            const tipo_documento_id=document.getElementById('tipo_documento').value;
            const numero_documento=document.getElementById('numero_documento').value;
            const cantidad=parseInt(document.getElementById('cantidad').value)||0;
            const precio_unitario=parseFloat(document.getElementById('precio_unitario').value)||0;
            const observacion=document.getElementById('observacion').value;

            if (!fecha || !articulo_id || !tipo_documento_id || !cantidad) {
                Swal.showValidationMessage('Por favor, complete todos los campos obligatorios');
                return false;
            }

            return {id, fecha,articulo_id,tipo_documento_id,numero_documento,cantidad,precio_unitario,observacion};
        }
    })

    if (value) {
        const actualizado=await salidas.editar(value);
        if(actualizado){
            Listar()
            Swal.fire({ icon: 'success', title: '¡Modificado!', timer: 3000, showCloseButton: true});
        }else{
            Swal.fire({ icon: 'error', title: 'Error', timer: 3000, showCloseButton: true });
        }
    }
}
async function Eliminar(id){
    const obj = await salidas.buscar(id);

    const { value } = await Swal.fire({
        position: "center",
        title: `¿Deseas eliminar ${obj.articulo.codigo}?`,
        text: `${obj.articulo.descripcion}`,
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
    });

    if (value) {
        const respuesta=await salidas.eliminar(id);
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