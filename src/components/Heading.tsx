import { PropsWithChildren } from "react";

export default function Heading({
  bubble = false,
  color = null,
  children = null,
}: {
  bubble?: boolean | null;
  color?: "green" | "orange" | "red" | "blue" | null;
  children: React.ReactNode | null;
}) {
  // doing it this way for the tailwind jit compiler
  // https://tailwindcss.com/docs/content-configuration#dynamic-class-names

  const borders = {
    green: "border-f4g_green",
    red: "border-f4g_red",
    orange: "border-f4g_orange",
    blue: "border-f4g_blue",
  };
  const text = {
    green: "text-f4g_green",
    red: "text-f4g_red",
    orange: "text-f4g_orange",
    blue: "text-f4g_blue",
  };

  const bubbleClasses = bubble ? "sm:border-2 bg-white" : "";

  return (
    <div className="flex items-center my-3 sm:my-5">
      <div className={`flex-1 border-t-2 ${borders[color ?? "red"]}`}></div>
      <div
        className={`text-2xl sm:text-4xl ${bubbleClasses} ${
          borders[color ?? "red"]
        } rounded-lg sm:py-2 text-center font-bold font-ubuntu ${
          text[color ?? "red"]
        } px-2 sm:px-4 sm:mx-4`}
      >
        {children}
      </div>
      <div className={`flex-1 border-t-2 ${borders[color ?? "red"]}`}></div>
    </div>
  );
}

export function ArrowHeading({
  color = "red",
  size = 0,
  children,
}: PropsWithChildren<{
  color?: "green" | "orange" | "red" | "blue";
  size?: 0 | 1 | 2 | 3;
}>) {

  const sizeClasses = {
    0: "text-3xl sm:text-4xl",
    1: "text-2xl sm:text-3xl",
    2: "text-xl sm:text-2xl",
    3: "text-lg sm:text-xl",
  }

  const borders = {
    green: "border-f4g_green",
    red: "border-f4g_red",
    orange: "border-f4g_orange",
    blue: "border-f4g_blue",
  };

  const text = {
    green: "text-f4g_green",
    red: "text-f4g_red",
    orange: "text-f4g_orange",
    blue: "text-f4g_blue",
  };

  return (
    <div
      className={`flex my-6 sm:my-8 items-center font-ubuntu font-semibold ${text[color]} ${sizeClasses[size]}`}
    >
      <div className="px-2 sm:px-4"><span className="text-f4g_orange">&gt;&gt;&gt;</span> {children}</div>
      <div className={`hidden flex-1 border-t-4 ${borders[color]}`}></div>
    </div>
  );
}
