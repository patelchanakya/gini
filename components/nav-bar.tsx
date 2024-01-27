import Image from 'next/image';
import { ModeToggle } from './mode-toggle';

export default function NavBar() {
    return (
        <nav className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex lg:pt-5">
            <div className="flex w-full gap-4 px-5 justify-between items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 mr-4">
                <p>
                    Transcribe anything. Copy and delete from existence. Desktop Supported. <br />
                    <code className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Click the mic below</code> </p>
                <div className="flex flex-row">
                    <ModeToggle />
                </div>
            </div>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <a
                    className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://www.twitter.com/chanakyeah"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    By{' '}
                    <Image
                        src="/gini.svg"
                        alt="Gini Logo"
                        className="dark:invert"
                        width={100}
                        height={100}
                        priority
                    />
                </a>
            </div>
        </nav>
    );
}