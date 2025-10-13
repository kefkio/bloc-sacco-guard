"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import WalletConnectButton from "@/components/WalletConnectButton"
import ApiStatus from "@/components/ApiStatus"
import { Menu, X, Shield, Coins, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: TrendingUp },
    { href: "/savings", label: "Savings", icon: Coins },
    { href: "/loans", label: "Loans", icon: Shield },
    { href: "/guarantor", label: "Guarantor", icon: Users },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SACCO Chain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Wallet */}
          <div className="hidden md:flex items-center space-x-4">
            <ApiStatus />
            <WalletConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center space-x-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <ApiStatus />
                <WalletConnectButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation