import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LeaderboardBanner from "../components/LeaderboardBanner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    localStorage.setItem("player", JSON.stringify({ name, email }));
    toast.success("Que le jeu commence !");
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <LeaderboardBanner />
      
      <div className="flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md space-y-8 fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Escape Game SEO
            </h1>
            <p className="text-purple-200 text-lg">
              Testez vos compétences en SEO technique
            </p>
            
            <div className="bg-red-500/20 border border-red-300/20 rounded-lg p-4 mt-6 backdrop-blur-sm">
              <p className="text-white text-sm">
                ⚠️ L'escape Game SEO est à faire sur ordinateur et attention vous n'aurez qu'une seule tentative alors soyez concentré.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-purple-100">
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-purple-900/50 border border-purple-300/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-purple-900/50 border border-purple-300/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="jean@exemple.fr"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:from-purple-600 hover:to-indigo-600 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Commencer le jeu
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-purple-200">
            Prêt à relever le défi SEO ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;