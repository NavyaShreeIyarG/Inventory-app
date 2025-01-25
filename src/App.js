// Importing necessary libraries
import React, { useState } from 'react';
import './App.css'; // Assuming you have a CSS file for styling

const App = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', category: 'Category 1', quantity: 15 },
    { id: 2, name: 'Item B', category: 'Category 2', quantity: 8 },
    { id: 3, name: 'Item C', category: 'Category 1', quantity: 20 },
  ]);
  const [filter, setFilter] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', category: '', quantity: '' });

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setItems([
        ...items,
        { id: Date.now(), name: newItem.name, category: newItem.category, quantity: parseInt(newItem.quantity, 10) },
      ]);
      setNewItem({ name: '', category: '', quantity: '' });
    }
  };

  const handleEditItem = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: field === 'quantity' ? parseInt(value, 10) : value } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = filter ? items.filter((item) => item.category === filter) : items;

  const sortedItems = [...filteredItems].sort((a, b) =>
    sortAscending ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  return (
    <div className="app">
      <h1>Inventory Management</h1>

      {/* Add Item Section */}
      <div className="add-item">
        <h2>Add New Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Filter and Sort Section */}
      <div className="filter-sort">
        <h2>Filter and Sort</h2>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={() => setSortAscending(!sortAscending)}>
          Sort by Quantity ({sortAscending ? 'Ascending' : 'Descending'})
        </button>
      </div>

      {/* Items Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleEditItem(item.id, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.category}
                  onChange={(e) => handleEditItem(item.id, 'category', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleEditItem(item.id, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
