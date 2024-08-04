import Geochicas from "@/images/logo/geochicas.png";
import Geolibres from "@/images/logo/geolibres.png";
import MeninasDaGeo from "@/images/logo/meninas-da-geo.png";
import OsGeoBrasil from "@/images/logo/osgeo-brasil.png";
import OsGeoLogo from "@/images/logo/osgeo-logo.png";
import QgisBrasil from "@/images/logo/qgis-brasil.png";

import GoogleLogo from "@/images/logo/google.png";
import SourcepoleLogo from "@/images/logo/Sourcepole.png";
import DevSeedLogo from "@/images/logo/DevelopmentSeed.png";
import GeoOneLogo from "@/images/logo/GeoOne.png";
import scconLogo from "@/images/logo/sccon.png";

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
  sourcepole: {
    logo: SourcepoleLogo,
    website: "https://qgiscloud.com/",
    statement: (
      <div>
        Advanced online GIS mapping with QGIS Cloud and QGIS Desktop <br />
        QIGS cloud is your personal spatial data infrastructure (SDI) on the internet. Publish your QGIS projects as maps and data. Share spatial data with others. And all this very easily, without server, infrastructure or expert knowledge. If you know QGIS Desktop, then you know QGIS Cloud. Simply install the QGIS Cloud plugin from the official QGIS plugin repository and you are ready to go.<br />
        <a href='https://qgiscloud.com/' target="_blank">https://qgiscloud.com/</a>
      </div>
    ),
  },
  devseed: {
    logo: DevSeedLogo,
    website: "https://developmentseed.org/",
    statement: (
      <div>
        At Development Seed, we are leveraging massive earth data, cloud computing, geospatial AI, and thoughtful product development to make earth data more accessible to everyone by providing a clearer view of rapidly changing planet.<br />
        <a href='https://developmentseed.org/' target="_blank">https://developmentseed.org/</a>
      </div>
    ),
  },
  geoone: {
    logo: GeoOneLogo,
    website: "https://geoone.com.br/",
    statement: (
      <div>
        GeoOne develops and disseminates open-source software solutions for engineering and land regularization, empowering professionals in geoprocessing and GIS.<br/>
        <a href='https://geoone.com.br/' target="_blank">https://geoone.com.br/</a>
      </div>
    ),
  },
  scoon: {
    logo: scconLogo,
    website: "https://www.sccon.com.br/",
    statement: (
      <div>
        O poder de ver e medir as mudanças.<br/>
        <a href='https://www.sccon.com.br/' target="_blank">https://www.sccon.com.br/</a>
      </div>
    ),
  },
};
