import Geochicas from "@/images/logo/geochicas.png";
import Geolibres from "@/images/logo/geolibres.png";
import MeninasDaGeo from "@/images/logo/meninas-da-geo.png";
import OsGeoBrasil from "@/images/logo/osgeo-brasil.png";
import OsGeoLogo from "@/images/logo/osgeo-logo.png";
import QgisBrasil from "@/images/logo/qgis-brasil.png";

import GoogleLogo from "@/images/logo/google.png";

export const sponsors = {
  osgeo: {
    logo: OsGeoLogo,
    website: null,
    statement: null,
  },
  osgeobrasil: {
    logo: OsGeoBrasil,
    website: null,
    statement: null,
  },
  meninasdageo: {
    logo: MeninasDaGeo,
    website: null,
    statement: null,
  },
  geolibres: {
    logo: Geolibres,
    website: null,
    statement: null,
  },
  geochicas: {
    logo: Geochicas,
    website: null,
    statement: null,
  },
  qgisbrasil: {
    logo: QgisBrasil,
    website: null,
    statement: null,
  },
  google: {
    logo: GoogleLogo,
    website: "https://opensource.google/",
    statement: (
      <div>
        Google believes that open source is good for everyone. By being open and
        freely available, it enables and encourages collaboration and the
        development of technology. <br />
        <a href='https://opensource.google/' target="_blank">https://opensource.google/</a>
      </div>
    ),
  },
};
