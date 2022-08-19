import React from "react";

const Tarea = ({indice, nombre, clase, eliminarTarea}) => {

    return (
        <div>
            <li className={clase} key={indice} id={indice}>
                <span>{nombre}</span>
                <span className="justify-content-between"><i className="bi bi-trash miTrash" onClick={eliminarTarea}></i></span>
            </li>
        </div>
    )
}

export default Tarea;