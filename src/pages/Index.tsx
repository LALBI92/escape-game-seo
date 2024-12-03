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
      toast.error("Please fill in all fields");
      return;
    }
    // Store player info in localStorage for now
    localStorage.setItem("player", JSON.stringify({ name, email }));
    toast.success("Let the game begin!");
    navigate("/game");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">SEO Escape Room</h1>
          <p className="text-gray-500">Test your technical SEO skills</p>
        </div>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                placeholder="John Doe"
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
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              className="neo-button w-full text-gray-900 font-medium"
            >
              Start Game
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          Ready to test your SEO knowledge?
        </p>
      </div>
    </div>
  );
};

export default Index;