import React from 'react';
import Widget from './Widget';

function Category({ category, removeWidget, className }) {
  return (
    <div className={className}>
      <h2>{category.name}</h2>
      <div className="widget-container">
        {category.widgets.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => removeWidget(category.id, widget.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
