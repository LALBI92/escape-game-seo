import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const Success = () => {
  const participants = [
    { name: "John", role: "Organisateur", company: "Digital Academy" },
    { name: "Steve", role: "Responsable SEO e-commerce", company: "E-Shop Masters" },
    { name: "Larry Page", role: "SEO Consultant", company: "Tech Solutions" },
    { name: "Emma Wilson", role: "SEO Manager", company: "Digital Growth" },
    { name: "Thomas Martin", role: "SEO Content Strategist", company: "Content First" },
    { name: "Sarah Chen", role: "Technical SEO Specialist", company: "SEO Tech Labs" },
    { name: "Michael Brown", role: "SEO Analytics Expert", company: "Data Insights" },
    { name: "Sophie Dubois", role: "SEO Project Manager", company: "Web Performance" },
    { name: "David Kim", role: "International SEO Specialist", company: "Global SEO" },
    { name: "Maria Garcia", role: "E-commerce SEO Manager", company: "Shop Optimize" },
    { name: "James Wilson", role: "Local SEO Expert", company: "Local Digital" },
    { name: "Anna Schmidt", role: "SEO Content Manager", company: "Content Kings" },
    { name: "Pierre Durand", role: "SEO Technical Lead", company: "Tech SEO Pro" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="p-6 animate-fade-up">
          <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
            Participants au Bootcamp SEO
          </h1>
          
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
        </Card>
      </div>
    </div>
  );
};

export default Success;