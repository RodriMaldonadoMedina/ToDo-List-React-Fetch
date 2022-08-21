import React from "react";

const Tarea = ({nombre, clase, eliminarTarea}) => {

    return (
        <div>
            <li className={clase}>
                <span className={`"" + ${nombre.done ? " tachado" : ""}`}>{nombre.label}</span>
                <span className="justify-content-between"><i className="bi bi-trash miTrash" onClick={eliminarTarea}></i></span>
            </li>
        </div>
    )
}

export default Tarea;