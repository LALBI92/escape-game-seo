const Header = () => {
  return (
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
  );
};

export default Header;