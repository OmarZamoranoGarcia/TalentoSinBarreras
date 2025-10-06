export function InputsLogin({ label, placeholder, value, onChange, type = "text"}){
    return(
        <>
            <label className="labelRegistro">{label}</label>
            <input type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="inputRegistro"
            />
        </>
    )
}

export function Select({ label}){
    return(
        <>
            <label className="labelRegistro">{label}</label>
            <select name="rolCuenta" id="selectRolCuenta">
                <optgroup label="Instituciones">
                    <option value="InstitucionPublica">Institución publica</option>
                    <option value="InstitucionPrivada">Institución privada</option>
                </optgroup>
                <optgroup label="Postulantes">
                    <option value="PersonaDiscapacitada">Persona discapacitada</option>
                    <option value="PersonaServicioComunitario">Persona a realizar servicio comunitario</option>
                    <option value="PersonaServicioSocial">Persona a realizar servicio social</option>
                </optgroup>
                
            </select>
        </>
    )
}

export function Sumbit({text}){
    return(
        <button type="sumbit" id="btnSumbit">{text}</button>
    )
}