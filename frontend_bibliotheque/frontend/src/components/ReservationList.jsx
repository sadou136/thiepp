import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState('');

  const chargerReservations = () => {
    axios.get('/reservations')
      .then(res => setReservations(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    chargerReservations();
  }, []);

  const isActive = (dateFin) => {
    const today = new Date();
    return new Date(dateFin) >= today;
  };

  const supprimerReservation = (id) => {
    axios.delete(`/reservations/${id}`)
      .then(() => {
        setMessage("✅ Réservation supprimée.");
        chargerReservations();
      })
      .catch(() => {
        setMessage("❌ Échec de la suppression.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧾 Liste des Réservations</h2>
      {message && <p className="text-sm mb-2">{message}</p>}
      {reservations.length === 0 ? (
        <p>Aucune réservation enregistrée.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div key={r.id} className="bg-white p-4 shadow rounded border">
              <p><strong>Utilisateur :</strong> {r.utilisateur}</p>
              <p><strong>Livre ID :</strong> {r.livre.id}</p>
              <p><strong>Titre :</strong> {r.livre.titre}</p>
              <p><strong>Date début :</strong> {r.dateDebut}</p>
              <p><strong>Date fin :</strong> {r.dateFin}</p>
              <p>
                <strong>État :</strong>{' '}
                <span className={isActive(r.dateFin) ? 'text-green-600' : 'text-red-500'}>
                  {isActive(r.dateFin) ? 'Active' : 'Terminée'}
                </span>
              </p>
              <button
                onClick={() => supprimerReservation(r.id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
