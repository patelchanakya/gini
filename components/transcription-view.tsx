import { createClient } from '@supabase/supabase-js'

export default function RecordingView({ fileName }: any) {

    const supabaseUrl = 'https://orkxbxvmhaqqxanaamdj.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

    const supabase = createClient(supabaseUrl, supabaseKey)

    if (fileName) {
        const fetchRecording = async () => {
            const { data, error } = await supabase
                .from('recordings')
                .select('url')
                .eq('file_name', fileName);

            if (error) {
                console.error('    recording:', error);
            } else if (data && data.length > 0) {
                const recordingUrl = data[0].url;
                console.log('Recording URL:', recordingUrl);
            }
        };
        fetchRecording();
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <p>Recording: {fileName}</p>

            {/* Display the file content here... */}
        </div>
    );
}