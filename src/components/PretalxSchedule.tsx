import Script from "next/script";

export default function PretalxSchedule({
  eventSlug,
  locale,
}: {
  eventSlug: string;
  locale: string;
}) {
  const scheduleProps = {
    "event-url": `https://talks.osgeo.org/${eventSlug}/`,
    locale: locale,
    format: "grid",
    style: {
      "--pretalx-clr-primary": "#D86E39",
    },
  };
  return (
    <>
      <Script type="text/javascript" src="/pretix-schedule.js" />

      <div className="6xl:mx-auto px-2 my-2 6xl:px-2 6xl:my-4">
        <div className="overflow-x-auto" style={{ zoom: "75%" }}>
          {/* @ts-ignore */}
          <pretalx-schedule
            {...scheduleProps}
            onload={() => console.log("load")}
          />
        </div>
      </div>
    </>
  );
}
