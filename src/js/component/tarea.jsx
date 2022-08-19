import React from "react";

const Tarea = ({nombre, clase, eliminarTarea, indice}) => {

    return (
        <div>
            <li className={clase}>
                <span>{nombre}</span>
                <span className="justify-content-between"><i className="bi bi-trash miTrash" onClick={()=>eliminarTarea(nombre)}></i></span>
            </li>
        </div>
    )
}

export default Tarea;