import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/agent" className="hover:underline">CV Agent Demo</Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 mb-4 flex h-auto w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:w-auto lg:bg-none lg:mb-0">
        <a
          href="https://www.llamaindex.ai/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <span>Built by LlamaIndex</span>
          <Image
            className="rounded-xl"
            src="/llama.png"
            alt="Llama Logo"
            width={40}
            height={40}
            priority
          />
        </a>
      </div>
    </div>
  );
}
