import { useNavigate } from 'react-router-dom'
import Questions from './../../composants/Questions'

const Accueil = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const VerificationToken = () => {
    if (token) return navigate('/ajouter_question')
    navigate('/connexion')
  }

  return (
    <div className="w-full">

      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Bienvenue sur <span className="text-yellow-300">DevForum</span> 
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base max-w-lg">
              Posez vos questions, partagez vos connaissances et progressez avec la communauté des développeurs.
            </p>
          </div>

          <button
            onClick={VerificationToken}
            className="flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Poser une question
          </button>
        </div>
      </div>

      {/* ── Liste des questions ── */}
      <Questions />
    </div>
  )
}

export default Accueil
