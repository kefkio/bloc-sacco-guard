import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle, XCircle, Clock, User, DollarSign, Eye, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Guarantor = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

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
      currentGuarantors: 1,
      monthlyIncome: 85000,
      employmentStatus: "Employed",
      creditScore: 720,
      existingGuarantees: 2,
      relationship: "Colleague",
      loanTerm: "24 months",
      interestRate: "12%",
      monthlyRepayment: 7500,
      collateral: "Business Equipment",
      businessType: "Retail Shop"
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
      currentGuarantors: 0,
      monthlyIncome: 55000,
      employmentStatus: "Self-Employed",
      creditScore: 680,
      existingGuarantees: 1,
      relationship: "Friend",
      loanTerm: "18 months",
      interestRate: "14%",
      monthlyRepayment: 5200,
      collateral: "None",
      businessType: "Freelancer"
    },
    {
      id: "GR003",
      applicantName: "David Maina",
      memberCode: "M34567",
      loanAmount: 200000,
      purpose: "Home Improvement",
      riskLevel: "High",
      applicationDate: "2024-01-13",
      requiredGuarantors: 4,
      currentGuarantors: 2,
      monthlyIncome: 120000,
      employmentStatus: "Employed",
      creditScore: 640,
      existingGuarantees: 3,
      relationship: "Family",
      loanTerm: "36 months",
      interestRate: "16%",
      monthlyRepayment: 7800,
      collateral: "Property Title",
      businessType: "N/A"
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
    if (!approvalComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please provide a comment for your approval decision.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Guarantee Approved",
      description: `You have successfully guaranteed ${applicantName}'s loan application.`,
    });
    setApprovalComment("");
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string, applicantName: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejecting this guarantee request.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Guarantee Rejected",
      description: `You have declined to guarantee ${applicantName}'s loan application.`,
      variant: "destructive",
    });
    setRejectionReason("");
    setSelectedRequest(null);
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
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
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by member name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {pendingRequests.length} pending requests
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Guarantor Requests</CardTitle>
              <CardDescription>
                Review and approve loan guarantee requests from SACCO members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Guarantors</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests
                    .filter(request => 
                      request.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      request.memberCode.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{request.applicantName}</p>
                            <p className="text-sm text-muted-foreground">{request.memberCode}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">KES {request.loanAmount.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>{request.purpose}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskBadgeVariant(request.riskLevel)}>
                          {request.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{request.currentGuarantors}</span>
                          <span className="text-muted-foreground">/ {request.requiredGuarantors}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(request.applicationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(request)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Loan Application Details</DialogTitle>
                                <DialogDescription>
                                  Review the complete application before making your guarantee decision
                                </DialogDescription>
                              </DialogHeader>
                              {selectedRequest && (
                                <div className="space-y-6">
                                  {/* Applicant Information */}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Applicant Name</Label>
                                      <p className="text-sm">{selectedRequest.applicantName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Member Code</Label>
                                      <p className="text-sm">{selectedRequest.memberCode}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Monthly Income</Label>
                                      <p className="text-sm">KES {selectedRequest.monthlyIncome?.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Employment Status</Label>
                                      <p className="text-sm">{selectedRequest.employmentStatus}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Credit Score</Label>
                                      <p className="text-sm">{selectedRequest.creditScore}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Existing Guarantees</Label>
                                      <p className="text-sm">{selectedRequest.existingGuarantees}</p>
                                    </div>
                                  </div>

                                  {/* Loan Details */}
                                  <div className="border-t pt-4">
                                    <h4 className="font-medium text-sm mb-3">Loan Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Loan Amount</Label>
                                        <p className="text-sm">KES {selectedRequest.loanAmount.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Purpose</Label>
                                        <p className="text-sm">{selectedRequest.purpose}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Loan Term</Label>
                                        <p className="text-sm">{selectedRequest.loanTerm}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Interest Rate</Label>
                                        <p className="text-sm">{selectedRequest.interestRate}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Monthly Repayment</Label>
                                        <p className="text-sm">KES {selectedRequest.monthlyRepayment?.toLocaleString()}</p>
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Collateral</Label>
                                        <p className="text-sm">{selectedRequest.collateral}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Approval Actions */}
                                  <div className="border-t pt-4 space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="approvalComment">Approval Comment</Label>
                                      <Textarea
                                        id="approvalComment"
                                        placeholder="Add a comment about your guarantee decision..."
                                        value={approvalComment}
                                        onChange={(e) => setApprovalComment(e.target.value)}
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <Label htmlFor="rejectionReason">Rejection Reason (if declining)</Label>
                                      <Select value={rejectionReason} onValueChange={setRejectionReason}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select reason for rejection" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="insufficient-income">Insufficient Income</SelectItem>
                                          <SelectItem value="high-risk">Too High Risk</SelectItem>
                                          <SelectItem value="existing-commitments">Too Many Existing Commitments</SelectItem>
                                          <SelectItem value="incomplete-documentation">Incomplete Documentation</SelectItem>
                                          <SelectItem value="personal-reasons">Personal Reasons</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                      <Button
                                        onClick={() => handleApprove(selectedRequest.id, selectedRequest.applicantName)}
                                        className="flex-1"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve Guarantee
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() => handleReject(selectedRequest.id, selectedRequest.applicantName)}
                                        className="flex-1"
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject Application
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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