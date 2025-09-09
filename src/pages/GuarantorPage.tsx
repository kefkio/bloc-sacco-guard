import Navigation from "@/components/ui/navigation"
import Guarantor from "@/components/Guarantor"

const GuarantorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Guarantor />
      </div>
    </div>
  );
};

export default GuarantorPage;