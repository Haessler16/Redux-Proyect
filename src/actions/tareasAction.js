import Todos from "../data/todos.json"
import {TRAER_TODAS, CARGANDO, ERROR} from "../type/tareasType"

export const traerTodas = ()=> async(dispatch)=>{
    dispatch({
        type: CARGANDO,
    })

    try {
        const respuesta = await Todos
        const tareas= {}
        respuesta.map(tar=>(
            tareas[tar.userId]={
                ...tareas[tar.userId],
                [tar.id]:{
                    ...tar
                }
            }
        ))
        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }

    
}