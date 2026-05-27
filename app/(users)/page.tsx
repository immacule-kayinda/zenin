import { EquipmentTeaser } from "@/components/sections/EquipmentTeaser";
import { FeaturedStrip } from "@/components/sections/FeaturedStrip";
import { HeroZenin } from "@/components/sections/HeroZenin";
import { MaterialStory } from "@/components/sections/MaterialStory";

export default function HomePage() {
  return (
    <>
      <HeroZenin />
      <FeaturedStrip />
      <MaterialStory />
      <EquipmentTeaser />
    </>
  );
}
