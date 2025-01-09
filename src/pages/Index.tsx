import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import LeaderboardBanner from "../components/LeaderboardBanner";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        duration: 5000,
      });
      return;
    }

    try {
      // Vérifions d'abord si l'email existe déjà
      const { data: existingEmails, error: emailError } = await supabase
        .from('participants')
        .select('email')
        .eq('email', email.toLowerCase().trim());

      if (emailError) {
        console.error('Erreur lors de la vérification de l\'email:', emailError);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification de l'email",
          duration: 5000,
        });
        return;
      }

      if (existingEmails && existingEmails.length > 0) {
        toast({
          variant: "destructive",
          title: "Email déjà utilisé",
          description: "Cet email a déjà participé au jeu. Vous ne pouvez participer qu'une seule fois.",
          duration: 5000,
        });
        return;
      }

      // Vérifions ensuite si le pseudo existe déjà
      const { data: existingPseudos, error: pseudoError } = await supabase
        .from('participants')
        .select('pseudo')
        .eq('pseudo', name.trim());

      if (pseudoError) {
        console.error('Erreur lors de la vérification du pseudo:', pseudoError);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification du pseudo",
          duration: 5000,
        });
        return;
      }

      if (existingPseudos && existingPseudos.length > 0) {
        toast({
          variant: "destructive",
          title: "Pseudo déjà utilisé",
          description: "Ce pseudo est déjà utilisé. Veuillez en choisir un autre.",
          duration: 5000,
        });
        return;
      }

      // Si les vérifications sont passées, on peut créer le participant
      const { error: insertError } = await supabase
        .from('participants')
        .insert([
          { 
            pseudo: name.trim(),
            email: email.toLowerCase().trim(),
            time_seconds: 0
          }
        ]);

      if (insertError) {
        console.error('Erreur lors de l\'insertion:', insertError);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de l'inscription",
          duration: 5000,
        });
        return;
      }

      localStorage.setItem("player", JSON.stringify({ name: name.trim(), email: email.toLowerCase().trim() }));
      toast({
        title: "Succès",
        description: "Que l'enquête commence !",
        duration: 5000,
      });
      navigate("/introduction");
    } catch (error) {
      console.error('Erreur détaillée:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        duration: 5000,
      });
    }
  };

  // ... keep existing code (JSX for the form and layout)

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
      <Toaster />
    </div>
  );
};

export default Index;
