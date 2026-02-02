'use client';

import { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  order: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface FAQClientProps {
  initialFaqs: FAQ[];
}

export default function FAQClient({ initialFaqs }: FAQClientProps) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    order: 0,
    active: true,
  });
  const [loading, setLoading] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(faqs.map(f => f.category).filter(Boolean))) as string[];

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Statistics
  const stats = {
    total: faqs.length,
    active: faqs.filter(f => f.active).length,
    inactive: faqs.filter(f => !f.active).length,
    categories: categories.length,
  };

  // Open add modal
  const openAddModal = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      order: faqs.length + 1,
      active: true,
    });
    setEditingFaq(null);
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      order: faq.order,
      active: faq.active,
    });
    setEditingFaq(faq);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
      order: 0,
      active: true,
    });
  };

  // Save FAQ (create or update)
  const saveFaq = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      alert('Question and answer are required');
      return;
    }

    setLoading(true);
    try {
      if (editingFaq) {
        // Update existing FAQ
        const response = await fetch(`/api/admin/faq/${editingFaq.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update FAQ');

        const updatedFaq = await response.json();
        setFaqs(faqs.map(f => f.id === editingFaq.id ? updatedFaq : f));
      } else {
        // Create new FAQ
        const response = await fetch('/api/admin/faq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to create FAQ');

        const newFaq = await response.json();
        setFaqs([...faqs, newFaq]);
      }

      closeModal();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert('Failed to save FAQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete FAQ
  const deleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete FAQ');

      setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle active status
  const toggleActive = async (faq: FAQ) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/faq/${faq.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !faq.active }),
      });

      if (!response.ok) throw new Error('Failed to update FAQ status');

      const updated = await response.json();
      setFaqs(faqs.map(f => f.id === faq.id ? updated : f));
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
      alert('Failed to update FAQ status.');
    } finally {
      setLoading(false);
    }
  };

  // Move FAQ up/down in order
  const moveFaq = async (faq: FAQ, direction: 'up' | 'down') => {
    const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);
    const currentIndex = sortedFaqs.findIndex(f => f.id === faq.id);

    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === sortedFaqs.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const swapFaq = sortedFaqs[newIndex];

    setLoading(true);
    try {
      // Update both FAQs' order
      await Promise.all([
        fetch(`/api/admin/faq/${faq.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: swapFaq.order }),
        }),
        fetch(`/api/admin/faq/${swapFaq.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: faq.order }),
        }),
      ]);

      // Update local state
      const newFaqs = faqs.map(f => {
        if (f.id === faq.id) return { ...f, order: swapFaq.order };
        if (f.id === swapFaq.id) return { ...f, order: faq.order };
        return f;
      });
      setFaqs(newFaqs);
    } catch (error) {
      console.error('Error reordering FAQs:', error);
      alert('Failed to reorder FAQs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="mt-2 text-gray-600">Manage frequently asked questions</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition shadow-sm font-semibold"
        >
          + Add FAQ
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-600 mb-1">Total FAQs</p>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-600 mb-1">Inactive</p>
          <p className="text-3xl font-bold text-gray-400">{stats.inactive}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-sm text-gray-600 mb-1">Categories</p>
          <p className="text-3xl font-bold text-blue-600">{stats.categories}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FAQs List */}
      <div className="bg-white rounded-lg shadow">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {faqs.length === 0 ? (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg mb-2">No FAQs yet</p>
                <p className="text-sm">Create your first FAQ to get started.</p>
              </>
            ) : (
              <p>No FAQs match your search criteria.</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredFaqs.map((faq, index) => {
              const sortedFaqs = [...filteredFaqs].sort((a, b) => a.order - b.order);
              const sortedIndex = sortedFaqs.findIndex(f => f.id === faq.id);

              return (
                <div key={faq.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start gap-4">
                    {/* Order Controls */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveFaq(faq, 'up')}
                        disabled={sortedIndex === 0 || loading}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveFaq(faq, 'down')}
                        disabled={sortedIndex === sortedFaqs.length - 1 || loading}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-gray-500">#{faq.order}</span>
                        {faq.category && (
                          <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {faq.category}
                          </span>
                        )}
                        {!faq.active && (
                          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>

                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <span>Updated: {new Date(faq.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toggleActive(faq)}
                        disabled={loading}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                          faq.active
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {faq.active ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => openEditModal(faq)}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteFaq(faq.id)}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="What is the best time to visit Tanzania?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Provide a detailed answer..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category (optional)
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Safari, Visa, Packing, Weather"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="active" className="ml-2 text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeModal}
                disabled={loading}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveFaq}
                disabled={loading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
