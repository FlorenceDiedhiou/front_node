import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from './QuestionCard'

const API_URL = import.meta.env.VITE_API_URL

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('recentes')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`${API_URL}/api/questions`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Erreur lors du chargement.')
        setQuestions(data.questions || [])
      } catch (err) {
        setError(err.message || 'Impossible de charger les questions.')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  const sortedQuestions = useMemo(() => {
    const list = [...questions]
    if (sortBy === 'sans-reponse') return list.filter((q) => (q.reponses ?? 0) === 0)
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [sortBy, questions])

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">Questions récentes</h1>
          <p className="text-slate-500 text-sm">{questions.length} questions posées par la communauté</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              <option value="recentes">Les plus récentes</option>
              <option value="sans-reponse">Sans réponse</option>
            </select>
          </div>
          <Link
            to="/ajouter_question"
            className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition"
          >
            + Poser une question
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Questions', value: questions.length, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
          { label: 'Sans réponse', value: questions.filter((q) => (q.reponses ?? 0) === 0).length, color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Avec réponse', value: questions.filter((q) => (q.reponses ?? 0) > 0).length, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${color}`}>
            <span className="w-2.5 h-2.5 rounded-full bg-current opacity-70" />
            <div>
              <p className="font-bold text-base leading-none">{value}</p>
              <p className="text-xs opacity-70 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contenu */}
      {loading && (
        <div className="flex justify-center py-16 text-slate-400 text-sm">Chargement des questions...</div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">{error}</div>
      )}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedQuestions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
          {sortedQuestions.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
              Aucune question pour l'instant.
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Questions