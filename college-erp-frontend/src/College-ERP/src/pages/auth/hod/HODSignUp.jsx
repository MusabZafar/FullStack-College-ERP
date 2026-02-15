import React, { useState } from 'react';
import axios from 'axios';

const HODSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    if (file) {
      payload.append('file', file);
    } else {
      // if image is not mandatory, send an empty file with a dummy name
      const emptyBlob = new Blob([], { type: 'application/octet-stream' });
      payload.append('file', emptyBlob, 'empty.png');
    }

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const res = await axios.post('http://localhost:8080/api/hods/add-hod', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data || 'HOD created successfully');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setMessage('HOD with same username or email already exists.');
      } else {
        setMessage('Failed to create HOD');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">HOD Sign Up</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register HOD
        </button>
      </form>
    </div>
  );
};

export default HODSignUp;
