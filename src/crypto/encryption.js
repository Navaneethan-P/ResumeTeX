/**
 * Client-side AES-256-GCM encryption utilities.
 * All operations run in the browser via Web Crypto API.
 * Nothing is ever sent to a server.
 */

const PBKDF2_ITERATIONS = 600000
const SALT_LENGTH = 16
const IV_LENGTH = 12

function ab2b64(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}

function b642ab(b64) {
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt plaintext with a passphrase.
 * Returns a base64 string: salt(16) + iv(12) + ciphertext.
 */
export async function encrypt(plaintext, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const key = await deriveKey(passphrase, salt)
  const enc = new TextEncoder()
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  )
  const combined = new Uint8Array(
    SALT_LENGTH + IV_LENGTH + ciphertext.byteLength
  )
  combined.set(salt, 0)
  combined.set(iv, SALT_LENGTH)
  combined.set(new Uint8Array(ciphertext), SALT_LENGTH + IV_LENGTH)
  return ab2b64(combined.buffer)
}

/**
 * Decrypt a base64 encrypted string with the given passphrase.
 * Throws if the passphrase is wrong or data is corrupted.
 */
export async function decrypt(encryptedB64, passphrase) {
  const combined = new Uint8Array(b642ab(encryptedB64))
  const salt = combined.slice(0, SALT_LENGTH)
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
  const ciphertext = combined.slice(SALT_LENGTH + IV_LENGTH)
  const key = await deriveKey(passphrase, salt)
  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )
  return new TextDecoder().decode(plainBuf)
}

/**
 * Download plaintext .tex file directly (no encryption).
 */
export function downloadTex(latex, filename = 'resume.tex') {
  const blob = new Blob([latex], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Encrypt and download a .tex file.
 */
export async function downloadEncryptedTex(latex, passphrase, filename = 'resume.enc.tex') {
  const encrypted = await encrypt(latex, passphrase)
  const blob = new Blob([encrypted], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Load and decrypt an encrypted .tex file from disk.
 */
export async function loadEncryptedTex(file, passphrase) {
  const text = await file.text()
  return decrypt(text.trim(), passphrase)
}
