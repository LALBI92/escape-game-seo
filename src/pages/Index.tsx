import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Escape Game SEO</h1>
          <p className="text-gray-500">Testez vos compétences en SEO technique</p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="Jean Dupont"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="jean@exemple.fr"
              />
            </div>

            <button
              type="submit"
              className="neo-button w-full text-gray-900 font-medium"
            >
              Commencer le jeu
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          Prêt à tester vos connaissances en SEO ?
        </p>
      </div>
    </div>
  );
};

export default Index;