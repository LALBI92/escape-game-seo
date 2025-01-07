import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Liste = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startTime = searchParams.get("startTime");
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        const start = parseInt(startTime);
        const now = Date.now();
        const elapsed = Math.floor((now - start) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        setElapsedTime(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const participants = [
    { name: "John", role: "Organisateur", company: "Digital Academy" },
    { name: "Steve", role: "Responsable SEO e-commerce", company: "Z-discount" },
    { name: "Larry Smith", role: "SEO Consultant", company: "SEO - Santiano" },
    { name: "Emma Wilson", role: "SEO Manager", company: "SEO - Santiano" },
    { name: "Thomas Martin", role: "SEO Content Strategist", company: "SEO - Santiano" },
    { name: "Sarah Chen", role: "Technical SEO Specialist", company: "SEO - Santiano" },
    { name: "Michael Brown", role: "SEO Analytics Expert", company: "SEO - Santiano" },
    { name: "Sophie Dubois", role: "SEO Project Manager", company: "SEO - Santiano" },
    { name: "David Kim", role: "International SEO Specialist", company: "SEO - Santiano" },
    { name: "Maria Garcia", role: "E-commerce SEO Manager", company: "SEO - Santiano" },
    { name: "James Wilson", role: "Local SEO Expert", company: "SEO - Santiano" },
    { name: "Anna Schmidt", role: "SEO Content Manager", company: "SEO - Santiano" },
    { name: "Pierre Durand", role: "SEO Technical Lead", company: "SEO - Santiano" }
  ];

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Découverte ! 🔍
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">
              Sur le drive du Bootcamp nous avons également trouvé la liste des participants
            </p>
            <p className="text-sm text-muted-foreground">
              Temps écoulé : {elapsedTime}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 animate-fade-up">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-purple-800">
                Participants au Bootcamp SEO
              </h1>
              <div className="text-lg font-semibold text-purple-600">
                {elapsedTime}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Entreprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant, index) => (
                    <TableRow key={index} className="hover:bg-purple-50">
                      <TableCell className="font-medium">{participant.name}</TableCell>
                      <TableCell>{participant.role}</TableCell>
                      <TableCell>{participant.company}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => navigate('/report')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-semibold text-lg"
              >
                Continuer
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Liste;