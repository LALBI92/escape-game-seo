import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ChatGPT = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    navigate("/n");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 bg-[#343541] text-white">
          <div className="space-y-6">
            {/* User Message */}
            <div className="bg-[#444654] p-4 rounded-lg">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-2">Steve</p>
                  <p>Trouve moi un moyen de laisser un message à une personne qui enquêtera sur ma mort ?</p>
                </div>
              </div>
            </div>

            {/* Assistant Message */}
            <div className="bg-[#444654] p-4 rounded-lg">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0" />
                <div className="space-y-4">
                  <p className="font-medium">Assistant</p>
                  <p>Tu peux laisser un fichier caché sur ton ordinateur, une personne qui enquêtera regardera surement dans ton ordinateur. Par sécurité tu peux ajouter une énigme pour accéder au message.</p>
                  <p>Je vais te fournir un fichier fichier.esv et tu n'auras plus qu'à ajouter ton message. Pour créer l'énigme je vais m'inspirer de ton métier.</p>
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
        </Card>
      </div>
    </div>
  );
};

export default ChatGPT;