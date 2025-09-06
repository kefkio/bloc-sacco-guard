import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Calculator, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Shield,
  Clock,
  Search
} from "lucide-react"

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [loanAmount, setLoanAmount] = useState("")
  const [selectedGuarantors, setSelectedGuarantors] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof availableGuarantors>([])

  const steps = [
    { id: 1, title: "Loan Details", icon: FileText },
    { id: 2, title: "Guarantors", icon: Users },
    { id: 3, title: "Review & Submit", icon: CheckCircle }
  ]

  const memberInfo = {
    name: "Sarah Njeri",
    memberCode: "SC001789",
    totalSavings: 45000,
    loanEligibility: 90000,
    creditScore: "Good",
    activeLoans: 0
  }

  const availableGuarantors = [
    {
      id: "1",
      name: "Mary Wanjiku",
      code: "SC001234",
      savings: 65000,
      reputation: "Excellent",
      guaranteeCapacity: 130000
    },
    {
      id: "2", 
      name: "John Kamau",
      code: "SC001567",
      savings: 38000,
      reputation: "Good",
      guaranteeCapacity: 76000
    },
    {
      id: "3",
      name: "Grace Akinyi",
      code: "SC001890",
      savings: 52000,
      reputation: "Very Good",
      guaranteeCapacity: 104000
    }
  ]

  const loanPurposes = [
    "Business expansion",
    "Education fees",
    "Medical expenses", 
    "Home improvement",
    "Emergency needs",
    "Agricultural investment",
    "Other"
  ]

  const calculateRequiredGuarantors = (amount: number) => {
    return Math.ceil(amount / 30000) // Assuming each guarantor can guarantee up to 30k
  }

  const requiredGuarantors = loanAmount ? calculateRequiredGuarantors(parseInt(loanAmount)) : 0

  // Simulate guarantor search - in real app this would call backend API
  const searchGuarantors = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const filteredGuarantors = availableGuarantors.filter(guarantor => 
      guarantor.name.toLowerCase().includes(query.toLowerCase()) ||
      guarantor.code.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filteredGuarantors)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchGuarantors(query)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Apply for Loan</h1>
        <p className="text-muted-foreground">
          Submit your loan application through our secure blockchain platform
        </p>
      </div>

      {/* Member Info Card */}
      <Card className="bg-gradient-card border border-border mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Your SACCO Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Member</p>
              <p className="font-medium">{memberInfo.name}</p>
              <p className="text-xs text-muted-foreground">{memberInfo.memberCode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className="font-medium text-accent">KSh {memberInfo.totalSavings.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Loan Eligibility</p>
              <p className="font-medium text-primary">KSh {memberInfo.loanEligibility.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Score</p>
              <Badge variant="default">{memberInfo.creditScore}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-gradient-primary border-primary text-primary-foreground shadow-glow' 
                  : 'border-border text-muted-foreground'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-0.5 w-16 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-gradient-card border border-border">
        <CardContent className="p-8">
          {/* Step 1: Loan Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Loan Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount" className="flex items-center">
                    <Calculator className="h-4 w-4 mr-2" />
                    Loan Amount (KSh)
                  </Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    max={memberInfo.loanEligibility}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum eligible: KSh {memberInfo.loanEligibility.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanPurposes.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repaymentPeriod">Repayment Period</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (KSh)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    placeholder="Enter monthly income"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanJustification">Loan Justification</Label>
                <Textarea
                  id="loanJustification"
                  placeholder="Explain how you plan to use this loan and your repayment strategy..."
                  rows={4}
                />
              </div>

              {loanAmount && (
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Info className="h-4 w-4 text-primary mr-2" />
                    <span className="font-medium">Loan Requirements</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Required guarantors: {requiredGuarantors}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Processing fee: KSh {(parseInt(loanAmount) * 0.02).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Guarantors */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Select Guarantors</h2>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg mb-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-warning mr-2" />
                  <span className="font-medium text-warning">Required: {requiredGuarantors} guarantors</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  You need {requiredGuarantors} member{requiredGuarantors !== 1 ? 's' : ''} to guarantee your loan of KSh {parseInt(loanAmount || "0").toLocaleString()}
                </p>
              </div>

              {/* Search Input */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="guarantorSearch" className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Search Guarantors
                </Label>
                <Input
                  id="guarantorSearch"
                  type="text"
                  placeholder="Enter guarantor name or member code (e.g., Mary Wanjiku or SC001234)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <p className="text-xs text-muted-foreground">
                  Search by member name or member code to find potential guarantors
                </p>
              </div>

              {/* Search Results or Empty State */}
              <div className="space-y-4">
                {searchQuery && searchResults.length === 0 ? (
                  <Card className="border border-border">
                    <CardContent className="p-8 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No guarantors found matching "{searchQuery}"</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Try searching with a different name or member code
                      </p>
                    </CardContent>
                  </Card>
                ) : searchQuery ? (
                  searchResults.map((guarantor) => (
                    <Card key={guarantor.id} className="border border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{guarantor.name}</p>
                                <p className="text-sm text-muted-foreground">{guarantor.code}</p>
                              </div>
                              <Badge variant={guarantor.reputation === 'Excellent' ? 'default' : 'secondary'}>
                                {guarantor.reputation}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Savings:</span>
                                <span className="ml-2 text-accent">KSh {guarantor.savings.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Can Guarantee:</span>
                                <span className="ml-2">KSh {guarantor.guaranteeCapacity.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant={selectedGuarantors.includes(guarantor.id) ? "default" : "outline"}
                            className={selectedGuarantors.includes(guarantor.id) ? "bg-gradient-accent" : ""}
                            onClick={() => {
                              if (selectedGuarantors.includes(guarantor.id)) {
                                setSelectedGuarantors(prev => prev.filter(id => id !== guarantor.id))
                              } else {
                                setSelectedGuarantors(prev => [...prev, guarantor.id])
                              }
                            }}
                          >
                            {selectedGuarantors.includes(guarantor.id) ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border border-border">
                    <CardContent className="p-8 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Start typing to search for guarantors</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Enter a member name or code to find potential guarantors
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="font-medium mb-2">Selected Guarantors: {selectedGuarantors.length}/{requiredGuarantors}</p>
                <Progress value={(selectedGuarantors.length / requiredGuarantors) * 100} className="h-2" />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Review & Submit</h2>
              </div>

              <div className="space-y-6">
                <Card className="border border-border">
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Loan Amount:</span>
                        <span className="ml-2 font-medium">KSh {parseInt(loanAmount || "0").toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span className="ml-2">KSh {(parseInt(loanAmount || "0") * 0.02).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Selected Guarantors:</span>
                        <span className="ml-2">{selectedGuarantors.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-accent mr-2" />
                    <span className="font-medium text-accent">Smart Contract Automation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Once all guarantors approve, the smart contract will automatically process and disburse your loan to your blockchain wallet.
                  </p>
                </div>
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={
                  (currentStep === 1 && !loanAmount) ||
                  (currentStep === 2 && selectedGuarantors.length < requiredGuarantors)
                }
                className="bg-gradient-primary shadow-glow"
              >
                Next Step
              </Button>
            ) : (
              <Button className="bg-gradient-accent shadow-accent-glow">
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoanApplication