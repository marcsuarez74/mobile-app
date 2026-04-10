# Mobile App - React Native + Supabase

Application mobile React Native avec authentification Supabase, affichant "App works" après connexion.

## Stack Technique

- **Framework**: React Native (Expo SDK 52)
- **Navigation**: Expo Router v4
- **UI**: Tamagui + NativeWind (Tailwind CSS)
- **Backend**: Supabase Auth
- **Build**: Expo EAS

## Structure du Projet

```
my-app/
├── src/
│   ├── app/
│   │   ├── _layout.tsx              # Layout racine avec providers
│   │   ├── index.tsx                # Redirection selon auth state
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx          # Layout auth (publique)
│   │   │   ├── login.tsx            # Page connexion
│   │   │   └── register.tsx         # Page inscription
│   │   └── (app)/
│   │       ├── _layout.tsx          # Layout protégé
│   │       └── home.tsx             # Page "App works"
│   ├── lib/
│   │   ├── supabase.ts              # Client Supabase
│   │   └── auth-context.tsx         # Contexte auth
│   ├── types/
│   │   └── auth.ts                  # Types TypeScript
│   └── styles/
│       └── global.css               # Tailwind CSS
├── .env.example                     # Variables d'environnement
├── eas.json                         # Config EAS Build
└── tamagui.config.ts               # Config Tamagui
```

## Prérequis

1. Node.js 18+
2. Compte [Supabase](https://supabase.com)
3. Compte [Expo](https://expo.dev)

## Configuration

### 1. Configurer Supabase

1. Créer un projet sur [Supabase](https://supabase.com)
2. Activer l'authentification Email dans Auth > Providers
3. Récupérer l'URL et la clé Anon dans Project Settings > API

### 2. Variables d'environnement

Copier le fichier `.env.example` en `.env` et remplir les valeurs :

```bash
cd my-app
cp .env.example .env
```

Éditer `.env` :
```bash
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

## Démarrage

### Développement local

```bash
cd my-app
npm install
npx expo start
```

Scanne le QR code avec l'app Expo Go sur ton téléphone.

### Build APK avec EAS

1. Se connecter à Expo :
```bash
npx eas login
```

2. Créer le projet sur EAS :
```bash
npx eas project:create
```

3. Lancer le build APK :
```bash
npx eas build -p android --profile preview
```

4. Télécharger et installer l'APK

## Fonctionnalités

- ✅ Inscription email/password
- ✅ Connexion email/password
- ✅ Session persistante
- ✅ Redirection automatique (login → home)
- ✅ Déconnexion
- ✅ Page "App works" après connexion

## Personnalisation

- Modifier les couleurs dans `tailwind.config.js`
- Modifier le thème dans `tamagui.config.ts`
- Personnaliser les pages dans `src/app/`

## Évolutions possibles

- [ ] Mode offline avec cache
- [ ] Push notifications
- [ ] Biométrie (Face ID / empreinte)
- [ ] Social login (Google, Apple)
- [ ] Thème sombre/clair
- [ ] Internationalisation

## License

MIT
