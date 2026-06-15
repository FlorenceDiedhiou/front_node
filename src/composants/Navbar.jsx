import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  //   const navigate = useNavigate();
  //    const token = localStorage.getItem("token");
  //       if (!token) {
  //           alert("Accès refusé. Veuillez vous connecter.");
  //           navigate('/')
  //       }

        
  // const Deconnexion = () => {
  //     localStorage.removeItem("token");
  //       navigate('/')
  // }

  return (
    <div className='w-full h-[10vh] flex items-center justify-between px-10 py-2 bg-neutral-400'>
        <NavLink to="/">Logo</NavLink>
         <div className="flex items-center gap-5">
            <NavLink to="/profil" className='text-white'>Profil</NavLink>
             <button
            onClick={() => Deconnexion()}
            className="bg-red-600 text-white px-6 py-1 rounded font-bold hover:bg-red-700">
            Se déconnecter
        </button>
         </div>
    </div>
  )
}

export default Navbar
