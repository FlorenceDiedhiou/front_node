import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Questions from './../../composants/Questions';


const Accueil = () => {
  


  return (
     <div className="w-full  ">
         <div className="w-full h-[15vh] flex items-center justify-end px-10">
             <NavLink to="/ajouter_question" className="text-green-500 font-bold">Ajouter question</NavLink>
         </div>

         {/* composants des question */}
         <Questions></Questions>
    </div>
  )
}

export default Accueil
