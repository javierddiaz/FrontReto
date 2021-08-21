const url = "https://retounab.herokuapp.com/equipo/"
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalequipos = new bootstrap.Modal(document.getElementById('modalEquipo'))
const formEquipos = document.querySelector('form')
const nombreEquipo = document.getElementById('nombre')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombreEquipo.value = ''
    modalequipos.show()
    opcion = 'crear'
})

//funcion para mostra resultados

const mostrar = (equipos) => {
    equipos.forEach(articulo => {
        resultados += `<tr>
                        <td width="10%">${articulo.id}</td>
                        <td width="70%">${articulo.nombre}</td>
                        <td class="text-center" width="20%"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>`
    })

    contenedor.innerHTML = resultados
}

//procedimiento mostrar registros
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector))
            handler(e)
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    console.log(id)

    alertify.confirm("Desea eliminar el equipo",
        function () {
            fetch(url+id,{
                method:'DELETE'
            })
            .then(()=>location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})