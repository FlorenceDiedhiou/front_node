const QuestionCard = ({ question }) => {
  const initials = question.auteur
    .split(' ')
    .map((n) => n[0])
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
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden">
      {/* Accent bar gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-indigo-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badge tag */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${tagColor}`}>
          Question #{question.id}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {question.heure}
        </span>
      </div>

      {/* Titre */}
      <h2 className="text-base font-semibold text-slate-800 leading-snug mb-2 group-hover:text-indigo-700 transition-colors duration-200 line-clamp-2">
        {question.titre}
      </h2>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
        {question.description}
      </p>

      {/* Footer card */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {/* Avatar initiales */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
            {initials}
          </div>
          <span className="text-sm text-slate-600 font-medium">{question.auteur}</span>
        </div>

        {/* Bouton lire */}
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:underline transition-colors">
          Voir plus
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default QuestionCard