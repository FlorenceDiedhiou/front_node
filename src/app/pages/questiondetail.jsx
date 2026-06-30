import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'

const BASE_URL = 'http://localhost:3000/api'

function getInitials(auteur) {
  if (!auteur) return '?'
  return `${auteur.prenom?.[0] || ''}${auteur.nom?.[0] || ''}`.toUpperCase() || '?'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const QuestionDetail = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const [reponses, setReponses] = useState([])
  const [loadingPage, setLoadingPage] = useState(true)
  const [pageError, setPageError] = useState('')

  // Formulaire réponse
  const [contenu, setContenu] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Charger la question et ses réponses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [qRes, rRes] = await Promise.all([
          fetch(`${BASE_URL}/questions/${id}`),
          fetch(`${BASE_URL}/reponses/question/${id}`),
        ])
        const qData = await qRes.json()
        const rData = await rRes.json()
        if (!qRes.ok) throw new Error(qData.message || 'Question introuvable.')
        setQuestion(qData.question)
        setReponses(rData.reponses || [])
      } catch (err) {
        setPageError(err.message || 'Impossible de charger la question.')
      } finally {
        setLoadingPage(false)
      }
    }
    fetchData()
  }, [id])

  const handleSubmitReponse = async (e) => {
    e.preventDefault()
    if (!contenu.trim()) {
      setStatus('error')
      setErrorMessage('La réponse ne peut pas être vide.')
      return
    }
    const token = localStorage.getItem('token')
    if (!token) {
      setStatus('error')
      setErrorMessage('Tu dois être connecté·e pour répondre.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch(`${BASE_URL}/reponses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contenu, question: id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'envoi.')
      setReponses((prev) => [...prev, data.reponse])
      setContenu('')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message || 'Impossible d\'envoyer la réponse.')
    }
  }

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center min-h-screen text-slate-400 text-sm">
        Chargement...
      </div>
    )
  }

  if (pageError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{pageError}</div>
        <Link to="/questions" className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Retour aux questions
        </Link>
      </div>
    )
  }

  const auteurNom = question?.auteur
    ? `${question.auteur.prenom || ''} ${question.auteur.nom || ''}`.trim()
    : 'Anonyme'

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Retour */}
        <Link to="/questions" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline">
          <ArrowLeft size={14} /> Retour aux questions
        </Link>

        {/* Question */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              {getInitials(question?.auteur)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{auteurNom}</p>
              <p className="text-xs text-slate-400">{formatDate(question?.createdAt)}</p>
            </div>
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-3">{question?.titre}</h1>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{question?.description}</p>
        </div>

        {/* Réponses */}
        <div>
          <h2 className="text-base font-semibold text-slate-700 mb-3">
            {reponses.length} réponse{reponses.length > 1 ? 's' : ''}
          </h2>
          <div className="space-y-4">
            {reponses.map((reponse) => (
              <div key={reponse._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-semibold shrink-0">
                    {getInitials(reponse.auteur)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {reponse.auteur ? `${reponse.auteur.prenom} ${reponse.auteur.nom}` : 'Anonyme'}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(reponse.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{reponse.contenu}</p>
              </div>
            ))}
            {reponses.length === 0 && (
              <div className="bg-white border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-400 text-sm">
                Aucune réponse pour l'instant. Sois le premier à répondre !
              </div>
            )}
          </div>
        </div>

        {/* Formulaire réponse */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-700 mb-4">Ta réponse</h2>
          <form onSubmit={handleSubmitReponse} className="space-y-4">
            <textarea
              value={contenu}
              onChange={(e) => setContenu(e.target.value)}
              rows={5}
              placeholder="Écris ta réponse ici..."
              disabled={status === 'loading'}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />

            {status === 'error' && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <span>Réponse publiée avec succès !</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Envoi...</>
              ) : (
                'Publier ma réponse'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default QuestionDetail