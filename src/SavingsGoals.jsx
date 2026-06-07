import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SavingsGoals.css';

const SavingsGoals = ({ currency, formatPrice, toggleCurrency }) => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('savingsGoals');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Fonds d\'urgence', target: 5000, current: 1200, startDate: '2026-01-01', deadline: '2026-12-31', currency: 'USD' },
      { id: 2, name: 'Nouvel Ordinateur', target: 2500, current: 800, startDate: '2026-03-01', deadline: '2026-08-15', currency: 'USD' }
    ];
  });

  const [formData, setFormData] = useState({
    name: '',
    target: '',
    current: '',
    startDate: new Date().toISOString().split('T')[0],
    deadline: '',
    entryCurrency: 'USD'
  });

  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(goals));
  }, [goals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.target || !formData.current) return;

    const newGoal = {
      id: Date.now(),
      name: formData.name,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current),
      startDate: formData.startDate,
      deadline: formData.deadline,
      currency: formData.entryCurrency
    };

    setGoals([newGoal, ...goals]);
    setFormData({ name: '', target: '', current: '', startDate: new Date().toISOString().split('T')[0], deadline: '', entryCurrency: 'USD' });
  };

  const calculateProgress = (current, target) => {
    const percentage = (current / target) * 100;
    return Math.min(percentage, 100).toFixed(1);
  };

  return (
    <div className="goals-page page-padding">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="goals-header"
      >
        <div>
          <h1>Objectifs d'Épargne</h1>
          <p>Planifiez vos projets et suivez votre progression vers la liberté financière.</p>
        </div>
        <button className="currency-converter-btn glass" onClick={toggleCurrency}>
          <FontAwesomeIcon icon={['fas', currency === 'USD' ? 'dollar-sign' : 'money-bill-1']} />
          <span>Passer en {currency === 'USD' ? 'FC' : 'USD'}</span>
        </button>
      </motion.div>

      <div className="goals-grid">
        {/* Formulaire */}
        <div className="goals-form-container glass">
          <h3>Nouvel Objectif</h3>
          <form onSubmit={handleSubmit} className="goals-form">
            <div className="form-group">
              <label>Nom du projet</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ex: Voyage, Maison..." required />
            </div>
            <div className="form-group">
              <label>Montant cible</label>
              <div className="amount-input-group">
                <input type="number" name="target" value={formData.target} onChange={handleChange} placeholder="0.00" required />
                <select name="entryCurrency" value={formData.entryCurrency} onChange={handleChange} className="currency-select-inline">
                  <option value="USD">USD</option>
                  <option value="CDF">CDF</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Épargne actuelle</label>
              <input type="number" name="current" value={formData.current} onChange={handleChange} placeholder="0.00" required />
            </div>
            <div className="form-group">
              <label>Date de début</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date limite</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Créer l'objectif</button>
          </form>
        </div>

        {/* Liste des objectifs */}
        <div className="goals-list">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            return (
              <motion.div 
                key={goal.id} 
                className="goal-card glass"
                whileHover={{ scale: 1.02 }}
              >
                <div className="goal-card-header">
                  <h4>{goal.name}</h4>
                  <div className="goal-dates">
                    <span className="goal-deadline">Début : {goal.startDate}</span>
                    <span className="goal-deadline">Fin : {goal.deadline}</span>
                  </div>
                </div>
                
                <div className="goal-amounts">
                  <div className="amount-box">
                    <span>Actuel</span>
                    <strong>{goal.currency === 'USD' ? `$${goal.current.toLocaleString()}` : `${goal.current.toLocaleString()} FC`}</strong>
                  </div>
                  <div className="amount-box text-right">
                    <span>Cible</span>
                    <strong>{goal.currency === 'USD' ? `$${goal.target.toLocaleString()}` : `${goal.target.toLocaleString()} FC`}</strong>
                  </div>
                </div>

                <div className="goal-progress-container">
                  <div className="goal-progress-bar">
                    <motion.div 
                      className="goal-progress-fill" 
                      initial={{ width: 0 }} 
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="goal-percentage">{progress}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals;