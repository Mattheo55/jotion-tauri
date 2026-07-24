# Jotion

Jotion est une application de prise de notes moderne, performante et multiplateforme, construite avec **Tauri**, **React** et **SQLite**. Elle offre une expérience d'édition riche inspirée de Notion, tout en garantissant la confidentialité des données grâce à un stockage local.

![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## 🚀 Fonctionnalités

- **Édition de texte riche** : Basé sur BlockNote, incluant le support du Markdown et des blocs personnalisés.
- **Organisation par Carnets** : Structurez vos notes dans différents carnets de notes (Notebooks).
- **Blocs Spéciaux** :
    - Blocs d'alerte (Info, Warning, Error).
    - Liens dynamiques entre notes.
    - Blocs de code avec coloration syntaxique via Shiki (TypeScript, Rust, Python, etc.).
- **Vue Calendrier** : Intégration de calendriers externes via des URLs iCal (ex: Outlook/Office 365).
- **Gestion du cycle de vie** : Système d'archivage et corbeille pour vos notes.
- **Stockage Local** : Base de données SQLite gérée via Drizzle ORM pour une persistance robuste.
- **Interface Moderne** : Design sombre (Dark Mode) utilisant Tailwind CSS et les composants Shadcn UI.
- **Gestion des fichiers** : Importation et stockage local des images dans le répertoire de données de l'application.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (Version 20+ recommandée)
- **Rust** et **Cargo** (via [rustup](https://rustup.rs/))
- Les dépendances système nécessaires pour Tauri (voir la [documentation officielle de Tauri](https://tauri.app/v2/guides/getting-started/prerequisites/))

## 🛠️ Installation

1. **Cloner le dépôt** :
   ```bash
   git clone <url-du-depot>
   cd jotion-tauri
   ```

2. **Installer les dépendances Node.js** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet :
   ```env
   DB_PATH=db.db
   ```

4. **Préparer la base de données** :
   Générez les migrations SQL via Drizzle :
   ```bash
   npx drizzle-kit generate
   ```

## 💻 Utilisation

### Mode Développement
Pour lancer l'application avec rechargement à chaud (Hot Reload) :
```bash
npm run tauri dev
```

### Construction (Build)
Pour générer l'exécutable final pour votre système d'exploitation :
```bash
npm run tauri build
```

## 📂 Structure du projet

- `src/` : Code source de l'interface frontend (React + TypeScript).
    - `block/` : Définitions des blocs personnalisés pour l'éditeur.
    - `components/` : Composants UI (Shadcn, Calendrier, Éditeur).
    - `db/` : Schéma de la base de données et configuration Drizzle.
    - `hooks/` : Hooks React pour la gestion des notes et carnets.
    - `store/` : Gestion de l'état global avec Zustand.
- `src-tauri/` : Code source du backend (Rust).
    - `src/lib.rs` : Configuration des plugins Tauri et des migrations SQLite.
    - `tauri.conf.json` : Configuration de l'application et des permissions.
- `drizzle/` : Fichiers de migration SQL et snapshots de la base de données.

## ⚙️ Configuration

L'application utilise plusieurs plugins Tauri pour interagir avec le système :
- **SQL** : Pour la gestion de la base de données SQLite locale.
- **FS & Path** : Pour la lecture/écriture des fichiers et images dans `$APPDATA`.
- **HTTP** : Pour la récupération des flux de calendrier iCal.
- **Store** : Pour la persistance des paramètres utilisateur.

## 📜 Scripts disponibles

| Commande | Description |
| :--- | :--- |
| `npm run dev` | Lance le serveur de développement Vite. |
| `npm run build` | Compile le frontend et prépare le build. |
| `npm run tauri dev` | Lance l'application Tauri en mode debug. |
| `npx drizzle-kit generate` | Génère les migrations basées sur le schéma. |
| `npx drizzle-kit studio` | Ouvre l'interface de visualisation de la base de données. |

## 🤝 Contribution

1. Forkez le projet.
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`).
3. Commitez vos changements (`git commit -m 'Add some AmazingFeature'`).
4. Pushez la branche (`git push origin feature/AmazingFeature`).
5. Ouvrez une Pull Request.

## 📄 Licence

MIT