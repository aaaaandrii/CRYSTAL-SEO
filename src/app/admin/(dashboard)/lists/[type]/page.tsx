'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { contentTypes } from '@/lib/content-types';

interface ContentItem {
  id: string;
  type: string;
  data: Record<string, unknown>;
  sortOrder: number;
  published: boolean;
}

export default function ListItemsPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const [type, setType] = useState<string | null>(null);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => setType(p.type));
  }, [params]);

  const fetchItems = useCallback(() => {
    if (!type) return;
    fetch(`/api/items?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const typeDef = type ? contentTypes[type] : null;

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
    await saveOrder(newItems);
  }

  async function handleMoveDown(index: number) {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
    await saveOrder(newItems);
  }

  async function saveOrder(orderedItems: ContentItem[]) {
    await fetch('/api/items', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: orderedItems.map((item, i) => ({ id: item.id, sortOrder: i })),
      }),
    });
  }

  async function handleTogglePublished(item: ContentItem) {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    });
    if (res.ok) {
      setItems(items.map((i) => (i.id === item.id ? { ...i, published: !i.published } : i)));
    }
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  if (!typeDef) {
    return (
      <div>
        <p className="text-brand-gray">Content type not found.</p>
        <Link href="/admin/lists" className="mt-4 inline-block text-sm text-brand-accent hover:underline">
          ← Back to Lists
        </Link>
      </div>
    );
  }

  const nameField = typeDef.nameField;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/admin/lists" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
            ← Back to Lists
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-brand-white">{typeDef.labelPlural}</h1>
          <p className="mt-1 text-sm text-brand-gray">{typeDef.description}</p>
        </div>
        <Link
          href={`/admin/lists/${type}/new`}
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Add {typeDef.label}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-brand-border bg-brand-navy p-12 text-center">
          <p className="text-brand-gray mb-4">No {typeDef.labelPlural.toLowerCase()} yet.</p>
          <Link href={`/admin/lists/${type}/new`} className="text-brand-accent hover:underline text-sm">
            Create your first {typeDef.label.toLowerCase()}
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-brand-border bg-brand-navy overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider w-10">
                  #
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  {nameField.charAt(0).toUpperCase() + nameField.slice(1)}
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Order
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((item, index) => (
                <tr key={item.id} className="hover:bg-brand-dark/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-brand-gray">{index + 1}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/lists/${type}/${item.id}/edit`}
                      className="text-brand-white hover:text-brand-accent transition-colors text-sm font-medium"
                    >
                      {String(item.data[nameField] || 'Untitled')}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublished(item)}
                      className={`text-xs px-2 py-0.5 rounded cursor-pointer ${
                        item.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="text-brand-gray hover:text-brand-white disabled:opacity-30 transition-colors text-sm px-1"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === items.length - 1}
                        className="text-brand-gray hover:text-brand-white disabled:opacity-30 transition-colors text-sm px-1"
                      >
                        ↓
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/lists/${type}/${item.id}/edit`}
                        className="text-brand-gray hover:text-brand-accent transition-colors text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, String(item.data[nameField] || 'item'))}
                        className="text-brand-gray hover:text-red-400 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
