import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ['@rami-dv/mapajoara'],

  images: {
    unoptimized: true,
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      ...{ "/sponsors": { page: "/en/sponsors" } },
    };
  },
  env: {
    baseUrl: "https://2024.foss4g.org",
  },
  basePath: undefined,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config, context) => {

    // exclude the sprite png's from next image loader
    for (let rule of config.module.rules) {
      if (rule["loader"] == "next-image-loader") {
        rule["exclude"] = /\@rami\-dv\/mapajoara\/src\/.*\.(png|jpg|svg)$/i
      }
    }

    config.module.rules.push({
      test: /\@rami\-dv\/mapajoara\/src\/data\//i,
      exclude: [/geojson/i, /\.ts$/i],
      type: "asset/resource",
      generator: {
        filename: (pd) => {
          console.log(pd["filename"]);
          return `static/chunks/${pd["filename"]}`;
        },
      },
    });

    // load map assets as an asset/resource
    // config.module.rules.push({
    //   test: /\@rami\-dv\/mapajoara\/src\/map\/.*\.(pmtiles|pbf|png|json)$/i,
    //   type: "asset/resource",
    //   generator: {
    //     filename: "static/chunks/[path][name][ext]",
    //   },
    // });

    return config;
  },
};

export default withMDX()(nextConfig);
