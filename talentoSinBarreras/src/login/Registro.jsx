import { useState } from "react";
import { InputsLogin, Select, Sumbit } from "./InputsLogin"
import "./Registro.css";

export function Registro(){
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de registro:", { nombre, email, password });
        // aquí puedes llamar a tu backend o hacer validaciones
    };
    
    return(
    <form id="formRegistro" onSubmit={handleSubmit}>
        <div id="contenedorTitulo">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svgUser">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <h1>Registro</h1>
        </div>
        
        <div id="contenedorInputs">
            <InputsLogin
                label="Nombre (s)"
                placeholder="Nombre (s)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <InputsLogin
                label="Apellido paterno"
                placeholder="Apellido paterno"
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
            />

            <InputsLogin
                label="Apellido materno"
                placeholder="Apellido materno"
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
            />

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

            <Select
                label="Rol de la cuenta"
            />

            <Sumbit
                text="Enviar Registro"
            />
        </div>

    </form>
  )
}