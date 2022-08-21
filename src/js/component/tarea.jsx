import React from "react";

const Tarea = ({nombre, clase, eliminarTarea}) => {

    return (
        <div>
            <li className={clase}>
                {console.log(nombre.done,"estoy dentro de la tarea a eliminar")}
                <span className={`"" + ${nombre.done ? " tachado" : ""}`}>{nombre.label}</span>
                <span className="justify-content-between"><i className="bi bi-trash miTrash" onClick={eliminarTarea}></i></span>
            </li>
        </div>
    )
}

export default Tarea;