import { Buffer } from 'buffer';

// idx 값을 Base64로 인코딩
export function encodeId (id : number) {
    return Buffer.from(String(id)).toString('base64');
};
// Base64로 인코딩된 id 값을 디코딩
export function decodeId (encodedId : string) {
    return Buffer.from(encodedId, 'base64').toString('ascii');
};