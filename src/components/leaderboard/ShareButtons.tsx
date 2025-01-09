import { Share2, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  shareText: string;
  shareUrl: string;
}

const ShareButtons = ({ shareText, shareUrl }: ShareButtonsProps) => {
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Button
        onClick={shareOnTwitter}
        variant="outline"
        className="hover-scale bg-white/10"
      >
        <Twitter className="mr-2" />
        Twitter
      </Button>
      <Button
        onClick={shareOnLinkedIn}
        variant="outline"
        className="hover-scale bg-white/10"
      >
        <Linkedin className="mr-2" />
        LinkedIn
      </Button>
      <Button
        onClick={shareOnWhatsApp}
        variant="outline"
        className="hover-scale bg-white/10"
      >
        <MessageCircle className="mr-2" />
        WhatsApp
      </Button>
    </div>
  );
};

export default ShareButtons;