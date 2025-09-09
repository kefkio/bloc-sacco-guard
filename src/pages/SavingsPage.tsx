import Navigation from "@/components/ui/navigation"
import Savings from "@/components/Savings"

const SavingsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Savings />
      </div>
    </div>
  );
};

export default SavingsPage;