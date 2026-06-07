import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'danger',
      title: 'Dépassement de budget',
      message: 'Attention, vous avez dépassé votre budget "Loisirs" de 150$. Pensez à limiter vos sorties cette semaine.',
      date: 'Il y a 2 heures',
      icon: 'triangle-exclamation',
      unread: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Objectif atteint !',
      message: 'Félicitations ! Votre épargne pour "Nouvel Ordinateur" est maintenant complète à 100%.',
      date: 'Hier',
      icon: 'circle-check',
      unread: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Alerte dépense élevée',
      message: 'Une transaction de 450,000 FC a été détectée. S\'agit-il bien d\'une dépense prévue ?',
      date: 'Il y a 2 jours',
      icon: 'bell',
      unread: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="notifications-page page-padding">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="notifications-header"
      >
        <div>
          <h1>Centre de Notifications</h1>
          <p>Restez informé des mouvements importants sur votre compte.</p>
        </div>
        <button className="btn-secondary" onClick={markAllAsRead}>Tout marquer comme lu</button>
      </motion.div>

      <div className="notifications-list">
        <AnimatePresence>
          {notifications.map((note) => (
            <motion.div 
              key={note.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`notification-item glass ${note.type} ${note.unread ? 'unread' : ''}`}
            >
              <div className="note-icon">
                <FontAwesomeIcon icon={['fas', note.icon]} />
              </div>
              <div className="note-content">
                <div className="note-title-row">
                  <h4>{note.title}</h4>
                  <span className="note-date">{note.date}</span>
                </div>
                <p>{note.message}</p>
              </div>
              <button className="note-close" onClick={() => deleteNotification(note.id)}>
                <FontAwesomeIcon icon={['fas', 'xmark']} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="no-notifications glass">
            <FontAwesomeIcon icon={['fas', 'check-double']} size="3x" />
            <p>Toutes les notifications ont été traitées !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;