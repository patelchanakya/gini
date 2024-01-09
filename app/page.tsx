import Image from 'next/image'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import RecordingView from '@/components/recording-view'
import SettingsToggle from '@/components/settings-toggle'
import TranscriptionView from '@/components/transcription-view'
import MainView from '@/components/main-view'

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center bg-gray-100 ">
      <div className="z-10 max-w-5xl lg:pt-5 w-full items-center justify-between font-mono text-sm lg:flex">

        <div className="flex w-full gap-4 px-5 justify-between items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>
            Capture your medical appointment!&nbsp;
            <code className="font-mono font-bold">Click the mic below</code>
          </p>
          <br />
          <div className="flex flex-row">

            <ModeToggle />
          </div>
        </div>
        <MainView />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/gini.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100} // Set the width
              height={100} // Set the height
              priority
            />
          </a>
        </div>
      </div>


    </main>
  )
}
