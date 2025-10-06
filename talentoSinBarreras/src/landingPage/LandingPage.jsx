import { useNavigate } from "react-router-dom";
import { LogoNegro } from "../assets/LogoNegro"
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import "./LandingPage.css";

export function LandingPage(){
const navigate = useNavigate();
  const slides =[
    {imagen: img2, texto:"“Accede a vacantes diseñadas para promover la inclusión laboral. Empresas comprometidas con la diversidad publican ofertas que permiten a personas con discapacidad desarrollar su carrera profesional sin barreras.”", backgroundColor:"#E76F51"},

    {imagen: img3, texto:"“Facilitamos a los estudiantes el cumplimiento de su servicio social a través de proyectos educativos y comunitarios. Aprende, colabora y contribuye mientras desarrollas experiencia práctica y significativa.”", backgroundColor:"#F4A261"},

    {imagen: img4, texto:"“Participa en iniciativas que fortalecen la comunidad. Desde voluntariado hasta proyectos locales, Talento Sin Barreras te acerca a oportunidades para impactar positivamente tu entorno.”", backgroundColor:"#E9C46A"},
  ]

console.log("LandingPage render");
    return(
        <>
            <header>
                <LogoNegro id="logo" />
                <div id="header-title">
                    <h1>Talento sin barreras</h1>
                    <p>“Conectando oportunidades y comunidad”</p>
                </div>
            </header>
            <main id="main">
                <p id="main-p">Talento Sin Barreras conecta talento, educación y comunidad, ofreciendo empleo inclusivo y oportunidades de servicio social.</p>
                <button className="btnLandingPage" type="button" onClick={()=>navigate("/registro")}>Registrarse</button>
                <button className="btnLandingPage" type="button" onClick={()=>navigate("/login")}>Iniciar Sesión</button>
                <img src={img1} id="imgPrincipal"/>     
                <Carrusel slides={slides}/> 
            </main>
        </>
    )
}

function Slide({ imagen, texto, backgroundColor}) {
  return (
    <div className="slide" style={{ backgroundColor}}>
      <p>{texto}</p>
      <img src={imagen} />
    </div>
  );
}

function Carrusel({ slides }) {
  return (
    <div className="carrusel">
      {slides.map((slide, index) => (
        <Slide key={index} imagen={slide.imagen} texto={slide.texto} backgroundColor={slide.backgroundColor}/>
      ))}
    </div>
  );
}