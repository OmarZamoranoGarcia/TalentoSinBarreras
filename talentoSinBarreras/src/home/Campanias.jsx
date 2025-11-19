import FavoriteIcon from '@mui/icons-material/Favorite';
import './campanias.css'

export default function Campañas({ nombreCampania, empresa, descripcion }) {
  return (
    <section className="campania-card">
      <div>
        <h3>{nombreCampania}</h3>
        <p>{empresa}</p>
        <p>{descripcion}</p>
        <button>Postularse</button>
      </div>
      <div>
        <button id='btn-follow'><FavoriteIcon/></button>
      </div>
    </section>
  );
}
