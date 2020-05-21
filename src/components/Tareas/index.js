import React, { Component } from 'react'
import {connect} from "react-redux"
import * as tareasAction from "../../actions/tareasAction"
import Spinner from "../general/Spinner"
import Fatal from "../general/Fatal"

class Tareas extends Component {
    componentDidMount(){
        this.props.traerTodas()
    }
    mostrarContenido =()=>{
        const {cargando, error, tareas} =this.props
        if(cargando){
            return <Spinner/>
        }
        if(error){
            return <Fatal mensage={error}/>
        }

        return Object.keys(tareas).map((usu_id)=>(
            <div key={usu_id}>
                <h2>Usuario {usu_id}:</h2>
                <div className="contenedor_tarea">
                    {this.mostrarTareas(usu_id)}
                </div>
            </div>
        ))
    }
    mostrarTareas=(usu_id)=>{
        const {tareas} = this.props
        const por_usuario = {
            ...tareas[usu_id]
        }
        return Object.keys(por_usuario).map(tar_id=>(
            <div key={tar_id}>
                <input type="checkbox" defaultChecked={por_usuario[tar_id].completed}/>
                {por_usuario[tar_id].title}
            </div>
        ))
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                {this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({tareasReducer})=> tareasReducer

export default connect(mapStateToProps, tareasAction)(Tareas)
