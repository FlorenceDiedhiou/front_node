import React from 'react'
import { Link } from 'react-router-dom'


const Inscription = () => {
  
  // la logique


  return (
      <div className="w-screen h-screen bg-neutral-400 flex items-center justify-center">

        <div className="w-full max-w-xl p-5 bg-white">

            <h1 className="text-center font-bold text-xl">Inscription</h1>

            <form action="">
                <div className="flex flex-col gap-2">
                    <label for="prenom">Prénom</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="text" name="prenom" id="prenom" placeholder="Prénom"/>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label for="nom">Nom</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="text" name="nom" id="nom" placeholder="Nom"/>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label for="email">Email</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="email" name="email" id="email" placeholder="exemple@gmail.com"/>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label for="password">Mot de passe</label>
                    <input
                        className="border py-1 px-3 border-black"
                        type="password" name="password" id="password" placeholder="Mot de passe" />
                </div>

                <button type="submit" id="btn2" className="w-full bg-black text-white mt-10 py-2 mb-2">S'inscrire</button>
                <Link to="/" className="text-red-600 font-bold underline">Se connecter</Link>
            </form>

        </div>

    </div>
  )
}

export default Inscription
