import { TRAER_TODAS, CARGANDO, ERROR } from "../type/tareasType"

const INITIAL_STATE ={
    tareas: [],
    cargando: false,
    error: null
}

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case TRAER_TODAS: 
            return{
                ...state,
                tareas: action.payload,
                error: null,
                cargando: false,
            }
        case CARGANDO:
            return{...state, cargando: true}
        case ERROR:
            return{...state, error: action.payload, cargando: false}
        default: return state
    }
}