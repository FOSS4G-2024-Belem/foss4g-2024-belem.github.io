import Image, { StaticImageData } from "next/image";

export default function SponsorGrid({
  level,
  images,
}: {
  level: 0 | 1 | 2 | 3 | 4;
  images: StaticImageData[];
}) {
  const levelMap = {
    0: {
      gap: "gap-4 6xl:gap-10",
      maxW: "",
      text: "p-4 6xl:p-6 text-4xl 6xl:text-6xl leading-5",
    },
    1: {
      gap: "gap-3 sm:gap-8",
      maxW: "max-w-40 6xl:max-w-60 max-h-16 6xl:max-h-20",
      text: "p-3 6xl:p-5 text-2xl 6xl:text-4xl leading-5",
    },
    2: {
      gap: "gap-2 sm:gap-6",
      maxW: "max-w-24 6xl:max-w-60 max-h-12 6xl:max-h-16",
      text: "p-2 6xl:p-4 6xl:text-xl leading-4",
    },
    3: {
      gap: "gap-1 sm:gap-4",
      maxW: "max-w-20 6xl:max-w-48",
      text: "p-1 6xl:p-3 text-sm 6xl:text-lg leading-4",
    },
    4: {
      gap: "gap-1 sm:gap-2",
      maxW: "max-w-20 6xl:max-w-36",
      text: "text-xs 6xl:text-base leading-4",
    },
  };

  const classes = levelMap[level];

  return (
    <div
      className={`flex flex-wrap items-center justify-center ${classes["gap"]}`}
    >
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`flex ${classes["maxW"]} items-center justify-center`}
        >
          {img ? (
            <Image
              alt={""}
              placeholder="blur"
              src={img}
              className={`block ${classes["maxW"]} object-scale-down`}
            />
          ) : (
            <div
              className={`border font-ubuntu select-none border-gray-800 p-2 ${classes["text"]} rounded text-center text-gray-700`}
            >
              Your Logo Here!
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
