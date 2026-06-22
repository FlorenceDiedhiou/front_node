import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    toast.success('Déconnexion réussie')
    closeMenu()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
    }`

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'text-indigo-700 bg-indigo-50'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:shadow-indigo-300 transition-shadow duration-300">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">
              Dev<span className="text-indigo-500">Forum</span>
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Accueil</NavLink>
            <NavLink to="/profil" className={linkClass}>Profil</NavLink>
            <NavLink to="/ajouter_question" className={linkClass}>Questions</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Se déconnecter
              </button>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 bg-white hover:bg-indigo-50 transition-all duration-200"
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/inscription"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200"
                >
                  S'inscrire
                </NavLink>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all duration-200"
            aria-label="Ouvrir ou fermer le menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 space-y-1 animate-slide-down">
          <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>
            Accueil
          </NavLink>
          <NavLink to="/profil" onClick={closeMenu} className={mobileLinkClass}>
            Profil
          </NavLink>
          <NavLink to="/ajouter_question" onClick={closeMenu} className={mobileLinkClass}>
            Poser une question
          </NavLink>

          <div className="border-t border-slate-100 pt-2 mt-2 space-y-2">
            {token ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex justify-center items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  onClick={closeMenu}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 bg-white transition-all"
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/inscription"
                  onClick={closeMenu}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 shadow-md shadow-indigo-100 transition-all"
                >
                  S'inscrire
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
