import { Link } from 'react-router-dom'

const QuestionCard = ({ question }) => {
  const initials = question.auteur
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const tagColors = [
    'bg-indigo-50 text-indigo-600 border-indigo-200',
    'bg-violet-50 text-violet-600 border-violet-200',
    'bg-emerald-50 text-emerald-600 border-emerald-200',
    'bg-sky-50 text-sky-600 border-sky-200',
  ]
  const tagColor = tagColors[question.id % tagColors.length]

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-indigo-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${tagColor}`}>
          Question #{question.id}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {question.heure}
        </span>
      </div>

      <h2 className="text-base font-semibold text-slate-800 leading-snug mb-2 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-2">
        {question.titre}
      </h2>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
        {question.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {question.tags.map((tag) => (
          <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <span className="block text-sm text-slate-600 font-medium truncate">{question.auteur}</span>
            <span className="text-xs text-slate-400">
              {question.reponses} réponse{question.reponses > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <Link
          to={`/detail/${question.id}`}
          className="shrink-0 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:underline transition-colors"
          aria-label={`Voir le détail de la question ${question.id}`}
        >
          Voir plus
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default QuestionCard
