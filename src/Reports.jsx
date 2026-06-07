import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Reports.css';

const Reports = ({ currency, formatPrice }) => {
  // Récupération des données réelles
  const incomes = useMemo(() => JSON.parse(localStorage.getItem('incomes')) || [], []);
  const expenses = useMemo(() => JSON.parse(localStorage.getItem('expenses')) || [], []);

  // Calculs des totaux (base USD)
  const totalIncomeUSD = incomes.reduce((acc, curr) => acc + (curr.currency === 'CDF' ? curr.amount / 2800 : curr.amount), 0);
  const totalExpensesUSD = expenses.reduce((acc, curr) => acc + (curr.currency === 'CDF' ? curr.amount / 2800 : curr.amount), 0);
  const balanceUSD = totalIncomeUSD - totalExpensesUSD;
  const savingsRate = totalIncomeUSD > 0 ? ((totalIncomeUSD - totalExpensesUSD) / totalIncomeUSD) * 100 : 0;

  // Fusion et tri des transactions par date
  const allTransactions = useMemo(() => {
    const combined = [
      ...incomes.map(i => ({ ...i, type: 'income' })),
      ...expenses.map(e => ({ ...e, type: 'expense' }))
    ];
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [incomes, expenses]);

  return (
    <div className="reports-page page-padding">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="reports-header"
      >
        <div>
          <h1>Rapports Financiers</h1>
          <p>Consultez le résumé détaillé de votre activité mensuelle.</p>
        </div>
      </motion.div>

      {/* Résumé du Rapport */}
      <div className="report-summary-grid">
        <div className="report-stat-box glass">
          <span>Flux de revenus</span>
          <h3 className="text-primary">{formatPrice(totalIncomeUSD)}</h3>
        </div>
        <div className="report-stat-box glass">
          <span>Dépenses totales</span>
          <h3 className="text-error">{formatPrice(totalExpensesUSD)}</h3>
        </div>
        <div className="report-stat-box glass">
          <span>Capacité d'épargne</span>
          <h3>{formatPrice(balanceUSD)}</h3>
        </div>
        <div className="report-stat-box glass">
          <span>Santé financière</span>
          <h3 style={{ color: savingsRate > 20 ? 'var(--primary-color)' : '#f39c12' }}>
            {savingsRate.toFixed(1)}%
          </h3>
        </div>
      </div>

      {/* Tableau des transactions */}
      <div className="report-table-container glass">
        <div className="table-header">
          <h3>Détail des transactions</h3>
          <span className="transaction-count">{allTransactions.length} opérations au total</span>
        </div>
        
        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Désignation</th>
                <th>Catégorie</th>
                <th>Devise Origine</th>
                <th className="text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.length > 0 ? (
                allTransactions.map((tr) => (
                  <tr key={tr.id}>
                    <td className="date-cell">{tr.date}</td>
                    <td className="title-cell">
                      <span className={`type-indicator ${tr.type}`}></span>
                      {tr.title}
                    </td>
                    <td>{tr.category}</td>
                    <td>{tr.currency}</td>
                    <td className={`amount-cell text-right ${tr.type === 'income' ? 'text-primary' : 'text-error'}`}>
                      {tr.type === 'income' ? '+' : '-'}
                      {tr.currency === 'USD' ? `$${tr.amount.toLocaleString()}` : `${tr.amount.toLocaleString()} FC`}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data-cell">Aucune transaction enregistrée pour ce rapport.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;