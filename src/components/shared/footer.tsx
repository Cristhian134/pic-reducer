import { GithubIcon } from "../icons";

export function Footer() {
  return (
    <footer className="box-border bg-neutral-50 h-20 absolute -bottom-[7rem] text-lg text-neutral-500 dark:text-neutral-400 w-full">
      <div className="xl:px-60 lg:px-16 md:px-5 px-3 h-20 border-t flex justify-between border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <span className="text-lg">PicReducer</span>
        <a
          target="_blank"
          rel="noopener"
          aria-label="GitHub de La Velada, se abrirá en una nueva pestaña"
          href="https://github.com/Cristhian134/pic-reducer"
          className="transition-all hover:scale-105 inline-block any-hover:scale-125 any-hover:opacity-70 motion-safe:transition motion-reduce:any-hover:scale-100"
        >
          <GithubIcon stroke="black" color="black" />
        </a>
      </div>
    </footer>
  );
}
