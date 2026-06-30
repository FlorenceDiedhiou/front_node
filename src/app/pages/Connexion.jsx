import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { API_URL, fetchApi, readApiResponse } from '../../config/api'

const Connexion = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    setLoading(true)
    const toastId = toast.loading('Connexion en cours...')

    try {
      const response = await fetchApi('/api/auth/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await readApiResponse(response)

      if (response.ok) {
        if (result.token) localStorage.setItem('token', result.token)
        if (result.user) localStorage.setItem('user', JSON.stringify(result.user))

        const name = [result.user?.prenom, result.user?.nom].filter(Boolean).join(' ')
        toast.success(name ? `Bienvenue ${name}` : 'Connexion réussie', { id: toastId })
        navigate('/')
      } else {
        toast.error(result.message || 'Identifiants incorrects', { id: toastId })
      }
    } catch (error) {
      console.error(error)
      const message = error.name === 'AbortError'
        ? `Le serveur (${API_URL}) met trop de temps à répondre.`
        : `Impossible de contacter le serveur (${API_URL}). Vérifiez CORS et que le backend est lancé.`
      toast.error(message, { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50/30 flex items-center justify-center px-4 py-12">
      <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-100 p-8 sm:p-10 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Bon retour !</h1>
            <p className="text-slate-500 text-sm mt-1">Connectez-vous à votre compte DevM</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1.5">Adresse email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="exemple@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-indigo-600 font-semibold hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Connexion
