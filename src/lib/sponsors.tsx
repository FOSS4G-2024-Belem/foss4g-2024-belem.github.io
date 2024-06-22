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
    statement: null,
  },
  osgeobrasil: {
    logo: OsGeoBrasil,
    statement: null,
  },
  meninasdageo: {
    logo: MeninasDaGeo,
    statement: null,
  },
  geolibres: {
    logo: Geolibres,
    statement: null,
  },
  geochicas: {
    logo: Geochicas,
    statement: null,
  },
  qgisbrasil: {
    logo: QgisBrasil,
    statement: null,
  },
  google: {
    logo: GoogleLogo,
    statement: (
      <div>
        Google believes that open source is good for everyone. By being open and
        freely available, it enables and encourages collaboration and the
        development of technology.
      </div>
    ),
  },
};
