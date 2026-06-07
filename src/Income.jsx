import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Income.css';

const Income = ({ currency, formatPrice, toggleCurrency }) => {
  const [incomes, setIncomes] = useState(() => {
    const saved = localStorage.getItem('incomes');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Salaire',
    date: new Date().toISOString().split('T')[0],
    entryCurrency: 'USD',
  });

  const categories = ['Salaire', 'Freelance', 'Vente', 'Cadeau', 'Autres'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    const newIncome = {
      id: Date.now(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      currency: formData.entryCurrency,
      category: formData.category,
      date: formData.date,
    };

    const updatedIncomes = [newIncome, ...incomes];
    setIncomes(updatedIncomes);
    localStorage.setItem('incomes', JSON.stringify(updatedIncomes));
    setFormData({
      title: '',
      amount: '',
      category: 'Salaire',
      date: new Date().toISOString().split('T')[0],
      entryCurrency: 'USD',
    });
  };

  // On convertit tout en USD pour le calcul du total global (base de référence)
  const totalInUSD = incomes.reduce((sum, item) => {
    const amountInUSD = item.currency === 'CDF' ? item.amount / 2800 : item.amount;
    return sum + amountInUSD;
  }, 0);

  return (
    <div className="income-page page-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="income-header"
      >
        <div>
          <h1>Gestion des Revenus</h1>
          <p>Suivez et catégorisez vos entrées d'argent.</p>
        </div>
        <div className="income-header-actions">
          <button className="currency-converter-btn glass" onClick={toggleCurrency} title="Changer la devise">
            <FontAwesomeIcon icon={['fas', currency === 'USD' ? 'dollar-sign' : 'money-bill-1']} />
            <span>Passer en {currency === 'USD' ? 'FC' : 'USD'}</span>
          </button>
          <div className="total-income-card glass">
            <span>Total des Revenus</span>
            <h2>{formatPrice(totalInUSD)}</h2>
          </div>
        </div>
      </motion.div>

      <div className="income-grid">
        {/* Formulaire d'ajout */}
        <div className="income-form-container glass">
          <h3>Ajouter un revenu</h3>
          <form onSubmit={handleSubmit} className="income-form">
            <div className="form-group">
              <label>Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Salaire Mybudget"
                required
              />
            </div>
            <div className="form-group">
              <label>Montant</label>
              <div className="amount-input-group">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
                <select 
                  name="entryCurrency" 
                  value={formData.entryCurrency} 
                  onChange={handleChange}
                  className="currency-select-inline"
                >
                  <option value="USD">USD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Ajouter le revenu
            </button>
          </form>
        </div>

        {/* Liste des revenus */}
        <div className="income-list-container glass">
          <h3>Historique des entrées</h3>
          <div className="income-list">
            {incomes.length > 0 ? (
              incomes.map((item) => (
                <motion.div
                  key={item.id}
                  className="income-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="income-info">
                    <strong>{item.title}</strong>
                    <span>{item.category} • {item.date}</span>
                  </div>
                  <div className="income-amount text-success">
                    {item.currency === 'CDF' 
                      ? `+${item.amount.toLocaleString()} FC` 
                      : `+$${item.amount.toLocaleString()}`}
                    <small style={{ display: 'block', fontSize: '0.7rem', opacity: 0.6 }}>
                       ≈ {formatPrice(item.currency === 'CDF' ? item.amount / 2800 : item.amount)}
                    </small>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-data">Aucun revenu enregistré.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;