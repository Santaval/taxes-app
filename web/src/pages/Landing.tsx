import { useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import WhyUs from "../components/WhyUs";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Layout from "../components/Layout";

const Landing = () => {
  useEffect(() => {
    document.title = "TributoCR - Gestión de Impuestos Simple";
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      <WhyUs />
      <HowItWorks />
      <Pricing />
    </Layout>
  );
};

export default Landing;
