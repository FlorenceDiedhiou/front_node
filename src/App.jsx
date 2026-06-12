import React from 'react'
import Connexion from './app/pages/Connexion';
import Inscription from './app/pages/Inscription';
import UserLayout from './app/layout/UserLayout';
import Accueil from './app/pages/Accueil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const App = () => {

     const router = createBrowserRouter([
     
      //  route de la connexion
      {path:'/' , element:<Connexion/>},
      //  route de l'inscription
      {path:'/inscription' , element:<Inscription/>},
      //  route de l'accueil
      { path:'/accueil' , element:<UserLayout/> ,
         children :[
              {path:'/accueil' , element:<Accueil/>},
              // {path:'/details' , element:<Detail_message/>},
              // {path:'/messages' , element:<Message/>},

        ]
        }





    


     ])


  return (
     <RouterProvider router={router} />
  )
}

export default App
