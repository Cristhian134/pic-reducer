import { useSettings } from "@/hooks/useSettings";
import clsx from "clsx";
import { AlignRight } from "lucide-react";

export function MobileMenu() {
  const { open, setOpen } = useSettings();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-none bg-inherit hover:bg-zinc-100 p-0 flex justify-center items-center box-border border-[1px] aspect-square lg:hidden w-10 h-10"
      >
        <AlignRight className="size-[2rem] stroke-[1] absolute" />
      </button>
      <div
        className={clsx(
          "fixed inset-y-0 left-0 w-[100%] lg:px-16 md:px-5 sm:px-3 px-3 py-3 bg-white z-[90] pointer-events-none flex-col overflow-x-auto overflow-y-auto transform -translate-x-full transition-transform duration-200 ease-in-out",
          {
            "pointer-events-auto transform translate-x-0 flex flex-col items-end shadow-[0_0_30px_rgba(0,0,0,0.8)]":
              open,
          }
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="border-none bg-inherit hover:bg-zinc-50 p-0 flex justify-center items-center box-border border-[1px] aspect-square lg:hidden w-10 h-10"
        >
          <AlignRight className="size-[2rem] stroke-[1] absolute" />
        </button>
      </div>
    </>
  );
}
