import React from 'react';
import {connect} from "react-redux"
import Spinner from "../general/Spinner"
import Fatal from "../general/Fatal"

const Comentarios = (props) => {
    // console.log(props);
    if(props.com_error){
        return <Fatal mensage={props.com_error}/>
    }
    // aqui debe colocar el && !props.comentarios.length al lado de com_cargando
    if(props.com_cargando){
        return <Spinner/>
    }
    return <ul>
            {
                Object.keys(props.comentarios).map((com_id) => (
                    <div key={com_id}>
                        {ponerComentarios(props,com_id)}
                    </div>
                ))
            }
        </ul>;
};

const ponerComentarios = (props, com_id) =>{
    const { comentarios } = props
    const por_comentario = {
        ...comentarios[com_id]
    }
    return(
        <li key={por_comentario.id}>
            <b>
                <u>
                    {por_comentario.email}
                </u>
            </b>
            <br/>
            {por_comentario.body}
        </li>
    )
}

const mapStateToProps = ({publicacionesReducer})=> publicacionesReducer

export default connect(mapStateToProps)(Comentarios);
