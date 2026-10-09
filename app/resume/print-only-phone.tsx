'use client';

import { useEffect, useRef } from 'react';

// Kept in pieces so the number never appears in the HTML or as a phone
// pattern in the bundle. It is written into the page only while printing,
// so the saved PDF has it and the public web page does not.
const PARTS = ['210', '816', '1144'];

export default function PrintOnlyPhone() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const show = () => {
      if (ref.current) ref.current.textContent = `${PARTS.join('.')} · `;
    };
    const hide = () => {
      if (ref.current) ref.current.textContent = '';
    };
    window.addEventListener('beforeprint', show);
    window.addEventListener('afterprint', hide);
    return () => {
      window.removeEventListener('beforeprint', show);
      window.removeEventListener('afterprint', hide);
    };
  }, []);

  return <span ref={ref} />;
}
