import { openUrl } from "@tauri-apps/plugin-opener";
import { FaGithub } from "react-icons/fa";
import Divider from "../Divider";
import SettingsPageLayout from "./SettingsPageLayout";

export default function About() {
  return (
    <SettingsPageLayout
      title="À propos"
      description="Informations sur votre installation de Jotion."
    >
      <Divider/>
      
      <div className="py-5 flex flex-row gap-5 items-center">
        <img src="logo.png" className="h-15 select-none"/>
        <div>
          <p className="font-bold">Jotion</p>
          <p className="text-sm text-gray-500">Version 0.4.0-dev · Ordinateur</p>
        </div>
      </div>

      <Divider/>

      <div className="flex flex-col gap-3 my-5 select-none">
        <p><strong>Licence :</strong> MIT</p>
        <p><strong>Auteur :</strong> Matthéo BIGORGNE</p>
        <p><strong>IA :</strong> Gemini</p>
        <p><strong>Information IA :</strong> Il est recommandé d'utiliser une clé API sans moyen de paiement associé pour éviter tout coût imprévu.</p>
        <p><strong>Technologies :</strong> TypeScript, React, Tauri, Rust</p>
        <p><strong>Éditeur :</strong> BlockNote</p>
        <button onClick={() => openUrl('https://github.com/Mattheo55/jotion-tauri')} className="cursor-pointer"><FaGithub size={30}/></button>
      </div>
    </SettingsPageLayout>
  );
}
