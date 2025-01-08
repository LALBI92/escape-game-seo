import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const ChatGPT = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("gameTime");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    const startTime = sessionStorage.getItem("startTime");
    if (!startTime) {
      navigate("/");
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parseInt(startTime)) / 1000);
      setTime(elapsedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleDownload = () => {
    navigate("/dragdropgame");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#343541] p-4 pb-32">
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Information</AlertDialogTitle>
            <AlertDialogDescription>
              Sur l'ordinateur de Steve nous avons également trouvé sa session ChatGpt avec ce message énigmatique
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
            <div className="text-xl font-mono">{formatTime(time)}</div>
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
                Trouve un moyen de restreindre l'accès à mon fichier dans lequel j'écris mon quotidien ?
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
                    Pour sécuriser un fichier journal personnel, voici quelques options efficaces :
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">1. Chiffrement de fichier</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Utilisez un logiciel de chiffrement pour protéger le fichier avec un mot de passe fort</li>
                      <li>Seules les personnes ayant le mot de passe pourront accéder au contenu</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold">2. Format spécial</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Convertissez votre journal en format crypté</li>
                      <li>Utilisez une extension de fichier personnalisée</li>
                    </ul>

                    <h3 className="text-xl font-semibold">3. Énigme de protection</h3>
                    <p>J'ai créé un système de protection basé sur une énigme en rapport avec votre métier.</p>

                    <h3 className="text-xl font-semibold">4. Solution recommandée</h3>
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

        {/* Input Area - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#343541] p-4">
          <div className="max-w-4xl mx-auto">
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
    </div>
  );
};

export default ChatGPT;