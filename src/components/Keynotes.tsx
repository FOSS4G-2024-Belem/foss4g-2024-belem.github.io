import { useRouter } from "next/router";

export default function Keynotes({
  keynotes,
  bioText = "",
}: {
  keynotes: Array<{ name: string; image: string; bio: JSX.Element }>;
  bioText: string;
}) {
  const basePath = useRouter().basePath;
  return keynotes.map((keynote) => (
    <>
      <label
        key={keynote.name}
        htmlFor={`keynote-${keynote.name}`}
        className="group odd:bg-opacity-50 rounded-lg mx-auto odd:bg-f4g_orange hover:cursor-pointer hover:bg-f4g_orange hover:bg-opacity-80 max-w-[300px] hover:rounded-lg p-4"
      >
        <div
          className={`aspect-square rounded-full border-f4g_red border-[6px] overflow-hidden m-1 sm:m-2`}
        >
          <img
            width="512"
            height="512"
            src={`${basePath ?? ""}${keynote.image}`}
          />
        </div>
        <div className="text-ubuntu text-f4g_redfont-bold text-center text-2xl flex justify-center items-start leading-tight">
          {keynote["name"]}
        </div>
        <label className="text-ubuntu text-center group-hover:underline flex justify-center items-start leading-tight">
          {bioText}
        </label>
      </label>
      <input
        type="checkbox"
        id={`keynote-${keynote.name}`}
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div
            className={`aspect-square rounded-full border-f4g_red border-[6px] overflow-hidden m-1 sm:m-2`}
          >
            <img
              width="512"
              height="512"
              src={`${basePath ?? ""}${keynote.image}`}
            />
          </div>
          <div className="text-ubuntu mb-4 text-f4g_redfont-bold text-center text-2xl flex justify-center items-start leading-tight">
            {keynote["name"]}
          </div>
          <div className="text-sm">
          {keynote.bio}</div>
        </div>
        <label className="modal-backdrop" htmlFor={`keynote-${keynote.name}`}>
          Close
        </label>
      </div>
    </>
  ));
}
