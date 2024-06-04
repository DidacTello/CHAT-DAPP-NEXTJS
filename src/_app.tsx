"use client"
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  return (
      <Component {...pageProps} user={user} setUser={setUser}/>
  );
}

export default MyApp;
