import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";

const SocialLinks = () => {
  return (
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
  );
};

export default SocialLinks;