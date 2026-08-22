import {
  Sparkles,
  Sun,
  Music,
  Users,
  MapPin,
  Heart,
  CircleDot,
  PartyPopper,
  Building2,
  Baby,
} from "lucide-react";

export const iconMap = {
  Sparkles,
  Sun,
  Music,
  Users,
  MapPin,
  Heart,
  CircleDot,
  PartyPopper,
  Building2,
  Baby,
};

export function Icon({ name, className }) {
  const Cmp = iconMap[name] || Sparkles;
  return <Cmp className={className} />;
}
