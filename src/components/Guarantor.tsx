import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle, XCircle, Clock, User, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Guarantor = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for guarantor requests
  const pendingRequests = [
    {
      id: "GR001",
      applicantName: "John Kamau",
      memberCode: "M12345",
      loanAmount: 150000,
      purpose: "Business Expansion",
      riskLevel: "Low",
      applicationDate: "2024-01-15",
      requiredGuarantors: 3,
      currentGuarantors: 1
    },
    {
      id: "GR002",
      applicantName: "Mary Wanjiku",
      memberCode: "M67890",
      loanAmount: 80000,
      purpose: "Emergency Medical",
      riskLevel: "Medium",
      applicationDate: "2024-01-14",
      requiredGuarantors: 2,
      currentGuarantors: 0
    }
  ];

  const guarantorHistory = [
    {
      id: "GH001",
      applicantName: "Peter Mwangi",
      loanAmount: 100000,
      status: "Active",
      guaranteedDate: "2023-12-01",
      repaymentStatus: "On Time"
    },
    {
      id: "GH002",
      applicantName: "Grace Njeri",
      loanAmount: 50000,
      status: "Completed",
      guaranteedDate: "2023-10-15",
      repaymentStatus: "Fully Paid"
    }
  ];

  const handleApprove = (requestId: string, applicantName: string) => {
    toast({
      title: "Guarantee Approved",
      description: `You have successfully guaranteed ${applicantName}'s loan application.`,
    });
  };

  const handleReject = (requestId: string, applicantName: string) => {
    toast({
      title: "Guarantee Rejected",
      description: `You have declined to guarantee ${applicantName}'s loan application.`,
      variant: "destructive",
    });
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'defaulted': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guarantor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your guarantor responsibilities and help fellow members</p>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="history">Guarantor History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by member name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {request.applicantName}
                        <Badge variant="outline">{request.memberCode}</Badge>
                      </CardTitle>
                      <CardDescription>
                        Applied on {new Date(request.applicationDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getRiskBadgeVariant(request.riskLevel)}>
                      {request.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">KES {request.loanAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purpose</p>
                      <p className="font-semibold">{request.purpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Guarantors</p>
                      <p className="font-semibold">
                        {request.currentGuarantors}/{request.requiredGuarantors}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleApprove(request.id, request.applicantName)}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Guarantee
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReject(request.id, request.applicantName)}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {guarantorHistory.map((guarantee) => (
              <Card key={guarantee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {guarantee.applicantName}
                      </CardTitle>
                      <CardDescription>
                        Guaranteed on {new Date(guarantee.guaranteedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(guarantee.status)}>
                      {guarantee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">KES {guarantee.loanAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold">{guarantee.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Repayment</p>
                      <p className="font-semibold">{guarantee.repaymentStatus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Guarantor;