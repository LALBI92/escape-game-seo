import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatGPT = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    navigate("/n");
  };

  return (
    <div className="min-h-screen bg-[#343541] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between text-white/80 p-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">ChatGPT 4o</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white/80">
              Partager
            </Button>
            <div className="w-8 h-8 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-6">
          {/* User Message */}
          <div className="bg-[#444654] p-6 rounded-lg">
            <div className="max-w-2xl mx-auto">
              <p className="text-white text-lg">
                Trouve moi un moyen de laisser un message à une personne qui enquêtera sur ma mort ?
              </p>
            </div>
          </div>

          {/* Assistant Message */}
          <div className="bg-[#444654] p-6 rounded-lg">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex-shrink-0" />
                <div className="space-y-4 text-white/90">
                  <p>
                    Laisser un message à une personne qui enquêtera sur ta mort peut être une démarche délicate et nécessitant une réflexion approfondie. Voici quelques moyens possibles, en fonction de tes intentions et du contexte :
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">1. Lettre ou document physique sécurisé</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Rédige une lettre manuscrite ou imprimée où tu exposes ce que tu veux transmettre.</li>
                      <li>Dépose-la dans un endroit sûr, comme un coffre-fort, ou confie-la à un avocat ou à une personne de confiance avec des instructions spécifiques.</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold">2. Boîte aux lettres numérique</h3>
                    <div className="mt-4">
                      <Button 
                        onClick={handleDownload}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Télécharger fichier.esv
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto">
          <div className="bg-[#444654] rounded-lg p-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Message ChatGPT"
                className="flex-1 bg-transparent border-none text-white/90 focus:outline-none p-2"
                disabled
              />
              <div className="flex gap-2">
                <button className="p-2 text-white/60 hover:text-white/80">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-white/60 text-sm mt-2">
            ChatGPT peut faire des erreurs. Envisagez de vérifier les informations importantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;