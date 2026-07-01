import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

//  Si ta page de connexion stocke le token sous une autre clé que "token"
// (ex: "accessToken"), change uniquement cette ligne :
const TOKEN_KEY = 'token';

const QuestionForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre.trim() || !description.trim()) {
      setStatus('error');
      setErrorMessage('Le titre et la description sont obligatoires.');
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setStatus('error');
      setErrorMessage('Tu dois être connecté·e pour poser une question.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre, description, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue.');
      }
      
      setStatus('success');
      setTitre('');
      setDescription('');
      setTags('');
      navigate('/');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Impossible de publier la question. Réessaie.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Poser une question</h1>
        <p className="mb-6 text-sm text-gray-500">
          Sois précis·e dans le titre, et détaille ton problème dans la description.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <label htmlFor="titre" className="mb-1 block text-sm font-semibold text-gray-700">
              Titre
            </label>
            <input
              id="titre"
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex : Comment éviter les re-renders inutiles avec useMemo ?"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Décris ton contexte, ce que tu as essayé, et le comportement attendu..."
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="tags" className="mb-1 block text-sm font-semibold text-gray-700">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex : react, javascript, useMemo"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <span>Ta question a été publiée avec succès !</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Publication...
              </>
            ) : (
              'Publier la question'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;