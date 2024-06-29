import { useRouter } from "next/router";
import { LuUser2 } from "react-icons/lu";

export function slugify(str: string) {
  return str.toLocaleLowerCase().replace(/\s/g, "-");
}

type Committee = "academic" | "program" | "loc" | "sponsor";

interface Person {
  name: string;
  role: string | null;
  org?: string;
  photo?: boolean;
}

export default function PhotoBubble({
  person,
  committee,
  showRole = true,
  ...otherProps
}: {
  person: Person;
  showRole: boolean;
  committee: Committee;
}) {
  const basePath = useRouter().basePath;
  const imgUrl = `${basePath ?? ""}/images/committees/${committee}/${slugify(
    person["name"]
  )}.jpg`;

  const border = {
    loc: "border-f4g_red",
    academic: "border-f4g_orange",
    program: "border-f4g_green",
    sponsor: "border-f4g_blue",
  };

  return (
    <div key={person["name"]} className="space-y-1" {...otherProps}>
      <div
        className={`aspect-square rounded-full hover:cursor-default border-4 ${border[committee]} overflow-hidden m-1 sm:m-2`}
      >
        {person["photo"] ? (
          <img width="512" height="512" src={imgUrl} alt={person["name"]} />
        ) : (
          <LuUser2 stroke="#ccc" strokeWidth={1} className="w-full h-full"/>
        )}
      </div>
      <div className="text-ubuntu text-center text-lg flex justify-center items-start leading-tight">
        {person["name"]}
      </div>
      {person["role"] && showRole && (
        <div className="text-ubuntu text-center text-sm">
          {person["role"]}
        </div>
      )}
      {person["org"] && (
        <div className="text-ubuntu text-center text-sm text-gray-700">
          {person["org"]}
        </div>
      )}
    </div>
  );
}
