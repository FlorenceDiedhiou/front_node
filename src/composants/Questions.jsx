import { useMemo, useState } from 'react'
import QuestionCard from './QuestionCard'
import { questions } from '../data/questions'

const Questions = () => {
  const [sortBy, setSortBy] = useState('recentes')

  const sortedQuestions = useMemo(() => {
    const list = [...questions]

    if (sortBy === 'populaires') {
      return list.sort((a, b) => b.vues + b.reponses - (a.vues + a.reponses))
    }

    if (sortBy === 'sans-reponse') {
      return list.filter((question) => question.reponses === 0)
    }

    return list.sort((a, b) => b.id - a.id)
  }, [sortBy])

  const totalReponses = questions.reduce((total, question) => total + question.reponses, 0)
  const totalResolues = questions.filter((question) => question.resolue).length

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
            Questions récentes
          </h1>
          <p className="text-slate-500 text-sm">
            {questions.length} questions posées par la communauté
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Trier par :</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer transition-all"
          >
            <option value="recentes">Les plus récentes</option>
            <option value="populaires">Les plus populaires</option>
            <option value="sans-reponse">Sans réponse</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Questions', value: questions.length, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
          { label: 'Réponses', value: totalReponses, color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Membres', value: '56', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Résolues', value: totalResolues, color: 'bg-sky-50 border-sky-200 text-sky-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${color} bg-opacity-60`}>
            <span className="w-2.5 h-2.5 rounded-full bg-current opacity-70" />
            <div>
              <p className="font-bold text-base leading-none">{value}</p>
              <p className="text-xs opacity-70 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {sortedQuestions.length === 0 && (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-500">
          Aucune question ne correspond à ce filtre.
        </div>
      )}
    </section>
  )
}

export default Questions
