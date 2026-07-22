import { openUrl } from "@tauri-apps/plugin-opener";
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="flex flex-col gap-3 my-5 select-none">
      <p><strong>Licence :</strong> MIT</p>
      <p><strong>Auteur :</strong> Matthéo BIGORGNE</p>
      <p><strong>Version :</strong> 0.1.0-dev</p>
      <p><strong>IA :</strong> Gemini</p>
      <p><strong>Information IA :</strong> Il est recommandé d'utiliser une clé API sans moyen de paiement associé pour éviter tout coût imprévu.</p>
      <p><strong>Technologies :</strong> TypeScript, React, Tauri, Rust</p>
      <p><strong>Éditeur :</strong> BlockNote</p>
      <button onClick={() => openUrl('https://github.com/Mattheo55/jotion-tauri')} className="cursor-pointer"><FaGithub size={30}/></button>
    </div>
  );
}
