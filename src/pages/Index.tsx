import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import LeaderboardBanner from "../components/LeaderboardBanner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    try {
      // Vérifions d'abord si le pseudo existe déjà
      const { data: pseudoCheck } = await supabase
        .from('participants')
        .select('pseudo')
        .eq('pseudo', name)
        .single();

      if (pseudoCheck) {
        toast.error("Ce pseudo est déjà utilisé. Veuillez en choisir un autre.");
        return;
      }

      // Vérifions ensuite si l'email existe déjà
      const { data: emailCheck } = await supabase
        .from('participants')
        .select('email')
        .eq('email', email)
        .single();

      if (emailCheck) {
        toast.error("Cet email a déjà participé au jeu. Vous ne pouvez participer qu'une seule fois.");
        return;
      }

      // Si les vérifications sont passées, on peut créer le participant
      const { error: insertError } = await supabase
        .from('participants')
        .insert([
          { 
            pseudo: name,
            email: email,
            time_seconds: 0
          }
        ]);

      if (insertError) {
        console.error('Erreur lors de l\'insertion:', insertError);
        toast.error("Une erreur est survenue lors de l'inscription");
        return;
      }

      localStorage.setItem("player", JSON.stringify({ name, email }));
      toast.success("Que l'enquête commence !");
      navigate("/introduction");
    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast.error("Une erreur est survenue lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="w-full bg-white shadow-md px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="w-24">
            <img 
              src="/lovable-uploads/2973cd3d-cf10-4560-8b67-bb9be826ba3c.png" 
              alt="Better Call Bil Logo" 
              className="w-full h-auto"
            />
          </div>
          <p className="text-gray-700 text-sm md:text-base">
            Escape Game SEO est un concept réalisé avec ❤️ par BetterCallBil
          </p>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md space-y-8 fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Crime au Bootcamp SEO
            </h1>
            <p className="text-purple-200 text-lg">
              Enquêtez sur la disparition de Steve, responsable SEO chez Z-Discount
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
                  Pseudo
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

      <LeaderboardBanner />
    </div>
  );
};

export default Index;