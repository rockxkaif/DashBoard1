import React, { useState, useEffect } from 'react';
import Category from './Category';
import AddWidgetForm from './AddWidgetForm';
import SearchBar from './SearchBar';

function Dashboard() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addWidget = (categoryId, widget) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.id === categoryId) {
          return { ...category, widgets: [...category.widgets, widget] };
        }
        return category;
      });
      return { ...prevData, categories: updatedCategories };
    });
  };

  const removeWidget = (categoryId, widgetId) => {
    setData(prevData => {
      const updatedCategories = prevData.categories.map(category => {
        if (category.id === categoryId) {
          return { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) };
        }
        return category;
      });
      return { ...prevData, categories: updatedCategories };
    });
  };

  const filteredCategories = data?.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  if (!data) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <SearchBar className="search-bar" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddWidgetForm className="add-widget-form" data={data} addWidget={addWidget} />
      {filteredCategories.map(category => (
        <Category
          key={category.id}
          className="category"
          category={category}
          removeWidget={removeWidget}
        />
      ))}
    </div>
  );
}

export default Dashboard;
