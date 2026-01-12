'use client'; // needed for hooks in Next.js App Router

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1337/api/user')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Main Screen</h1>
      {user ? (
        <p>First user email: {user.email || user.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}