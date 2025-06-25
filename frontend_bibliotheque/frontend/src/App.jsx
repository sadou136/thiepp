import React from 'react'
import LivreList from './components/LivreList'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">📚 Liste des Livres</h1>
      <LivreList />
    </div>
  )
}
