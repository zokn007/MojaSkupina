import {createClient, type SupabaseClient} from '@supabase/supabase-js';
const url=import.meta.env.VITE_SUPABASE_URL;
const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const cloud:SupabaseClient|null=url&&key?createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true}}):null;
export const cloudReady=Boolean(cloud);
export type WorkspaceData={songs:any[];events:any[];members:any[];setlists:any[];finance:any[];inventory:any[];docs:any[]};
export async function loadWorkspace(groupId:string):Promise<WorkspaceData|null>{if(!cloud)return null;const {data,error}=await cloud.from('band_data').select('payload').eq('group_id',groupId).maybeSingle();if(error)throw error;return data?.payload||null}
export async function saveWorkspace(groupId:string,payload:WorkspaceData){if(!cloud)throw Error('Supabase ni nastavljen');const {error}=await cloud.from('band_data').upsert({group_id:groupId,payload,updated_at:new Date().toISOString()},{onConflict:'group_id'});if(error)throw error}
