import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Unlimited image generation",
      "All AI tools access",
      "HD quality exports",
      "Priority processing",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "3-Month Plan",
    price: "$8.99",
    period: "/month",
    savings: "Save 10%",
    description: "Great value for regular users",
    features: [
      "Everything in Monthly",
      "Billed quarterly ($26.97)",
      "10% discount",
      "Priority support",
      "Early access to new features",
    ],
    popular: false,
  },
  {
    name: "9-Month Plan",
    price: "$7.99",
    period: "/month",
    savings: "Save 20%",
    description: "Best for committed creators",
    features: [
      "Everything in 3-Month",
      "Billed every 9 months ($71.91)",
      "20% discount",
      "Premium support",
      "Custom presets",
    ],
    popular: true,
  },
  {
    name: "Annual Plan",
    price: "$6.99",
    period: "/month",
    savings: "Save 30%",
    description: "Maximum value for professionals",
    features: [
      "Everything in 9-Month",
      "Billed annually ($83.88)",
      "30% discount",
      "VIP support",
      "API access",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options to match your creative needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-6 bg-card border-border hover:border-primary/50 transition-all duration-500 ${
                plan.popular ? "border-primary glow-primary lg:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="text-accent font-semibold text-sm">{plan.savings}</div>
                )}
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "hero" : "outline"}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
