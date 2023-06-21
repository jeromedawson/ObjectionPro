import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const ScriptForm = ({ onSubmit, initialScript }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialScript) {
      setTitle(initialScript.title);
      setContent(initialScript.content);
    }
  }, [initialScript]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (initialScript) {
          // Edit existing script
          const updatedScript = { id: initialScript.id, title, content };
          await api.put(`/scripts/${initialScript.id}`, updatedScript);
          onSubmit(updatedScript);
        } else {
          // Add new script
          const newScript = { title, content };
          const response = await api.post('/scripts', newScript);
          onSubmit(response.data);
        }
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Failed to save script', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (title.trim() === '') {
      errors.title = 'Title is required.';
    }

    if (content.trim() === '') {
      errors.content = 'Content is required.';
    }

    return errors;
  };

  return (
    <div>
      <h2>{initialScript ? 'Edit Script' : 'Add Script'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <button type="submit">{initialScript ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default ScriptForm;
