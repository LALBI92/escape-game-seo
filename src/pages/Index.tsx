import { Toaster } from "@/components/ui/toaster";
import LeaderboardBanner from "../components/LeaderboardBanner";
import Header from "@/components/registration/Header";
import RegistrationForm from "@/components/registration/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Header />
      <LeaderboardBanner />

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

          <RegistrationForm />

          <p className="text-center text-sm text-purple-200">
            Prêt à relever le défi SEO ?
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Index;