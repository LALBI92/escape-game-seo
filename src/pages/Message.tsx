import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const navigate = useNavigate();

  const handleGameStart = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* LinkedIn Post Card */}
        <Card className="p-6 bg-white shadow-md">
          {/* Author Section */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div>
              <h3 className="font-semibold">Steve Palomba</h3>
              <p className="text-sm text-gray-500">SEO Manager • 1j</p>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-4">
            <p className="text-gray-800">
              🎉 Grand Jeu Concours SEO ! 🎉
              Gagnez votre place pour le prochain bootcamp SEO...
            </p>
            
            {/* Placeholder for post image */}
            <div className="aspect-video bg-gray-100 rounded-lg" />

            {/* Post Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 pt-4 border-t">
              <span>❤️ 142</span>
              <span>💭 38 commentaires</span>
              <span>🔄 15 partages</span>
            </div>
          </div>
        </Card>

        {/* Comments Section */}
        <Card className="p-6 bg-white shadow-md">
          <div className="space-y-6">
            {/* Comment 1 */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Marie Dubois</h4>
                  <p className="text-sm text-gray-600">Super intéressant ! Je participe 🙌</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 12h
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="flex-1">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold">Thomas Martin</h4>
                  <p className="text-sm text-gray-600">Je viens de résoudre l'énigme, c'est vraiment bien pensé !</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  J'aime • Répondre • 8h
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Game Link Button */}
        <div className="text-center">
          <Button 
            onClick={handleGameStart}
            className="bg-[#0A66C2] hover:bg-[#004182] text-white"
          >
            Participer au concours
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Message;