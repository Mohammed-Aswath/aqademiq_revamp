// The referral landing page: https://www.aqademiq.com/join?ref=CODE
// People with the app installed never see this (iOS/Android open the app).
// Everyone else gets the code to copy and the two store buttons.
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

const APP_STORE = 'https://apps.apple.com/app/id6792360288';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.r13.aqademiq';

function Join() {
  const raw = useSearchParams().get('ref') ?? '';
  // Untrusted input: only an 8-character hex code is ever shown.
  const code = /^[0-9A-Fa-f]{8}$/.test(raw) ? raw.toUpperCase() : null;
  const [copied, setCopied] = useState(false);

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '64px 20px', textAlign: 'center', fontFamily: 'inherit' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>You're invited to Aqademiq</h1>
      <p style={{ color: '#646464', marginBottom: 28 }}>Get the app, then enter this code when you set it up.</p>
      {code && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 6 }}>{code}</div>
          <button
            onClick={() => { void navigator.clipboard.writeText(code); setCopied(true); }}
            style={{ marginTop: 12, padding: '10px 20px', borderRadius: 999, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
          >
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <a href={APP_STORE} style={{ padding: 14, borderRadius: 999, background: '#111', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Download on the App Store</a>
        <a href={PLAY_STORE} style={{ padding: 14, borderRadius: 999, background: '#111', color: '#fff', textDecoration: 'none', fontWeight: 700 }}>Get it on Google Play</a>
      </div>
    </main>
  );
}

export default function JoinPage() {
  return (
    <Suspense>
      <Join />
    </Suspense>
  );
}
