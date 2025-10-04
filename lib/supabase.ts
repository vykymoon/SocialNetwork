import { createClient } from '@supabase/supabase-js'
import * as FileSystem from 'expo-file-system'

const supabaseUrl = 'https://szwsyjrydkxlrtsgpzsr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6d3N5anJ5ZGt4bHJ0c2dwenNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MTg4OTQsImV4cCI6MjA3MzE5NDg5NH0.LFIxRN0t-wUJlQIGQfgCD1pZaqpebDHw4pIMlcbxYQ0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Nueva función para subir foto y actualizar perfil
export async function uploadProfilePhoto(userId: string, uri: string) {
  // Lee el archivo como binario
  const fileData = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
  const fileBuffer = Buffer.from(fileData, 'base64')
  const filePath = `avatars/${userId}/${Date.now()}.jpg`

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    })
  if (error) throw error

  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath)
  const publicUrl = publicUrlData.publicUrl

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', userId)
  if (updateError) throw updateError

  return publicUrl
}