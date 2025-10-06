import { LogoNegro } from "../assets/LogoNegro"
import "./LandingPage.css";

export function LandingPage(){
    const slides =[
        {imagen: "/src/assets/img2.png", texto:"“Accede a vacantes diseñadas para promover la inclusión laboral. Empresas comprometidas con la diversidad publican ofertas que permiten a personas con discapacidad desarrollar su carrera profesional sin barreras.”", backgroundColor:"#E76F51"},

        {imagen: "/src/assets/img3.png", texto:"“Facilitamos a los estudiantes el cumplimiento de su servicio social a través de proyectos educativos y comunitarios. Aprende, colabora y contribuye mientras desarrollas experiencia práctica y significativa.”", backgroundColor:"#F4A261"},

        {imagen: "/src/assets/img4.png", texto:"“Participa en iniciativas que fortalecen la comunidad. Desde voluntariado hasta proyectos locales, Talento Sin Barreras te acerca a oportunidades para impactar positivamente tu entorno.”", backgroundColor:"#E9C46A"},
    ]

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
                <p>Talento Sin Barreras conecta talento, educación y comunidad, ofreciendo empleo inclusivo y oportunidades de servicio social.</p>
                <button className="btnLandingPage">Registrarse</button>
                <button className="btnLandingPage">Iniciar Sesión</button>
                <img src="/src/assets/img1.png" alt=""/>     
                <Carrusel slides={slides}/> 
            </main>
        </>
    )
}

function Slide({ imagen, texto, backgroundColor}) {
  return (
    <div className="slide" style={{ backgroundColor}}>
      <img src={imagen} />
      <p>{texto}</p>
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