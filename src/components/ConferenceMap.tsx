import {
  ExpressionSpecification,
  MapGeoJSONFeature,
  StyleSpecification,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from "maplibre-gl";
import { MapRef } from "react-map-gl/maplibre";
import { NamedFeatureCollection } from "@/lib/types";
import MapLibreMap, { isSameFeature, applyFeatureStates } from "@/lib/map";
import Popup from "@/components/Popup";

import venuesGeoJson from "@/data/venues.json";
import placesGeoJson from "@/data/places.json";
import lodingGeoJson from "@/data/lodging.json";
import bairrosGeoJson from "@/data/bairros.json";
import tourismGeoJson from "@/data/tourism.json";

import { useState, useRef, useMemo } from "react";

import "maplibre-gl/dist/maplibre-gl.css";
import { useRouter } from "next/router";

export default function Map({
  popupEmbeds,
}: {
  popupEmbeds: { [name: string]: Element };
}) {
  const router = useRouter();
  const mapRef = useRef<MapRef>(null);

  const [cursor, setCursor] = useState<string>("auto");

  const [hoveredFeature, setHoveredFeature] =
    useState<MapGeoJSONFeature | null>(null);
  const [selectedFeature, setSelectedFeature] =
    useState<MapGeoJSONFeature | null>(null);

  const mapStyle = useMemo(
    () => getMapStyle({ hoveredFeature, selectedFeature }),
    [hoveredFeature, selectedFeature]
  );

  const onClick = (e: MapLayerMouseEvent | MapLayerTouchEvent) => {
    if (!mapRef.current) return;

    const clickedFeat = mapRef.current
      .queryRenderedFeatures(e.point, {
        layers: ["attractions", "venues", "places", "lodging"],
      })?.[0]
      ?.toJSON();

    if (isSameFeature(clickedFeat, hoveredFeature)) setHoveredFeature(null);

    setSelectedFeature(clickedFeat);
    if (clickedFeat) {
      setHoveredFeature(null);

      if (["attractions", "venues"].includes(clickedFeat.layer.id)) {
        mapRef.current.flyTo({
          center: clickedFeat.geometry.coordinates,
          speed: 0.2,
          curve: 1,
          padding: {
            top: 600,
            left: 0,
            bottom: 0,
            right: 0,
          },
        });
      }
    }
  };

  const onMouseMove = (e: MapLayerMouseEvent) => {
    if (!mapRef.current) return;

    const mouseoverFeat = mapRef.current
      .queryRenderedFeatures(e.point, {
        layers: ["attractions", "venues", "places", "lodging"],
      })?.[0]
      ?.toJSON();

    setCursor(mouseoverFeat ? "pointer" : "auto");

    if (
      !isSameFeature(mouseoverFeat, hoveredFeature) &&
      !isSameFeature(mouseoverFeat, selectedFeature)
    )
      setHoveredFeature(mouseoverFeat ? mouseoverFeat : null);
  };

  return (
    <MapLibreMap
      ref={mapRef}
      minZoom={2}
      hash={true}
      maxZoom={20}
      initialViewState={{
        bounds: [-48.508521, -1.481578, -48.437068, -1.410125],
      }}
      cursor={cursor}
      onMouseMove={onMouseMove}
      onClick={onClick}
      onTouchEnd={onClick}
      transformRequest={(url: string) => {
        // transform fake sprite url in style to work on both dev and prod

        const baseUrl = `${window.location.host}${router.basePath ?? "/"}`;

        const newUrl = url.replace(
          "http://{basePath}",
          `${window.location.protocol}//${baseUrl}`
        );

        return { url: newUrl };
      }}
      mapStyle={mapStyle}
    >
      {hoveredFeature && (
        <Popup
          type="hover"
          popupEmbeds={popupEmbeds}
          feature={hoveredFeature}
        />
      )}
      {selectedFeature && (
        <Popup
          popupEmbeds={popupEmbeds}
          type="select"
          feature={selectedFeature}
        />
      )}
    </MapLibreMap>
  );
}

const getMapStyle = ({
  hoveredFeature,
  selectedFeature,
}: {
  hoveredFeature: MapGeoJSONFeature | null;
  selectedFeature: MapGeoJSONFeature | null;
}): StyleSpecification => {
  const featureState = {
    hover: hoveredFeature,
    select: selectedFeature,
  };

  // const osmGeoJson = {
  //   name: "osm",
  //   type: "FeatureCollection",
  //   features: osmJson.elements.map((el) => {
  //     const geom =
  //       "center" in el
  //         ? [el["center"]["lon"], el["center"]["lat"]]
  //         : [el["lon"], el["lat"]];

  //     return {
  //       type: "Feature",
  //       properties: el.tags,
  //       geometry: {
  //         type: "Point",
  //         coordinates: geom,
  //       },
  //     };
  //   }),
  // };

  return {
    version: 8,
    glyphs: "http://{basePath}/map/glyphs/{fontstack}/{range}.pbf",
    sprite: "http://{basePath}/map/sprite",
    sources: {
      "osm-carto": {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
      },
      protomaps: {
        type: "vector",
        attribution:
          '<a href="https://github.com/protomaps/basemaps" target="_blank">Protomaps</a> | <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>',
        url: "pmtiles://http://{basePath}/map/tiles/protomaps.pmtiles",
        minzoom: 10,
      },
      overture: {
        type: "vector",
        url: "pmtiles://http://{basePath}/map/tiles/overture.pmtiles",
        minzoom: 8,
        maxzoom: 14,
        attribution:
          '<a href="https://overturemaps.org" target="_blank">Overture Maps</a>',
      },
      worldcover: {
        type: "vector",
        url: "pmtiles://http://{basePath}/map/tiles/worldcover.pmtiles",
        attribution: "© ESA WorldCover 2021",
        minzoom: 8,
        maxzoom: 12,
      },
      belem1868: {
        type: "raster",
        url: "pmtiles://http://{basePath}/map/tiles/belem-1868.pmtiles",
        minzoom: 4,
        maxzoom: 8,
        tileSize: 512,
      },
      venues: {
        type: "geojson",
        data: applyFeatureStates(
          venuesGeoJson as NamedFeatureCollection,
          featureState
        ),
      },
      places: {
        type: "geojson",
        data: applyFeatureStates(
          placesGeoJson as NamedFeatureCollection,
          featureState
        ),
        attribution:
          '<a href="https://overturemaps.org" target="_blank">Overture Maps</a>',
      },
      loding: {
        type: "geojson",
        data: applyFeatureStates(
          lodingGeoJson as NamedFeatureCollection,
          featureState
        )
      },
      belemLabel: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [-48.4764625, -1.4529607],
              },
            },
          ],
        },
      },
      tourism: {
        type: "geojson",
        data: applyFeatureStates(
          tourismGeoJson as NamedFeatureCollection,
          featureState
        ),
      },
      bairros: {
        type: "geojson",
        data: bairrosGeoJson as NamedFeatureCollection,
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: {
          "background-color": "#cccccc",
        },
      },
      {
        id: "osm",
        type: "raster",
        source: "osm-carto",
        maxzoom: 11,
      },
      {
        id: "earth",
        type: "fill",
        source: "protomaps",
        "source-layer": "earth",
        paint: {
          "fill-color": "#e0e0e0",
        },
      },
      {
        id: "worldcover",
        type: "fill",
        source: "worldcover",
        "source-layer": "worldcover",
        paint: {
          "fill-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            10,
            0,
            10.5,
            1,
          ],
          "fill-color": [
            "match",
            ["get", "class"],
            [10],
            "rgb(100, 124, 70)", // tree
            [20],
            "rgb(150, 152, 70)", // shrub
            [30],
            "rgb(248, 229, 157)", // grassland
            [40],
            "rgb(153, 138, 93)", // cropland
            [50],
            "rgb(214, 216, 202)", // built up
            [60],
            "rgb(241, 244, 255)", // bare
            [70],
            "rgb(190, 218, 255)", // snow and ice
            [80],
            "#80deea", // water
            [90],
            "rgb(126, 201, 162)", // wetland
            [95],
            "rgb(126, 201, 162)", // mangroves
            [100],
            "rgb(252, 229, 157)", // moss
            "#80deea",
          ],
        },
        minzoom: 10,
      },
      {
        id: "worldcover-pattern",
        type: "fill",
        source: "worldcover",
        "source-layer": "worldcover",
        paint: {
          "fill-pattern": "pattern0"
        },
        filter: ["==", ["get", "class"], 80]
      },
      // {
      //   id: "bairros-fill",
      //   type: "fill",
      //   source: "bairros",
      //   minzoom: 12,
      //   paint: {
      //     "fill-color": "#d86e39",
      //     "fill-opacity": [
      //       "interpolate",
      //       ["exponential", 1],
      //       ["zoom"],
      //       12,
      //       0,
      //       12.5,
      //       0.3,
      //     ],
      //   },
      // },
      {
        id: "landuse_aerodrome",
        type: "fill",
        source: "protomaps",
        "source-layer": "landuse",
        filter: ["any", ["in", "pmap:kind", "aerodrome"]],
        paint: {
          "fill-color": "#dadbdf",
        },
      },
      {
        id: "transit_runway",
        type: "line",
        source: "protomaps",
        "source-layer": "transit",
        filter: ["any", ["in", "pmap:kind_detail", "runway"]],
        paint: {
          "line-color": "#e9e9ed",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            10,
            0,
            12,
            4,
            18,
            30,
          ],
        },
      },
      {
        id: "buildings",
        type: "fill",
        source: "overture",
        "source-layer": "buildings",
        minzoom: 14,
        maxzoom: 20,
        paint: {
          "fill-color": "#cccccc",
          "fill-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            14,
            0,
            14.5,
            1,
          ],
        },
      },
      {
        id: "foss4g-logo",
        type: "symbol",
        source: "belemLabel",
        minzoom: 10,
        maxzoom: 15.5,
        layout: {
          "icon-image": "foss4g-logo",
          "icon-ignore-placement": true,
          "icon-allow-overlap": true,
          "icon-optional": false,
          "icon-size": [
            "interpolate",
            ["exponential", 2],
            ["zoom"],
            10,
            0.1,
            15.5,
            4,
          ],
        },
        paint: {
          "icon-opacity": [
            "interpolate",
            ["exponential", 0.8],
            ["zoom"],
            10,
            1,
            11,
            1,
            11.4,
            0.4,
            13,
            0,
          ],
        },
      },

      {
        id: "roads_other",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: ["all", ["in", "pmap:kind", "other", "path"]],
        paint: {
          "line-color": "#ebebeb",
          "line-dasharray": [3, 1],
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            14,
            0,
            20,
            7,
          ],
        },
      },
      {
        id: "roads_link",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: ["all", ["==", "pmap:link", 1]],
        paint: {
          "line-color": "#ffffff",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            13,
            0,
            13.5,
            1,
            18,
            11,
          ],
        },
      },
      {
        id: "roads_minor_service",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: [
          "all",
          ["==", "pmap:kind", "minor_road"],
          ["==", "pmap:kind_detail", "service"],
        ],
        paint: {
          "line-color": "#ebebeb",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            13,
            0,
            18,
            8,
          ],
        },
      },
      {
        id: "roads_minor",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: [
          "all",
          ["==", "pmap:kind", "minor_road"],
          ["!=", "pmap:kind_detail", "service"],
        ],
        paint: {
          "line-color": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            11,
            "#ebebeb",
            16,
            "#ffffff",
          ],
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            11,
            0,
            12.5,
            0.5,
            15,
            2,
            18,
            11,
          ],
        },
      },
      {
        id: "roads_medium",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: ["all", ["==", "pmap:kind", "medium_road"]],
        paint: {
          "line-color": "#f5f5f5",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            7,
            0,
            12,
            1.2,
            15,
            3,
            18,
            13,
          ],
        },
      },
      {
        id: "roads_major",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: ["all", ["==", "pmap:kind", "major_road"]],
        paint: {
          "line-color": "#ffffff",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            6,
            0,
            12,
            1.6,
            15,
            3,
            18,
            13,
          ],
        },
      },
      {
        id: "roads_highway",
        type: "line",
        source: "protomaps",
        "source-layer": "roads",
        filter: ["all", ["==", "pmap:kind", "highway"], ["!=", "pmap:link", 1]],
        paint: {
          "line-color": "#ffffff",
          "line-width": [
            "interpolate",
            ["exponential", 1.6],
            ["zoom"],
            3,
            0,
            6,
            1.1,
            12,
            1.6,
            15,
            5,
            18,
            15,
          ],
        },
      },
      // {
      //   id: "bairros-border",
      //   type: "line",
      //   source: "bairros",
      //   minzoom: 12,
      //   paint: {
      //     "line-color": "#d86e39",
      //     "line-opacity": [
      //       "interpolate",
      //       ["exponential", 1],
      //       ["zoom"],
      //       12,
      //       0,
      //       12.5,
      //       0.8,
      //     ],
      //     "line-width": 1.5,
      //   },
      // },
      {
        id: "roads_labels_major",
        type: "symbol",
        source: "protomaps",
        "source-layer": "roads",
        minzoom: 14.5,
        filter: [
          "any",
          ["in", "pmap:kind", "highway", "major_road", "medium_road"],
        ],
        layout: {
          "symbol-sort-key": ["get", "pmap:min_zoom"],
          "symbol-placement": "line",
          "text-font": ["Noto Sans Regular"],
          "text-field": ["get", "name"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#938a8d",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
      },
      {
        id: "places",
        type: "symbol",
        source: "places",
        minzoom: 14,
        layout: {
          "symbol-sort-key": ["-", 1, ["get", "confidence"]],
          "icon-image": "{category}",
          "icon-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              14.5,
              ["*", ["var", "multiplier"], 0.12],
              15,
              ["*", ["var", "multiplier"], 0.15],
            ],
          ],
          "text-anchor": "left",
          "text-offset": [1.2, 0],
          "text-max-width": 100,
          "text-field": [
            "step",
            ["zoom"],
            "",
            15.5,
            ["case", ["==", ["get", "category"], "hotel"], ["get", "name"], ""],
          ],
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              13,
              ["*", ["var", "multiplier"], 7],
              14.5,
              ["*", ["var", "multiplier"], 10],
              15,
              ["*", ["var", "multiplier"], 12],
            ],
          ],
        },
        paint: {
          "text-halo-width": 1,
          "text-halo-blur": 0.5,
          "text-halo-color": "rgba(255,255,255,0.8)",
          "icon-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            14,
            0,
            14.5,
            1,
          ],
        },
      },
      {
        id: "lodging",
        type: "symbol",
        source: "loding",
        minzoom: 13.5,
        layout: {
          "icon-image": "hotel",
          "icon-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              9,
              ["*", ["var", "multiplier"], 0.15],
              11,
              ["*", ["var", "multiplier"], 0.2],
              13,
              ["*", ["var", "multiplier"], 0.2],
            ],
          ],
          "text-anchor": "left",
          "text-offset": [1.2, 0],
          "text-max-width": 100,
          "text-field": [
            "step",
            ["zoom"],
            "",
            13.5,
            ["get", "name"]
          ],
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.8,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              9,
              ["*", ["var", "multiplier"], 7],
              11,
              ["*", ["var", "multiplier"], 10],
              13,
              ["*", ["var", "multiplier"], 14],
            ],
          ],
          "text-allow-overlap": true,
        },
        paint: {
          "text-halo-width": 1,
          "text-halo-blur": 0.5,
          "text-halo-color": "rgba(255,255,255,0.8)",
          "icon-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            13.5,
            0,
            14,
            1,
          ],
        },
      },
      {
        id: "belem-label",
        type: "symbol",
        source: "belemLabel",
        minzoom: 11,
        maxzoom: 14,
        layout: {
          "text-offset": [0, 0],
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-field": "Belém",
          "text-size": [
            "interpolate",
            ["exponential", 2],
            ["zoom"],
            12,
            40,
            14,
            120,
          ],
          "text-ignore-placement": true,
          "text-allow-overlap": true,
        },
        paint: {
          "text-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            11,
            0,
            11.5,
            1,
            13,
            0.5,
            14,
            0,
          ],
          "text-color": "#552f27",
          "text-halo-width": 4,
          "text-halo-blur": 2,
          "text-halo-color": "rgba(255,255,255,0.8)",
        },
      },
      // {
      //   id: "bairros-labels",
      //   type: "symbol",
      //   source: "protomaps",
      //   "source-layer": "places",
      //   minzoom: 12,
      //   layout: {
      //     "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
      //     "text-field": ["get", "name"],
      //     "text-size": 14,
      //   },
      //   paint: {
      //     "text-color": "#552f27",
      //     "text-halo-color": "#fff",
      //     "text-halo-width": 2,
      //     "text-halo-blur": 0.5,
      //     "text-opacity": [
      //       "interpolate",
      //       ["exponential", 1],
      //       ["zoom"],
      //       12,
      //       0,
      //       12.5,
      //       1,
      //     ],
      //   },
      //   filter: [
      //     "in",
      //     "name",
      //     "Cidade Velha",
      //     "Campina",
      //     "Umarizal",
      //     "Batista Campos",
      //     "Marco",
      //   ],
      // },
      {
        id: "venues",
        type: "symbol",
        source: "venues",
        minzoom: 11,
        layout: {
          "text-allow-overlap": true,
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-anchor": "top",
          // "text-offset": [
          //   "let",
          //   "multiplier",
          //   [
          //     "case",
          //     [
          //       "any",
          //       ["==", ["get", "hover"], 1],
          //       ["==", ["get", "select"], 1],
          //     ],
          //     1.2,
          //     1,
          //   ],
          //   "let",
          //   "icon-base",
          //   [
          //     "interpolate",
          //     ["linear"],
          //     ["zoom"],
          //     12,
          //     ["*", ["var", "multiplier"], 0.4],
          //     13,
          //     ["*", ["var", "multiplier"], 0.5],
          //     14,
          //     ["*", ["var", "multiplier"], 0.6],
          //   ],
          //   ["array", "number", 0, ["get", "icon-base"]]
          // ],
          "text-field": [
            "step",
            ["zoom"],
            "",
            11,
            [
              "format",
              ["get", "label"],
              {
                "font-scale": 1.7,
                "text-font": ["literal", ["Noto Sans Regular"]],
              } as unknown as ExpressionSpecification,
            ],
            13,
            [
              "format",
              ["get", "label"],
              {
                "font-scale": 1.7,
                "text-font": ["literal", ["Noto Sans Regular"]],
              } as unknown as ExpressionSpecification,
              "\n",
              { "font-scale": 1 },
              ["get", "sublabel"],
              { "font-scale": 1.15 },
            ],
          ],
          "text-max-width": 100,
          "text-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              ["*", ["var", "multiplier"], 7],
              13,
              ["*", ["var", "multiplier"], 8],
              14,
              ["*", ["var", "multiplier"], 9],
            ],
          ],
          "icon-allow-overlap": true,
          "icon-image": ["get", "icon"],
          "icon-anchor": "bottom",
          "icon-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              ["*", ["var", "multiplier"], 0.4],
              13,
              ["*", ["var", "multiplier"], 0.5],
              14,
              ["*", ["var", "multiplier"], 0.6],
            ],
          ],
        },
        paint: {
          "text-halo-width": 2,
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.8)",
          "text-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            11,
            0,
            11.5,
            1,
          ],
          "icon-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            11,
            0,
            11.5,
            1,
          ],
        },
      },
      {
        id: "attractions",
        type: "symbol",
        source: "tourism",
        minzoom: 12,
        layout: {
          "icon-image": ["get", "icon"],
          "icon-ignore-placement": true,
          "icon-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              ["*", ["var", "multiplier"], 0.35],
              13,
              ["*", ["var", "multiplier"], 0.4],
              14,
              ["*", ["var", "multiplier"], 0.45],
            ],
          ],
          "text-offset": [0, 1.5],
          "text-field": ["step", ["zoom"], "", 12.1, ["get", "name"]],
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-ignore-placement": true,
          "text-size": [
            "let",
            "multiplier",
            [
              "case",
              [
                "any",
                ["==", ["get", "hover"], 1],
                ["==", ["get", "select"], 1],
              ],
              1.2,
              1,
            ],
            [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              ["*", ["var", "multiplier"], 14],
              13,
              ["*", ["var", "multiplier"], 15],
              14,
              ["*", ["var", "multiplier"], 16],
            ],
          ],
          "text-anchor": "top",
        },
        paint: {
          "text-halo-width": 2,
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.8)",
          "icon-opacity": [
            "interpolate",
            ["exponential", 1],
            ["zoom"],
            12,
            0,
            12.5,
            1,
          ],
        },
      },
      {
        id: "airport",
        type: "symbol",
        source: "protomaps",
        "source-layer": "pois",
        layout: {
          "icon-image": "airport",
          "icon-size": 0.2,
          "text-field": "Belém International Airport",
          "text-font": ["literal", ["Noto Sans SemiCondensed Regular"]],
          "text-size": 12,
          "text-offset": [0, 1],
          "text-anchor": "top",
        },
        paint: {
          "text-halo-width": 2,
          "text-halo-blur": 1,
          "text-halo-color": "rgba(255,255,255,0.8)",
        },
        filter: ["==", "iata", "BEL"],
      },
      {
        id: "belem-1868",
        type: "raster",
        source: "belem1868",
        minzoom: 4,
        maxzoom: 8,
      },
    ],
  };
};
