import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Statistics.css';

const Statistics = ({ currency, formatPrice, toggleCurrency }) => {
  // Données mockées pour la démonstration analytique
  const statsData = {
    monthlySummary: {
      income: 12500,
      expenses: 8400,
      savings: 4100,
      savingsRate: 32.8
    },
    topCategories: [
      { name: 'Logement', amount: 3200, percentage: 38 },
      { name: 'Alimentation', amount: 1800, percentage: 21 },
      { name: 'Transport', amount: 1200, percentage: 14 },
      { name: 'Loisirs', amount: 950, percentage: 11 },
      { name: 'Autres', amount: 1250, percentage: 16 },
    ]
  };

  return (
    <div className="statistics-page page-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="statistics-header"
      >
        <div>
          <h1>Analyses & Statistiques</h1>
          <p>Visualisez vos performances financières et optimisez votre stratégie d'épargne.</p>
        </div>
        <button className="currency-converter-btn glass" onClick={toggleCurrency}>
          <FontAwesomeIcon icon={['fas', currency === 'USD' ? 'dollar-sign' : 'money-bill-1']} />
          <span>Passer en {currency === 'USD' ? 'FC' : 'USD'}</span>
        </button>
      </motion.div>

      {/* Résumé Analytique */}
      <div className="stats-summary-grid">
        <motion.div whileHover={{ y: -5 }} className="analytics-card glass">
          <span className="card-label">Bénéfice Net Mensuel</span>
          <h2 className="text-primary">{formatPrice(statsData.monthlySummary.savings)}</h2>
          <p className="card-trend text-primary">
            <FontAwesomeIcon icon={['fas', 'arrow-up']} /> +12.5% par rapport au mois dernier
          </p>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} className="analytics-card glass">
          <span className="card-label">Taux d'Épargne Global</span>
          <h2 style={{ color: 'var(--secondary-color)' }}>{statsData.monthlySummary.savingsRate}%</h2>
          <div className="mini-progress-bar">
            <div className="fill" style={{ width: `${statsData.monthlySummary.savingsRate}%` }}></div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="analytics-card glass">
          <span className="card-label">Budget Quotidien Recommandé</span>
          <h2>{formatPrice(statsData.monthlySummary.expenses / 30)}</h2>
          {statsData.monthlySummary.savingsRate < 20 ? (
            <p className="card-trend text-error">
              <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} /> Attention aux extras
            </p>
          ) : (
            <p className="card-trend text-primary">
              <FontAwesomeIcon icon={['fas', 'check-circle']} /> Budget bien maîtrisé
            </p>
          )}
        </motion.div>
      </div>

      <div className="statistics-main-grid">
        {/* Graphique de comparaison (Placeholder animé) */}
        <div className="analytics-main-chart glass">
          <div className="chart-header-flex">
            <h3>Comparaison Flux : Revenus vs Dépenses</h3>
            <div className="chart-legend">
               <span><i className="dot income"></i> Revenus</span>
               <span><i className="dot expenses"></i> Dépenses</span>
            </div>
          </div>
          <div className="chart-placeholder-large">
            <div className="chart-bars-container">
               {[60, 80, 45, 90, 70, 85].map((val, i) => (
                 <div key={i} className="chart-bar-group">
                   <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} className="bar-inc" transition={{ delay: i * 0.1 }} />
                   <motion.div initial={{ height: 0 }} animate={{ height: `${val * 0.65}%` }} className="bar-exp" transition={{ delay: i * 0.1 + 0.2 }} />
                 </div>
               ))}
            </div>
            <div className="chart-labels">
              <span>Oct</span><span>Nov</span><span>Déc</span><span>Jan</span><span>Fév</span><span>Mar</span>
            </div>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div className="category-distribution glass">
          <h3>Répartition des Dépenses</h3>
          <div className="category-list">
            {statsData.topCategories.map((cat, index) => (
              <div key={index} className="category-row">
                <div className="cat-info">
                  <span>{cat.name}</span>
                  <strong>{formatPrice(cat.amount)}</strong>
                </div>
                <div className="cat-progress">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${cat.percentage}%` }} className="cat-fill"></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;