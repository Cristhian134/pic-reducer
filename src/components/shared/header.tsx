import { MobileMenu } from "./mobileMenu";

export function Header() {
  return (
    <header className="xl:px-60 lg:px-16 md:px-5 sm:px-3 px-3 flex w-full flex-col gap-3 py-3 justify-center">
      <div className="flex justify-between items-center">
        <span className="text-4xl font-bold font-sans">PicReducer</span>
        <MobileMenu />
      </div>
      <p className="text-xl">
        Compress JPG, WEBP, and PNG images with Browser based Image compressor.
        Private and No Limits
      </p>
    </header>
  );
}
