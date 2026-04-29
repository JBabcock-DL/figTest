import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const assembledPath = join(__dir, 'assembled-cc-scaffold.mjs');
const assembled = readFileSync(assembledPath, 'utf8');
const b64 = Buffer.from(assembled, 'utf8').toString('base64');

const pre =
  "function __b64ToBytes(b64){const A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';b64=String(b64).replace(/=+$/,'');let bits=0,bitlen=0;const out=[];for(let i=0;i<b64.length;i++){const v=A.indexOf(b64[i]);if(v<0)continue;bits=(bits<<6)|v;bitlen+=6;if(bitlen>=8){bitlen-=8;out.push((bits>>bitlen)&255)}}return out}function __utf8Decode(bytes){let s='',i=0;while(i<bytes.length){let c=bytes[i++];if(c<128)s+=String.fromCharCode(c);else if((c>>5)===6){const c2=bytes[i++];s+=String.fromCharCode(((c&31)<<6)|(c2&63))}else if((c>>4)===14){const c2=bytes[i++],c3=bytes[i++];s+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63))}else if((c>>3)===30){const c2=bytes[i++],c3=bytes[i++],c4=bytes[i++];let u=((c&7)<<18)|((c2&63)<<12)|((c3&63)<<6)|(c4&63);u-=65536;s+=String.fromCharCode(55296+(u>>10),56320+(u&1023))}}return s}";

const code = `${pre}const __PAYLOAD=${JSON.stringify(b64)};const __src=__utf8Decode(__b64ToBytes(__PAYLOAD));return (0,eval)(__src);`;

const args = {
  fileKey: 'uCpQaRsW4oiXW3DsC6cLZm',
  code,
  description: 'create-component — scaffold (radio-group)',
  skillNames: 'figma-use,canvas-bundle-runner',
};

const outPath = join(__dir, 'mcp-cc-scaffold-wrapped-args.json');
writeFileSync(outPath, JSON.stringify(args), 'utf8');

const bytes = Buffer.byteLength(JSON.stringify(args), 'utf8');
console.log(JSON.stringify({ outPath, codeChars: code.length, jsonUtf8Bytes: bytes, assembledSha256: createHash('sha256').update(assembled).digest('hex') }));
