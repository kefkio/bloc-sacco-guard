import Navigation from "@/components/ui/navigation"
import LoanApplication from "@/components/LoanApplication"

const LoanApplicationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <LoanApplication />
      </div>
    </div>
  );
};

export default LoanApplicationPage;