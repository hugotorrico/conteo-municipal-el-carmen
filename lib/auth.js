import crypto from 'node:crypto';
function secret(){return process.env.APP_SECRET||'dev-change-me'}
export function tokenForMesa(id){return crypto.createHmac('sha256',secret()).update(String(id)).digest('hex').slice(0,32)}
export function validMesaToken(id,token){if(!token)return false;const a=Buffer.from(tokenForMesa(id)),b=Buffer.from(String(token));return a.length===b.length&&crypto.timingSafeEqual(a,b)}
export function validAdminPin(pin){const expected=process.env.ADMIN_PIN||'';if(!expected||!pin)return false;const a=Buffer.from(expected),b=Buffer.from(String(pin));return a.length===b.length&&crypto.timingSafeEqual(a,b)}