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
      <ArrowHeading>Diamond Sponsor</ArrowHeading>
      <SponsorGrid level={0} sponsorNames={['re_earth']} />

      {/*<ArrowHeading>Platinum Sponsors</ArrowHeading>
      <SponsorGrid level={1} sponsorNames={[null, null]} />*/}

      <ArrowHeading>Gold Sponsors</ArrowHeading>
      <SponsorGrid level={2} sponsorNames={["geocat"]} />

      <ArrowHeading>Silver Sponsors</ArrowHeading>
      <SponsorGrid level={3} sponsorNames={["google", "sccon", "quarticle", "tethys"]} />

      <ArrowHeading>Bronze Sponsors</ArrowHeading>
      <SponsorGrid level={4} sponsorNames={["sourcepole", "devseed", "arkedgespace", "merginmaps", "opengis_ch", "mapbiomas", "mlit"]} />

      <ArrowHeading>Supporter Sponsors</ArrowHeading>
      <SponsorGrid level={4} sponsorNames={["geoone", "tomtom", "clickgeo"]} />

      {/*<ArrowHeading size={2} color="orange">Community Partners</ArrowHeading>
      <SponsorGrid level={-1} sponsorNames={["geochicas", "meninasdageo", "qgisbrasil", "qgisargentina"]} />*/}

      <ArrowHeading>Media Partners</ArrowHeading>
      <SponsorGrid level={-2} sponsorNames={["zenodo", "ufra", "tib"]} />
    </div>
  );
}
