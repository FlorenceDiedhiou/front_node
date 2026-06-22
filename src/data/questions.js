export const questions = [
  {
    id: 1,
    titre: 'Comment utiliser useEffect dans React pour récupérer des données ?',
    description:
      'Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.',
    contenu:
      "Je veux comprendre comment lancer un appel API au chargement d'un composant, gérer le chargement, les erreurs, puis afficher les données sans créer de boucle infinie.",
    heure: '08:10',
    auteur: 'Florence Diedhiou',
    reponses: 10,
    vues: 239,
    resolue: true,
    tags: ['React', 'API', 'Hooks'],
  },
  {
    id: 2,
    titre: 'Pourquoi mon serveur Express retourne une erreur 404 ?',
    description:
      "J'ai créé une route GET /users mais lorsque je fais une requête depuis Postman, je reçois une erreur 404.",
    contenu:
      "Ma route semble bien déclarée, mais Postman ne la trouve pas. Je voudrais vérifier l'ordre des middlewares, le préfixe de route et la méthode HTTP utilisée.",
    heure: '10:30',
    auteur: 'Ackime DIEDHIOU',
    reponses: 9,
    vues: 86,
    resolue: false,
    tags: ['Node.js', 'Express', 'API'],
  },
  {
    id: 3,
    titre: 'Comment connecter Spring Boot à une base de données MySQL ?',
    description: 'Mon application Spring Boot ne parvient pas à se connecter à MySQL.',
    contenu:
      "Je veux configurer application.properties correctement, vérifier le driver MySQL et comprendre les erreurs de connexion les plus fréquentes.",
    heure: '11:45',
    auteur: 'Marwin diatta',
    reponses: 4,
    vues: 97,
    resolue: false,
    tags: ['Spring Boot', 'MySQL', 'Java'],
  },
  {
    id: 4,
    titre: 'Quelle est la différence entre let, const et var en JavaScript ?',
    description: 'Je vois souvent ces trois mots-clés dans les exemples JavaScript.',
    contenu:
      'Je voudrais comprendre les différences de portée, de réassignation et les bonnes pratiques modernes pour déclarer mes variables.',
    heure: '14:20',
    auteur: 'Merveille Nombo',
    reponses: 12,
    vues: 211,
    resolue: true,
    tags: ['JavaScript', 'Variables', 'Débutant'],
  },
  {
    id: 5,
    titre: 'Comment créer une authentification JWT avec Node.js ?',
    description:
      'Je développe une API avec Express et je souhaite sécuriser mes routes avec JWT.',
    contenu:
      'Je cherche un exemple clair pour générer un token à la connexion, le stocker côté client et protéger les routes privées avec un middleware.',
    heure: '16:05',
    auteur: 'Simone Mulandu',
    reponses: 7,
    vues: 243,
    resolue: false,
    tags: ['JWT', 'Node.js', 'Sécurité'],
  },
]
