import { useState } from "react"
import { InputsLogin, Sumbit } from "./InputsLogin"
import { LogoBlanco } from "../assets/LogoBlanco";
import "./Login.css";

export function Login(){
    const [correo,setCorreo] = useState("")
    const [contrasenia,setContrasenia] = useState("")

    return(
        <div id="contenedorForm">
            <form action="" id="formLogin">
                <LogoBlanco/>
                <h1>Talento sin barreras</h1>

                <div id="contenedorInputs">
                    <InputsLogin
                        label="Correo"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />

                    <InputsLogin
                        label="Contraseña"
                        placeholder="Contraseña"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                    />

                    <Sumbit
                        text="Iniciar Sesión"
                    />
                </div>
            </form>
        </div>
    )
}