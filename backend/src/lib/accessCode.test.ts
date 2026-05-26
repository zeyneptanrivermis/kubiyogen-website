import assert from 'assert';
import { createAccessCodeValue, defaultAccessCodeExpiry } from './accessCode';

const code = createAccessCodeValue();
assert.match(code, /^KBY-[A-F0-9]{16}$/);

const now = new Date();
const expiry = defaultAccessCodeExpiry();
assert.ok(expiry > now);
assert.ok(expiry.getFullYear() >= now.getFullYear() + 1);

console.log('accessCode tests passed');
