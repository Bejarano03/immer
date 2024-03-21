import React, { useState } from 'react';
import { useImmer } from 'use-immer';

function ShoppingListWithImmer() {
  // State initialization with useImmer
  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: 'Apples', quantity: 5, details: { category: 'Fruit', notes: 'Organic' } },
    { id: 2, name: 'Milk', quantity: 1, details: { category: 'Dairy', notes: 'Whole Milk' } },
    { id: 3, name: 'Bread', quantity: 2, details: { category: 'Bakery', notes: 'Whole Wheat' } }
  ]);

  // Function to add a new item to the shopping list
  const addItem = () => {
    updateShoppingList(draft => {
      draft.push({
        id: draft.length + 1,
        name: 'New Item',
        quantity: 1,
        details: { category: '', notes: '' }
      });
    });
  };

  // Function to update an existing item in the shopping list
  const updateItem = (id, field, value) => {
    updateShoppingList(draft => {
      const itemIndex = draft.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        draft[itemIndex][field] = value;
      }
    });
  };

  // Function to remove an item from the shopping list
  const removeItem = (id) => {
    updateShoppingList(draft => {
      return draft.filter(item => item.id !== id);
    });
  };

  return (
    <div>
      {/* UI to interact with the shopping list */}
      <button onClick={addItem}>Add Item</button>

      {/* Render shopping list items */}
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
            />
            <button onClick={() => removeItem(item.id)}>Remove</button>
            <div>
              <label>Category:</label>
              <input
                type="text"
                value={item.details.category}
                onChange={(e) => updateItem(item.id, 'details.category', e.target.value)}
              />
            </div>
            <div>
              <label>Notes:</label>
              <input
                type="text"
                value={item.details.notes}
                onChange={(e) => updateItem(item.id, 'details.notes', e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListWithImmer;
