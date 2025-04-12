
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="font-semibold text-primary-foreground">P</span>
            </div>
            <span className="font-semibold text-lg">ProjectPilot</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Solo Projects,{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
                Perfectly Organized
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Track, manage, and complete your side projects with a minimal dashboard
              built specifically for solo developers and indie hackers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/dashboard">Start Tracking for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/dashboard">View Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need, Nothing You Don't
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Project Dashboard",
                  description:
                    "Clean, visual overview of all your projects with status filtering.",
                },
                {
                  title: "Task Management",
                  description:
                    "Simple checklists with deadlines to keep you accountable.",
                },
                {
                  title: "Tech Stack Tracking",
                  description:
                    "Tag projects with technologies to build a portfolio of your skills.",
                },
                {
                  title: "Calendar Planning",
                  description:
                    "Visual monthly calendar to manage deadlines and milestones.",
                },
                {
                  title: "GitHub Integration",
                  description:
                    "Link directly to your repositories and deployment sites.",
                },
                {
                  title: "Mobile Friendly",
                  description:
                    "Track your projects from anywhere with a responsive interface.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-lg border border-border flex flex-col"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stop Abandoning Your Side Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              ProjectPilot helps you turn ideas into finished products with a
              simple tracking system built for developers.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <span className="font-semibold text-xs text-primary-foreground">
                P
              </span>
            </div>
            <span className="font-medium">ProjectPilot</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProjectPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
