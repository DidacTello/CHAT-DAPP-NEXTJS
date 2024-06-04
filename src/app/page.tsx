"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        localStorage.setItem('user', username);
      } else {
        const data = await response.json();
        setError(data.error);
        localStorage.setItem('user', username);
      }
      router.push('/chat');
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={async (event: any) => {
      event.preventDefault();}}>
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <button
        type='submit'
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
