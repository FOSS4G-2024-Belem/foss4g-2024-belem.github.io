import { getPopupOffset } from "@/lib/map";
import { IconAnchorType } from "@/lib/types";
import { MapGeoJSONFeature } from "maplibre-gl";
import { Popup as MapPopup, SymbolLayer } from "react-map-gl/maplibre";

export default function Popup({
  feature,
  type,
}: {
  feature: MapGeoJSONFeature;
  type: "hover" | "select";
}) {
  const featLonLat = feature.geometry as GeoJSON.Point;
  const featLayout = (feature.layer as SymbolLayer).layout;

  let iconAnchor = (featLayout?.["icon-anchor"] as IconAnchorType) ?? "center";
  let iconSize = (featLayout?.["icon-size"] as number) * 100;

  // hacky way to account for hover being called before state updated and multiplier applied
  if (type == "hover" && feature?.["properties"]?.["hover"] == 0) {
    iconSize = iconSize * 1.2;
  }

  const padding = 6;
  const popupOffset = getPopupOffset({ iconAnchor, iconSize, padding });

  const lonLat = [
    Number(featLonLat.coordinates[0]),
    Number(featLonLat.coordinates[1]),
  ];
  return (
    <MapPopup
      latitude={lonLat[1]}
      longitude={lonLat[0]}
      offset={popupOffset as any}
      maxWidth={undefined}
      closeButton={type === "select"}
      closeOnClick={false}
      className="cursor-default"
    >
      {feature.layer.id == "lodging" && (
        <LodgingPopupContent
          type={type}
          // @ts-ignore
          lonLat={lonLat}
          properties={feature.properties}
        />
      )}
      {feature.source == "venues" && (
        <VenuePopupContent type={type} properties={feature.properties} />
      )}
    </MapPopup>
  );
}

function VenuePopupContent({
  type,
  properties,
}: {
  type: "hover" | "select";
  properties: GeoJSON.GeoJsonProperties;
}) {
  const isHover = type === "hover";

  return (
    <div className={"text-black -mx-1 -my-2 overflow-auto min-w-60"}>
      {properties?.["name"]}
    </div>
  );
}

function LodgingPopupContent({
  type,
  lonLat,
  properties,
}: {
  type: "hover" | "select";
  lonLat: [number, number];
  properties: GeoJSON.GeoJsonProperties;
}) {
  const isHover = type === "hover";
  if (properties === null) return;

  const propRow = (label: string, key: string) => {
    return key in properties ? (
      <>
        <div className="col-span-2">{label}</div>
        <div className="col-span-4">{properties[key]}</div>
      </>
    ) : (
      <></>
    );
  };

  return (
    <div className={"text-black -mx-1 -my-2 overflow-auto min-w-60"}>
      <div className="text-center font-ubuntu border-b border-gray-200 mb-2 text-xl whitespace-nowrap">
        {properties?.["name"]}
      </div>

      <div className="">
        <table className="border-separate border-spacing-1">
          <tbody>
            {"address" in properties && (
              <tr>
                <td className="align-top leading-4 font-bold">Address</td>
                <td className="max-w-40 leading-4">{properties["address"]}</td>
              </tr>
            )}

            {"phone" in properties && (
              <tr>
                <td className="align-top leading-4 font-bold">Phone</td>
                <td className="max-w-40 leading-4">{properties["phone"]}</td>
              </tr>
            )}

            {"website" in properties && (
              <tr>
                <td className="align-top leading-4 font-bold">Website</td>
                <td className="max-w-40 leading-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  <a href={properties["website"]}>{properties["website"]}</a>
                </td>
              </tr>
            )}

            {"social" in properties && (
              <tr>
                <td className="align-top leading-4 font-bold">Social</td>
                <td className="max-w-40 leading-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                  <a href={properties["social"]}>{properties["social"]}</a>
                </td>
              </tr>
            )}

            <tr>
              <td className="align-top leading-4 font-bold">Lon/Lat</td>
              <td className="max-w-40 leading-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                {lonLat[0].toPrecision(6)},{lonLat[1].toPrecision(6)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
