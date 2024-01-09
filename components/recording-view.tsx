'use client'

import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { createClient } from '@supabase/supabase-js'
import { createContext, useContext } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCallback } from 'react';


// Create a new context
export const FileContext = createContext<string | undefined>(undefined);
// create and export function
export default function RecordingView({ }: any) {
    const [fileName, setFileName] = useState<string | null>(null);

    const [isReady, setIsReady] = useState(false);

    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
    const [file, setFile] = useState<string | undefined>();
    const [publicUrl, setPublicUrl] = useState<string | undefined>(undefined);
    const [transcriptState, setTranscriptState] = useState<string>("Transcript will show here...");




    const supabaseUrl = 'https://orkxbxvmhaqqxanaamdj.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

    const supabase = createClient(supabaseUrl, supabaseKey)

    const emailRef = useRef<HTMLInputElement | null>(null);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const handleEmailSubmit = useCallback(() => {
        // Here you can handle the email, e.g., validation, sending to the server, etc.
        if (emailRef.current) {
            const email = emailRef.current.value;
            console.log(email);
        }
        // Set emailSubmitted to true to show the AudioRecorder
        setEmailSubmitted(true);
    }, [emailRef]);


    const addAudioElement = useCallback(async (blob: any) => {
        setTranscriptState("Processing Transcription... please come back :)")
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
        console.log('Blob:', blob); // Check the value of blob

        const date = new Date();
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hoursIn12HourFormat = hours % 12 || 12;
        const randomNumber = Math.floor(Math.random() * 1000);
        console.log(randomNumber)
        const fileName = `my-${hoursIn12HourFormat}${ampm}-medical-appointment-${randomNumber}.webm`;
        setFileName(fileName)




        const file = new File([blob], fileName, { type: 'audio/webm' });
        console.log('File:', file); // Check the value of file

        setFile(fileName)


        // Upload the file to Supabase storage
        const filePath = `recordings/${file.name}`;
        console.log(filePath)
        const { error: uploadError } = await supabase.storage.from('holding').upload(filePath, file);

        //success log
        if (!uploadError) {
            console.log('File uploaded successfully to Supabase storage');
        } else {
            console.error('Error uploading file to Supabase storage:', uploadError);
        }


        const getPublicUrl = async () => {
            try {
                const { data } = await supabase
                    .storage
                    .from('holding')
                    .getPublicUrl(filePath);

                setPublicUrl(data.publicUrl);

                // Update the Supabase table with the public URL and file name
                const { error: updateError } = await supabase
                    .from('recordings')
                    .upsert([{ url: data.publicUrl, file_name: file.name }]);

                if (updateError) {
                    console.error('Error updating table:', updateError);
                    return;
                }

                //   ***
                // Make a POST request to the /api/transcribe endpoint
                const response = await fetch('/api/transcribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fileName: file.name, url: data.publicUrl }),
                });

                if (!response.ok) {
                    console.error('Error transcribing audio:', response.status);
                    return;
                }


                const responseData = await response.json();
                console.log(responseData)
                setTranscript(responseData.file_results);
                console.log('Audio transcribed successfully');


            } catch (error) {
                console.error('Error getting public URL:', error);
            }
        };

        getPublicUrl();
    }, [supabase]); // Add any other dependencies here


    useEffect(() => {
        if (!isRecording && audioChunks.length) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            console.log('Playing audio: ------- DONE', audioUrl);
            setAudioChunks([]);
        }
    }, [isRecording, audioChunks]);


    useEffect(() => {
        // Set isReady to true after the initial render
        setIsReady(true);
    }, []);

    return (

        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="flex items-center justify-center w-96 h-32">
                {/* {!emailSubmitted ? (
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input ref={emailRef} type="email" placeholder="Email" />
                        <Button onClick={handleEmailSubmit} type="button">Start</Button>
                    </div>
                ) : ( */}
                <form className='w-full h-full justify-center flex '>
                    <AudioRecorder
                        onRecordingComplete={addAudioElement}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }}
                        downloadOnSavePress={true}
                        downloadFileExtension="webm"
                    />
                </form>
                {/* )} */}
            </div>
            <div className="mt-4 text-center text-gray-600 w-full mx-auto">
                {transcript ? transcript : transcriptState}


            </div>
            {file && (
                <div className="mt-5 font-bold text-center text-gray-600 w-full lg:w-1/2 mx-auto">
                    <p>Recording Created: {file}</p>
                </div>
            )}
        </div>


    );
}

