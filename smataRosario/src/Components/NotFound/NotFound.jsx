import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className='background-image'>
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Página no encontrada</p>
      <Link to="/" className="notfound-link">
        Volver al inicio
      </Link>
    </div>
    </div>
  );
}