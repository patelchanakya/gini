'use client'

import RecordingView from '@/components/recording-view'
import TranscriptionView from '@/components/transcription-view'
import { Suspense, useState } from 'react'



export default function MainView() {
    const [fileName, setFileName] = useState<string | null>(null);

    // const date = new Date();
    // const hours = date.getHours();
    // const ampm = hours >= 12 ? 'PM' : 'AM';
    // const hoursIn12HourFormat = hours % 12 || 12;
    // const randomNumber = Math.floor(Math.random() * 1000);
    // console.log(randomNumber)
    // const fileName = `my-${hoursIn12HourFormat}${ampm}-medical-appointment-${randomNumber}.webm`;



    return (
        <section>

            <RecordingView />

        </section>




    )
}
