import React from 'react'
import "../../css/index.css"

export default function Fatal(props) {
    return (
        <h2 className="center rojo">
            {props.mensage}
        </h2>
    )
}
