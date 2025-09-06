import Navigation from "@/components/ui/navigation"
import Dashboard from "@/components/Dashboard"

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;