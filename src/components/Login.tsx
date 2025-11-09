
import React, { useState } from 'react';
import { api } from '../utils/api';

interface LoginProps { onLoginSuccess: () => void; }

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      if (mode === 'signup') {
        const res = await api('/api/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
        localStorage.setItem('token', res.token);
        onLoginSuccess();
      } else {
        const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        localStorage.setItem('token', res.token);
        onLoginSuccess();
      }
    } catch (e:any) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">{mode === 'login' ? 'Login' : 'Create an account'}</h2>

        {mode === 'signup' && (
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-4"
            value={name} onChange={(e) => setName(e.target.value)} required />
        )}

        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-4"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="w-full p-2 border rounded mb-4"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60">
          {loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Sign up')}
        </button>

        <p className="text-center mt-4 text-sm">
          {mode === 'login' ? (
            <>New user? <button type="button" className="text-indigo-600 underline" onClick={() => setMode('signup')}>Create an account</button></>
          ) : (
            <>Already have an account? <button type="button" className="text-indigo-600 underline" onClick={() => setMode('login')}>Log in</button></>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
