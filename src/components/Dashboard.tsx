import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react"
import { useAccount } from "wagmi"
import { useMemberRegistry } from "@/hooks/useMemberRegistry"
import { useSavingsPool } from "@/hooks/useSavingsPool"
import { useLoanManager } from "@/hooks/useLoanManager"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import { toast } from "sonner"
import { getHealth, getNextId } from "@/lib/api"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const stats = [
    {
      title: "Total Savings",
      value: "KSh 45,000",
      change: "+12%",
      trend: "up",
      icon: Coins,
      description: "Monthly contributions on track"
    },
    {
      title: "Active Loans",
      value: "KSh 15,000",
      nextPayment: "Dec 15, 2024",
      icon: TrendingUp,
      description: "Next payment in 8 days"
    },
    {
      title: "Guarantor Requests",
      value: "3",
      pending: "2 pending",
      icon: Users,
      description: "Review guarantee requests"
    },
    {
      title: "Loan Eligibility",
      value: "KSh 90,000",
      multiplier: "2x savings",
      icon: Shield,
      description: "Based on current savings"
    }
  ]

  const recentTransactions = [
    {
      id: "1",
      type: "deposit",
      description: "Monthly Contribution",
      amount: "+KSh 5,000",
      date: "Dec 1, 2024",
      status: "confirmed",
      blockHash: "0x7a9b..."
    },
    {
      id: "2", 
      type: "loan",
      description: "Loan Disbursement",
      amount: "+KSh 15,000",
      date: "Nov 28, 2024",
      status: "confirmed",
      blockHash: "0x8c2d..."
    },
    {
      id: "3",
      type: "guarantee",
      description: "Guarantor Fee",
      amount: "-KSh 100",
      date: "Nov 25, 2024", 
      status: "confirmed",
      blockHash: "0x3f1e..."
    }
  ]

  const guarantorRequests = [
    {
      id: "1",
      memberName: "Mary Wanjiku",
      memberCode: "SC001234",
      loanAmount: "KSh 25,000",
      purpose: "Business expansion",
      riskLevel: "Low",
      status: "pending"
    },
    {
      id: "2",
      memberName: "John Kamau",
      memberCode: "SC001567",
      loanAmount: "KSh 18,000", 
      purpose: "Education fees",
      riskLevel: "Medium",
      status: "pending"
    }
  ]

  const { isConnected } = useAccount()
  const { isMember, kycPassed, register, writeStatus, isConfirming, isConfirmed } = useMemberRegistry()
  const { balance } = useSavingsPool()
  const { address } = useAccount()
  const [latestLoanId, setLatestLoanId] = useState<number | null>(null)
  const loanIdForHook = latestLoanId !== null ? BigInt(latestLoanId) : undefined
  const { loan } = useLoanManager(loanIdForHook)

  const [apiHealth, setApiHealth] = useState<string | null>(null)
  const [nextLoanId, setNextLoanId] = useState<number | null>(null)
  const [loadingApi, setLoadingApi] = useState(false)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoadingApi(true)
        const h = await getHealth()
        const id = await getNextId()
        if (!mounted) return
        setApiHealth(h.status ?? "unknown")
        setNextLoanId(id.nextId ?? null)
      } catch (e) {
        if (!mounted) return
        setApiHealth("offline")
      } finally {
        if (mounted) setLoadingApi(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  // derive latest loan id from nextLoanId
  useEffect(() => {
    if (nextLoanId && typeof nextLoanId === 'number') {
      const id = Number(nextLoanId) - 1
      setLatestLoanId(id >= 0 ? id : null)
    }
  }, [nextLoanId])

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">Here's your SACCO activity overview</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-sm text-muted-foreground">API:</div>
            <div className="text-sm font-medium">
              {loadingApi ? 'Checking...' : apiHealth ?? 'unknown'}
            </div>
            <div className="text-sm text-muted-foreground">Next Loan ID:</div>
            <div className="text-sm font-medium">{nextLoanId ?? '-'}</div>
          </div>
          {/* On-chain status widgets */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-sm">
              <div className="text-xs text-muted-foreground">Member</div>
              <div className="font-medium">{isMember ? 'Registered' : 'Not registered'}</div>
              <div className="text-xs text-muted-foreground">KYC: {kycPassed ? 'Passed' : 'Pending'}</div>
            </div>

            <div className="text-sm">
              <div className="text-xs text-muted-foreground">Savings Balance</div>
              <div className="font-medium">{balance ? `${ethers.formatEther(balance)} ETH` : '-'}</div>
              <div className="text-xs text-muted-foreground">Address: {address ?? '-'}</div>
            </div>

            <div className="text-sm">
              <div className="text-xs text-muted-foreground">Latest Loan</div>
              <div className="font-medium">{loan ? `Borrower: ${loan.borrower}` : (latestLoanId !== null ? 'No loan' : '-')}</div>
              <div className="text-xs text-muted-foreground">Loan ID: {latestLoanId ?? '-'}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isConnected && !isMember ? (
            <Button
              className="bg-gradient-primary shadow-glow"
              onClick={async () => {
                try {
                  await register()
                  toast.success('Registration submitted. Confirm in your wallet and wait for 1-2 blocks.')
                } catch (e: any) {
                  toast.error(e?.message ?? 'Registration failed')
                }
              }}
              disabled={writeStatus === 'pending' || isConfirming}
            >
              {writeStatus === 'pending' || isConfirming ? 'Registering...' : 'Register as Member'}
            </Button>
          ) : null}
          <Button variant="outline">
            Apply for Loan
          </Button>
        </div>
      </div>

      {isConnected ? (
        <div>
          <Badge variant={isMember ? 'default' : 'secondary'}>
            {isMember ? 'Member: Active' : 'Member: Not Registered'}
          </Badge>
        </div>
      ) : null}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border border-border hover:shadow-card transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.change && (
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-3 w-3 text-accent mr-1" />
                  <span className="text-xs text-accent">{stat.change}</span>
                </div>
              )}
              {stat.nextPayment && (
                <div className="flex items-center mt-2">
                  <Clock className="h-3 w-3 text-warning mr-1" />
                  <span className="text-xs text-warning">{stat.nextPayment}</span>
                </div>
              )}
              {stat.pending && (
                <div className="flex items-center mt-2">
                  <AlertCircle className="h-3 w-3 text-warning mr-1" />
                  <span className="text-xs text-warning">{stat.pending}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <Card className="bg-gradient-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Blockchain Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${
                      transaction.type === 'deposit' ? 'bg-accent' :
                      transaction.type === 'loan' ? 'bg-primary' : 'bg-warning'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Block: {transaction.blockHash} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium text-sm ${
                      transaction.amount.startsWith('+') ? 'text-accent' : 'text-warning'
                    }`}>
                      {transaction.amount}
                    </p>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-accent mr-1" />
                      <span className="text-xs text-accent">Confirmed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guarantor Requests */}
        <Card className="bg-gradient-card border border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Guarantor Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {guarantorRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-lg bg-secondary/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{request.memberName}</p>
                      <p className="text-sm text-muted-foreground">{request.memberCode}</p>
                    </div>
                    <Badge variant={request.riskLevel === 'Low' ? 'default' : 'secondary'}>
                      {request.riskLevel} Risk
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Amount:</span>
                      <span className="font-medium">{request.loanAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Purpose:</span>
                      <span>{request.purpose}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gradient-accent">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Progress */}
      <Card className="bg-gradient-card border border-border">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            2024 Savings Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>KSh 45,000 of KSh 60,000 target</span>
              <span className="text-accent">75% complete</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground">
              You're on track to meet your annual savings goal! Keep up the great work.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard