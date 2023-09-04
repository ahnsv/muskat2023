import bg from "../../public/assets/bg-main.png";
import { HeroSection } from "./sections/HeroSection/HeroSection";

export default function Home() {
  return (
    <div
      className={`w-screen h-screen py-16 bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <HeroSection />
    </div>
  );
}
