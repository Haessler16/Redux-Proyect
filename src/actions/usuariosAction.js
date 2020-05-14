import Data from "../data/users"
import {TRAER_TODOS, CARGANDO, ERROR} from "../type/usuariosType"

export const traerTodos = ()=> async(dispatch)=>{
    dispatch({
        type: CARGANDO
    })
    try {
        const respuesta = await Data
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta
        })
    } catch (error) {
        // console.log(`Error: ${error.message}`);
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
}