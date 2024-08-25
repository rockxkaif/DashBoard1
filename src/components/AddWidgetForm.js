import React, { useState } from 'react';

function AddWidgetForm({ data, addWidget, className }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [widgetName, setWidgetName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && widgetName) {
      const widget = { id: Date.now(), name: widgetName, text: "New widget text" };
      addWidget(Number(selectedCategory), widget);
      setWidgetName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select Category</option>
        {data.categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <input
        type="text"
        value={widgetName}
        onChange={(e) => setWidgetName(e.target.value)}
        placeholder="Widget Name"
        required
      />
      <button type="submit">Add Widget</button>
    </form>
  );
}

export default AddWidgetForm;
