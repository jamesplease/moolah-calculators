import PurchasingPowerOverTime from "./calculators/purchasing-power-over-time/purchasing-power-over-time";
import CounteractingInflation from "./calculators/counteracting-inflation/counteracting-inflation";
import CompoundInterest from "./calculators/compound-interest/compound-interest";

type CalculatorTag = "Uses Historical Data" | "Inflation" | "Interest";

interface CalculatorItem {
  url: string;
  name: string;
  Component: React.ComponentType;
  tags: CalculatorTag[];
  shortDescription?: string;
}

const calculatorItems: CalculatorItem[] = [
  {
    url: "/purchasing-power-over-time",
    name: "Purchasing Power Over Time",
    Component: PurchasingPowerOverTime,
    tags: ["Uses Historical Data", "Inflation"],
    shortDescription:
      "Explore how much inflation has reduced the purchasing power of the U.S. dollar throughout history.",
  },

  {
    url: "/counteracting-inflation",
    name: "Counteracting Inflation",
    Component: CounteractingInflation,
    tags: ["Uses Historical Data", "Inflation"],
    shortDescription:
      "Find out how much money you need to counteract the effect of inflation on the U.S dollar.",
  },

  {
    url: "/compound-interest",
    name: "Compound Interest",
    Component: CompoundInterest,
    tags: ["Interest"],
    shortDescription:
      "Compound interest is a key idea in personal finance: it enables you to increase your wealth more quickly than you could otherwise.",
  },
];

export default calculatorItems;
