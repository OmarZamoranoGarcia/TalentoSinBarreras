import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import "./home.css";
import { useState } from "react";
import Campañas from "./Campanias";
import { LogoNegro } from "../assets/LogoNegro";
import { useEffect, useRef } from "react";

export function Home() {
  const [hidden, setHidden] = useState(true); // estado inicial oculto
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 539px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 539px)");

    const verificarPantalla = (e) => {
      if (e.matches) {
        setHidden(false); // mostrar
      } else {
        setHidden(true); // ocultar
      }
    };

    verificarPantalla(mediaQuery);
    mediaQuery.addEventListener("change", verificarPantalla);

    return () => mediaQuery.removeEventListener("change", verificarPantalla);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 539px)");

    const listener = (e) => setIsSmallScreen(e.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <>
      <header>
        <button id="btn-hambIcon">
          <MenuIcon fontSize={isSmallScreen ? "medium" : "large"} />
        </button>
        <div id="div-header-title">
          <LogoNegro className="logo" />
          <div>
            <h1>Talento sin barreras</h1>
            <p>“Conectando oportunidades y comunidad”</p>
          </div>
        </div>
        <div id="div-header-btns">
          <button
            id="btn-notificationsIcon"
            className={hidden ? "hidden" : "btn-notificationsIcon"}
          >
            <NotificationsIcon fontSize={isSmallScreen ? "medium" : "large"} />
          </button>
          <button id="btn-userIcon">
            <PersonIcon fontSize={isSmallScreen ? "medium" : "large"} />
          </button>
        </div>
      </header>

      <section id="home-section">
        <SearchBar />
        <Tabs />
      </section>

      <main>
        <div id="main-container-campanias">
          <h2>Campañas disponibles</h2>
          <Campañas
            nombreCampania="Campania ejemplo"
            empresa="I-XPORT"
            descripcion="lsdfsdsdfsdfssdfsfd"
          />
        </div>

        <div id="main-container-nitifications">
          <h2>Notificaciones</h2>
          <Campañas
            nombreCampania="Notificacion ejemplo"
            empresa="sasdads"
            descripcion="lsdfsdsdfsdfssdfsfd"
          />
        </div>
      </main>
    </>
  );
}

function SearchBar() {
  const [texto, setTexto] = useState("");

  return (
    <div id="main-searchBar">
      <input
        type="text"
        placeholder="Buscar..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
    </div>
  );
}

export default function Tabs() {
  return (
    <div id="main-tabs">
      <button>Campañas</button>
      <button>Postulante</button>
      <button>Donadores</button>
    </div>
  );
}
