import {list} from '@vercel/blob';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET') return res.status(405).json({ok:false,error:'Método no permitido'});
  const env={appSecret:Boolean(process.env.APP_SECRET),adminPin:Boolean(process.env.ADMIN_PIN),blobToken:Boolean(process.env.BLOB_READ_WRITE_TOKEN)};
  try{
    const r=await list({prefix:'healthcheck/',limit:1});
    return res.status(200).json({ok:env.appSecret&&env.adminPin&&env.blobToken,env,blob:{connected:true,count:r.blobs?.length||0}});
  }catch(e){
    return res.status(500).json({ok:false,env,blob:{connected:false},error:String(e?.message||e)});
  }
}