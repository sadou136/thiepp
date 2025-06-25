import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';


function LivreDetail({ livre }) {
  if (!livre) return null;

  return (
    <div className="mt-6 p-4 border-t border-gray-300">
      <h2 className="text-xl font-bold mb-2">📖 Détail du livre</h2>
      <p><strong>Titre :</strong> {livre.titre}</p>
      <p><strong>Auteur :</strong> {livre.auteur}</p>
      <p>
        <strong>Disponibilité :</strong>{' '}
        <span className={livre.disponible ? 'text-green-600' : 'text-red-600'}>
          {livre.disponible ? 'Disponible' : 'Indisponible'}
        </span>
      </p>
      {livre.disponible && (
  <ReservationForm livreId={livre.id} />
)}

    </div>
  );
}

export default function LivreList() {
  const [livres, setLivres] = useState([]);
  const [filtrerDispo, setFiltrerDispo] = useState(false);
  const [livreSelectionne, setLivreSelectionne] = useState(null);

  useEffect(() => {
    const url = filtrerDispo ? '/livres/disponibles' : '/livres';
    axios.get(url)
      .then(res => setLivres(res.data))
      .catch(err => console.error(err));
  }, [filtrerDispo]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">📚 Tous les Livres</h1>
      <div className="text-center mb-4">
        <label className="mr-2 font-medium">Afficher uniquement les livres disponibles</label>
        <input type="checkbox" checked={filtrerDispo} onChange={e => setFiltrerDispo(e.target.checked)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {livres.map(livre => (
          <div
            key={livre.id}
            onClick={() => setLivreSelectionne(livre)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{livre.titre}</h2>
            <p className="text-gray-600">Auteur : {livre.auteur}</p>
            <p className={livre.disponible ? 'text-green-600' : 'text-red-500'}>
              {livre.disponible ? 'Disponible' : 'Indisponible'}
            </p>
          </div>
        ))}
      </div>
      <LivreDetail livre={livreSelectionne} />
    </div>
  );
}
