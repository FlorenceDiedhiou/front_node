import React from 'react'
import QuestionCard from './QuestionCard'

const Questions = () => {
  const questions = [
    {
      id: 1,
      titre: "Comment utiliser useEffect dans React pour récupérer des données ?",
      description: "Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.",
      heure: "09:15",
      auteur: "Aminata Ndiaye",
    },
    {
      id: 2,
      titre: "Pourquoi mon serveur Express retourne une erreur 404 ?",
      description: "J'ai créé une route GET /users mais lorsque je fais une requête depuis Postman, je reçois une erreur 404.",
      heure: "10:30",
      auteur: "Mamadou Diallo",
    },
    {
      id: 3,
      titre: "Comment connecter Spring Boot à une base de données MySQL ?",
      description: "Mon application Spring Boot ne parvient pas à se connecter à MySQL.",
      heure: "11:45",
      auteur: "Fatou Sow",
    },
    {
      id: 4,
      titre: "Quelle est la différence entre let, const et var en JavaScript ?",
      description: "Je vois souvent ces trois mots-clés dans les exemples JavaScript.",
      heure: "14:20",
      auteur: "Cheikh Ba",
    },
    {
      id: 5,
      titre: "Comment créer une authentification JWT avec Node.js ?",
      description: "Je développe une API avec Express et je souhaite sécuriser mes routes avec JWT.",
      heure: "16:05",
      auteur: "Khadija Fall",
    },
  ]

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">

      {/* ── En-tête section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
            Questions récentes
          </h1>
          <p className="text-slate-500 text-sm">
            {questions.length} questions posées par la communauté
          </p>
        </div>

        {/* Filtre / tri */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Trier par :</span>
          <select className="text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 cursor-pointer transition-all">
            <option>Les plus récentes</option>
            <option>Les plus populaires</option>
            <option>Sans réponse</option>
          </select>
        </div>
      </div>

      {/* ── Statistiques rapides ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Questions', value: '128', icon: '❓', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
          { label: 'Réponses', value: '412', icon: '💬', color: 'bg-violet-50 border-violet-200 text-violet-700' },
          { label: 'Membres', value: '56', icon: '👥', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Résolues', value: '89%', icon: '✅', color: 'bg-sky-50 border-sky-200 text-sky-700' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${color} bg-opacity-60`}>
            <span className="text-xl">{icon}</span>
            <div>
              <p className="font-bold text-base leading-none">{value}</p>
              <p className="text-xs opacity-70 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Liste des questions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  )
}

export default Questions