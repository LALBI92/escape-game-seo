import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, StarIcon, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Bienvenue sur le site des Escape Game SEO</h1>
          <p className="text-lg text-gray-200">Testez vos compétences SEO à travers nos énigmes captivantes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Escape Game 1 - Actif */}
          <Card className="glass-card hover-scale">
            <CardHeader>
              <CardTitle className="text-xl">Crime au Bootcamp SEO</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 text-gray-400" />
                  <Star className="w-5 h-5 text-gray-400" />
                  <Star className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">Difficulté: 2/5</span>
              </div>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Crime au Bootcamp SEO" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-600">
                Résolvez le mystère qui entoure la disparition lors du bootcamp SEO...
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full neo-button text-black"
                onClick={() => navigate("/")}
              >
                Participer
              </Button>
            </CardFooter>
          </Card>

          {/* Escape Game 2 - À venir */}
          <Card className="glass-card opacity-70">
            <CardHeader>
              <CardTitle className="text-xl">Les aventuriers de la migration</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex gap-1">
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <Star className="w-5 h-5 text-gray-400" />
                  <Star className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-sm text-gray-600">Difficulté: 3/5</span>
              </div>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Les aventuriers de la migration" 
                className="w-full h-48 object-cover rounded-md mb-4 filter grayscale"
              />
              <p className="text-sm text-gray-600">
                Un nouveau défi SEO arrive bientôt...
              </p>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full">
                Bientôt disponible
              </Button>
            </CardFooter>
          </Card>

          {/* Escape Game 3 - À venir */}
          <Card className="glass-card opacity-70">
            <CardHeader>
              <CardTitle className="text-xl">Prochainement...</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src="/placeholder.svg" 
                alt="Prochain Escape Game" 
                className="w-full h-48 object-cover rounded-md mb-4 filter grayscale"
              />
              <p className="text-sm text-gray-600">
                Un nouveau défi SEO arrive bientôt...
              </p>
            </CardContent>
            <CardFooter>
              <Button disabled className="w-full">
                Bientôt disponible
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* CTA Block */}
        <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md text-center">
          <h2 className="text-2xl font-semibold text-white">Restez connecté ! 🎮</h2>
          <p className="text-purple-200">
            Pour connaître la date de sortie du prochain Escape Game SEO, suivez-moi sur les réseaux sociaux !
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => window.open("https://x.com/BilalDestouches", "_blank")}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Twitter className="mr-2" />
              Twitter
            </Button>
            <Button
              onClick={() => window.open("https://www.linkedin.com/in/sbdestouches/", "_blank")}
              variant="outline"
              className="hover-scale bg-white/10"
            >
              <Linkedin className="mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;