import React from 'react'
import "../../css/loader.css"

export default function Spinner() {
    return  <div className="center">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
}
