import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Coins, Users, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import heroImage from "@/assets/blockchain-hero.jpg"

const HeroSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable transaction records with end-to-end encryption"
    },
    {
      icon: Coins,
      title: "Digital Savings",
      description: "Real-time tracking of contributions and earnings"
    },
    {
      icon: Users,
      title: "Peer Guarantees",
      description: "Transparent guarantor approval workflows"
    },
    {
      icon: TrendingUp,
      title: "Smart Contracts",
      description: "Automatic loan approvals when conditions are met"
    }
  ]

  const benefits = [
    "Transparent and trustable peer-to-peer guarantees",
    "Fraud prevention through blockchain immutability",
    "Faster loan approvals with smart contracts",
    "Real-time auditing capabilities",
    "Mobile accessibility for all members"
  ]

  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={heroImage}
          alt="Blockchain Network"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 pb-16">
          {/* Main Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/50 border border-border backdrop-blur-sm mb-6">
              <Shield className="h-4 w-4 text-accent mr-2" />
              <span className="text-sm font-medium">Blockchain-Powered SACCO Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                SACCO Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join the future of cooperative finance with our blockchain-based SACCO platform.
              Secure, transparent, and automated loan management with peer-to-peer guarantees.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-primary shadow-glow hover:shadow-accent-glow transition-all duration-300">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-card/50">
                Learn More
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border border-border p-6 hover:shadow-card transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary mb-4 shadow-glow">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-card border border-border p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Why Choose SACCO Chain?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection