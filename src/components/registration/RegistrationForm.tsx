import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

const RegistrationForm = () => {
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

  return (
    <div className="glass-card rounded-2xl p-8 space-y-6 bg-white/10 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-purple-100">
            Pseudo
          </label>
          <Input
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
          <Input
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
  );
};

export default RegistrationForm;