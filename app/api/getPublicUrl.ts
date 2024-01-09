import { createClient } from '@supabase/supabase-js'

export default async function getPublicUrl({ fileName, }: { fileName: string }) {
    const supabaseUrl = 'https://orkxbxvmhaqqxanaamdj.supabase.co'
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data } = await supabase.storage.from('holding').getPublicUrl(fileName);

    //   if (error) {
    //     console.error('Error getting public URL:', error);
    //     return;
    //   }

    return data;
}