async function request(path, options = {}) {
  const response = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export const adminApi = {
  me: () => request('/api/auth/me'),
  login: (email, password) =>
    request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  googleLogin: (credential) =>
    request('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  products: () => request('/api/products?includeInactive=true'),
  product: (id) => request(`/api/products/${id}`),
  createProduct: (product) =>
    request('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),
  updateProduct: (id, product) =>
    request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),
  archiveProduct: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/uploads', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },
};
