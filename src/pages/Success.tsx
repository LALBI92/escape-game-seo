import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const Success = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Information importante</DialogTitle>
            <DialogDescription className="text-base pt-2">
              Sur le drive du Bootcamp nous avons également trouvé la liste des participants
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-8">
          Félicitations !
        </h1>
        <p className="text-xl mb-8">
          Vous avez réussi à déchiffrer le message secret.
        </p>
        <Button
          onClick={() => navigate("/liste")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-semibold text-lg"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default Success;