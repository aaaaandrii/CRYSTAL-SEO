'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      name: formData.get('name'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push('/admin/users');
    } else {
      const err = await res.json();
      setError(err.error || 'Failed to create user');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Create User</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
        )}

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            required
            className="admin-input"
            placeholder="Full name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className="admin-input"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="admin-input"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Role</label>
          <select name="role" className="admin-select" defaultValue="editor">
            <option value="editor">Editor — can manage content</option>
            <option value="admin">Admin — full access + user management</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#5a72be] px-6 py-2 text-sm font-semibold text-white hover:bg-[#4d63a8] disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
