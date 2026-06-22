import { Link, useParams } from 'react-router-dom'
import { questions } from '../../data/questions'

const Detail = () => {
  const { id } = useParams()
  const question = questions.find((item) => item.id === Number(id))

  if (!question) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Question introuvable</h1>
          <p className="text-slate-500 mb-6">
            Cette question n'existe pas ou a été supprimée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux questions
      </Link>

      <article className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {question.tags.map((tag) => (
              <span key={tag} className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {question.resolue && (
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                Résolue
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
            {question.titre}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>Posée par {question.auteur}</span>
            <span>{question.heure}</span>
            <span>{question.vues} vues</span>
            <span>{question.reponses} réponse{question.reponses > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-slate-600 leading-relaxed mb-5">{question.description}</p>
          <p className="text-slate-700 leading-relaxed">{question.contenu}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/connexion"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Répondre à cette question
            </Link>
            <Link
              to="/ajouter_question"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

export default Detail
