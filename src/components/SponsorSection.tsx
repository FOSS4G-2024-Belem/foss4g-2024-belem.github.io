import Heading from "@/components/Heading";
import SponsorGrid from "@/components/SponsorGrid";
import Image from "next/image";
import Link from "next/link";
import IntlLink from "@/components/IntlLink";
import ArrowHeading from "@/components/Heading";
import Foss4g2022OpeningSession from "@/images/foss4g-2022/opening-session.jpg";

export default function SponsorsSection() {
  return (
    <div className="space-y-12">
      {/* Sponsors por nível */}
      {/*<ArrowHeading size={0}>Diamond Sponsor</ArrowHeading>
      <SponsorGrid level={0} sponsorNames={[null]} />*/}

      {/*<ArrowHeading size={1}>Platinum Sponsors</ArrowHeading>
      <SponsorGrid level={1} sponsorNames={[null, null]} />*/}

      <ArrowHeading>Gold Sponsors</ArrowHeading>
      <SponsorGrid level={2} sponsorNames={["kan"]} />

      <ArrowHeading>Silver Sponsors</ArrowHeading>
      <SponsorGrid level={3} sponsorNames={["google", "sccon", "quarticle"]} />

      <ArrowHeading>Bronze Sponsors</ArrowHeading>
      <SponsorGrid level={4} sponsorNames={["sourcepole", "devseed", "arkedgespace", "merginmaps", "opengis_ch"]} />

      <ArrowHeading>Supporter Sponsors</ArrowHeading>
      <SponsorGrid level={4} sponsorNames={["geoone", "tomtom"]} />

      {/*<ArrowHeading size={2} color="orange">Community Partners</ArrowHeading>
      <SponsorGrid level={-1} sponsorNames={["geochicas", "meninasdageo", "qgisbrasil", "qgisargentina"]} />*/}

      <ArrowHeading>Media Partners</ArrowHeading>
      <SponsorGrid level={-1} sponsorNames={["zenodo", "ufra"]} />
    </div>
  );
}
