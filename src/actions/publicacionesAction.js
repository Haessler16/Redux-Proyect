import {TRAER_POR_USUARIOS, CARGANDO, ERROR} from "../type/publicacionesType"
import * as usuariosType from "../type/usuariosType"

    const {TRAER_TODOS: USUARIOS_TRAER_TODOS}= usuariosType

export const traerPorUsuarios = (key)=> async (dispatch, getState)=>{
    dispatch({
        type:CARGANDO,
    })
    
    const { publicaciones } = getState().publicacionesReducer;
    const { usuarios } = getState().usuariosReducer;
    const usuarios_id = usuarios[key].id
    
    try {
        const data = await import(`../data/posts-${usuarios_id}`)
        const response = data.default
        const publicaciones_actualizadas = [
            ...publicaciones,
            response
        ]

        dispatch({
            type: TRAER_POR_USUARIOS,
            payload: publicaciones_actualizadas,
        })

        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...usuarios]

        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuarios_actualizados
        })
        
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error.message
        })
    }
    
}
