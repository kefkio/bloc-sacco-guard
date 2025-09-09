import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PiggyBank, TrendingUp, Calendar, ArrowUpCircle, ArrowDownCircle, Target, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Savings = () => {
  const { toast } = useToast();
  const [depositAmount, setDepositAmount] = useState("");
  const [savingsGoal, setSavingsGoal] = useState(500000);

  // Mock data
  const currentBalance = 245000;
  const monthlyTarget = 25000;
  const totalContributions = 12;
  const goalProgress = (currentBalance / savingsGoal) * 100;

  const savingsHistory = [
    {
      id: "T001",
      type: "deposit",
      amount: 25000,
      description: "Monthly Contribution - January 2024",
      date: "2024-01-15",
      balance: 245000,
      blockHash: "0x8f5c2e1a9b3d7f8e6c4a2d9b7f3e5c1a8d6b4e2f7c9a5d3b8e1f4c6a9d2b5e8"
    },
    {
      id: "T002",
      type: "deposit",
      amount: 30000,
      description: "Bonus Contribution",
      date: "2024-01-10",
      balance: 220000,
      blockHash: "0x7e4b3f8c2a9d5e6f1c8b4a7d2e9f3c6b5a8d1f4e7c2b9a6d3f8e5c1b4a7d2e9"
    },
    {
      id: "T003",
      type: "withdrawal",
      amount: 15000,
      description: "Emergency Withdrawal",
      date: "2024-01-05",
      balance: 190000,
      blockHash: "0x6d3c8f5e2b9a7d4f1e8c5b2a9f6d3e7c4b8a1f5d2c9e6b3f8a5d1e4c7b2a9f6"
    },
    {
      id: "T004",
      type: "deposit",
      amount: 25000,
      description: "Monthly Contribution - December 2023",
      date: "2023-12-15",
      balance: 205000,
      blockHash: "0x5c2f7e4b8a6d3f9c1e5b8a4d7f2c9e5b1a8f4d6c3e9b7a2f5d8c1e4b7a3f6d9"
    }
  ];

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Deposit Successful",
      description: `KES ${parseFloat(depositAmount).toLocaleString()} has been added to your savings.`,
    });
    setDepositAmount("");
  };

  const handleSetGoal = () => {
    toast({
      title: "Savings Goal Updated",
      description: `Your new savings goal is KES ${savingsGoal.toLocaleString()}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Savings Dashboard</h1>
          <p className="text-muted-foreground mt-2">Track your savings progress and manage your financial goals</p>
        </div>
      </div>

      {/* Savings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">KES {currentBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {monthlyTarget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month's goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContributions}</div>
            <p className="text-xs text-muted-foreground">Successful deposits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Of your savings goal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="deposit">Make Deposit</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Savings Goal Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Savings Goal Progress
                </CardTitle>
                <CardDescription>
                  Track your progress towards your financial target
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: KES {currentBalance.toLocaleString()}</span>
                    <span>Goal: KES {savingsGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={goalProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {goalProgress >= 100 ? "🎉 Goal achieved!" : `KES ${(savingsGoal - currentBalance).toLocaleString()} remaining to reach your goal`}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal">Update Savings Goal (KES)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="goal"
                      type="number"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(Number(e.target.value))}
                      placeholder="Enter new goal amount"
                    />
                    <Button onClick={handleSetGoal}>Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  This Month's Performance
                </CardTitle>
                <CardDescription>January 2024 savings summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Deposits Made</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Deposited</span>
                    <span className="font-semibold text-green-600">+KES 55,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Withdrawals</span>
                    <span className="font-semibold text-red-600">-KES 15,000</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="text-sm font-medium">Net Change</span>
                    <span className="font-semibold text-green-600">+KES 40,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="h-5 w-5" />
                Make a Deposit
              </CardTitle>
              <CardDescription>
                Add funds to your SACCO savings account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Deposit Amount (KES)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount to deposit"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[5000, 10000, 25000, 50000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setDepositAmount(amount.toString())}
                  >
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </div>

              <Button onClick={handleDeposit} className="w-full" size="lg">
                <ArrowUpCircle className="h-4 w-4 mr-2" />
                Deposit KES {depositAmount ? parseFloat(depositAmount).toLocaleString() : '0'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your complete savings transaction record on the blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsHistory.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'deposit' ? (
                          <ArrowUpCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownCircle className="h-4 w-4 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} • ID: {transaction.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}KES {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Balance: KES {transaction.balance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono bg-muted/30 p-2 rounded">
                      Block Hash: {transaction.blockHash}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Savings;