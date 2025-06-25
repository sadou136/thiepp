import React, { useState } from 'react';
import axios from 'axios';

export default function ReservationForm({ livreId, onSuccess }) {
  const [userId, setUserId] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [message, setMessage] = useState('');

  const reserver = () => {
    if (!userId || !dateDebut || !dateFin) {
      setMessage("Tous les champs sont obligatoires.");
      return;
    }

    axios.post('/reservations', {
      userId,
      livreId,
      dateDebut,
      dateFin
    })
    .then(res => {
      setMessage("✅ Réservation effectuée !");
      onSuccess && onSuccess();
    })
    .catch(err => {
      console.error(err);
      setMessage("❌ Erreur lors de la réservation.");
    });
  };

  return (
    <div className="mt-4 bg-gray-50 border p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Réserver ce livre</h3>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nom de l'utilisateur"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={dateDebut}
          onChange={e => setDateDebut(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          value={dateFin}
          onChange={e => setDateFin(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded"
          onClick={reserver}
        >
          Valider la réservation
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}
