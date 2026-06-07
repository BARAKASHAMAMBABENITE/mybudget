import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Expense.css';

const Expense = ({ currency, formatPrice, toggleCurrency }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Alimentation',
    date: new Date().toISOString().split('T')[0],
    entryCurrency: 'USD',
  });

  const [filterCategory, setFilterCategory] = useState('Toutes');

  const categories = ['Alimentation', 'Logement', 'Transport', 'Loisirs', 'Santé', 'Autres'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    const newExpense = {
      id: Date.now(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      currency: formData.entryCurrency,
      category: formData.category,
      date: formData.date,
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setFormData({
      title: '',
      amount: '',
      category: 'Alimentation',
      date: new Date().toISOString().split('T')[0],
      entryCurrency: 'USD',
    });
  };

  const totalInUSD = expenses.reduce((sum, item) => {
    const amountInUSD = item.currency === 'CDF' ? item.amount / 2800 : item.amount;
    return sum + amountInUSD;
  }, 0);

  const filteredExpenses = filterCategory === 'Toutes' 
    ? expenses 
    : expenses.filter(exp => exp.category === filterCategory);

  return (
    <div className="expense-page page-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="expense-header"
      >
        <div>
          <h1>Gestion des Dépenses</h1>
          <p>Gardez un œil sur vos sorties d'argent et optimisez votre budget.</p>
        </div>
        <div className="expense-header-actions">
          <button className="currency-converter-btn glass" onClick={toggleCurrency}>
            <FontAwesomeIcon icon={['fas', currency === 'USD' ? 'dollar-sign' : 'money-bill-1']} />
            <span>Passer en {currency === 'USD' ? 'FC' : 'USD'}</span>
          </button>
          <div className="total-expense-card glass">
            <span>Total des Dépenses</span>
            <h2>{formatPrice(totalInUSD)}</h2>
          </div>
        </div>
      </motion.div>

      <div className="expense-grid">
        <div className="expense-form-container glass">
          <h3>Ajouter une dépense</h3>
          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label>Titre</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Ex: Restaurant" required />
            </div>
            <div className="form-group">
              <label>Montant</label>
              <div className="amount-input-group">
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" required />
                <select name="entryCurrency" value={formData.entryCurrency} onChange={handleChange} className="currency-select-inline">
                  <option value="USD">USD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Enregistrer la dépense</button>
          </form>
        </div>

        <div className="expense-list-container glass">
          <div className="list-header">
            <h3>Historique des sorties</h3>
            <div className="filter-group">
              <FontAwesomeIcon icon={['fas', 'filter']} className="filter-icon" />
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
                <option value="Toutes">Toutes les catégories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>
          
          <div className="expense-list">
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((item) => (
                <motion.div key={item.id} className="expense-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="expense-info">
                    <strong>{item.title}</strong>
                    <span>{item.category} • {item.date}</span>
                  </div>
                  <div className="expense-amount text-error">
                    {item.currency === 'CDF' 
                      ? `-${item.amount.toLocaleString()} FC` 
                      : `-$${item.amount.toLocaleString()}`}
                    <small className="conversion-hint">
                       ≈ {formatPrice(item.currency === 'CDF' ? item.amount / 2800 : item.amount)}
                    </small>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-data">Aucune dépense trouvée pour cette catégorie.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;