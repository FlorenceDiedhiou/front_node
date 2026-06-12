import React from 'react'
import { useNavigate } from 'react-router-dom';


const Accueil = () => {
    const navigate = useNavigate();
     const token = localStorage.getItem("token");
        if (!token) {
            alert("Accès refusé. Veuillez vous connecter.");
            navigate('/')
        }

        
  const Deconnexion = () => {
      localStorage.removeItem("token");
        navigate('/')
  }



  return (
     <div className="w-screen h-screen bg-neutral-100 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Bienvenue </h1>
        <p className="text-gray-500">Vous êtes connecté avec succès.</p>
        <button
            onClick={() => Deconnexion()}
            className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700">
            Se déconnecter
        </button>
    </div>
  )
}

export default Accueil
