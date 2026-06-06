import React, { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import './index.css';

// Initialisation de la bibliothèque d'icônes
library.add(fas, fab);

const allServices = [
  {
    id: 'planification',
    icon: ['fas', 'chart-line'],
    title: 'Planification Mensuelle',
    description: 'Optimisez vos flux financiers mensuels pour réduire les dépenses superflues. Nous créons des budgets sur mesure qui s\'adaptent à votre style de vie.',
  },
  {
    id: 'audit',
    icon: ['fas', 'lightbulb'],
    title: 'Audit de Trésorerie',
    description: 'Une analyse profonde de vos comptes pour identifier chaque fuite d\'argent et transformer vos dettes en opportunités d\'investissement.',
  },
  {
    id: 'fiscale',
    icon: ['fas', 'money-bill-wave'],
    title: 'Optimisation Fiscale',
    description: 'Réduisez vos impôts légalement grâce à une structuration budgétaire intelligente et des conseils en placements défiscalisés.',
  },
  {
    id: 'coaching',
    icon: ['fas', 'laptop-code'],
    title: 'Coaching en Épargne',
    description: 'Apprenez les meilleures techniques pour constituer un fonds d\'urgence et une épargne de projet sans vous priver au quotidien.',
  },
  {
    id: 'patrimoine',
    icon: ['fas', 'users-cog'], 
    title: 'Gestion de Patrimoine',
    description: 'Préparez votre avenir et celui de vos proches avec une stratégie de croissance patrimoniale équilibrée et sécurisée.',
  },
  {
    id: 'entreprises',
    icon: ['fas', 'globe'], 
    title: 'Audit pour Entreprises',
    description: 'Spécialisé pour les PME : nous optimisons vos coûts opérationnels pour maximiser votre rentabilité dès le premier trimestre.',
  },
];

// Composant de la section Services Cards (déplacé pour être utilisé dans App)
const ServicesCards = () => (
  <section className="services-grid page-padding">
    <motion.div
      className="service-card small"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Comment ça marche ?</h3>
      <p>3 étapes simples vers la stabilité.</p>
    </motion.div>
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="icon"><FontAwesomeIcon icon={['fas', 'chart-bar']} /></div>
      <h4>Analyse des Dépenses</h4>
    </motion.div>
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="icon"><FontAwesomeIcon icon={['fas', 'lightbulb']} /></div>
      <h4>Planification d'Épargne</h4>
    </motion.div>
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="icon"><FontAwesomeIcon icon={['fas', 'money-bill-wave']} /></div>
      <h4>Conseil en Investissement</h4>
    </motion.div>
  </section>
);

// Nouveau composant pour la section "Pourquoi nous choisir"
const WhyChooseUs = () => (
  <section className="why-choose-us-section page-padding">
    <motion.span 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      className="subtitle"
    >
      Pourquoi choisir Mybudget ?
    </motion.span>
    <motion.h2 
      initial={{ y: 20, opacity: 0 }} 
      whileInView={{ y: 0, opacity: 1 }}
    >
      Votre succès financier est notre priorité
    </motion.h2>
    <div className="why-choose-us-grid">
      <motion.div whileHover={{ scale: 1.05 }} className="feature-card glass">
        <FontAwesomeIcon icon={['fas', 'shield-alt']} className="feature-icon" />
        <h3>Sécurité Totale</h3>
        <p>Données chiffrées et confidentialité absolue pour votre sérénité.</p>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} className="feature-card glass">
        <FontAwesomeIcon icon={['fas', 'chart-pie']} className="feature-icon" />
        <h3>Visualisation 360°</h3>
        <p>Graphiques modernes pour une compréhension instantanée de vos flux.</p>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} className="feature-card glass">
        <FontAwesomeIcon icon={['fas', 'hand-holding-usd']} className="feature-icon" />
        <h3>Accompagnement</h3>
        <p>Des outils intelligents pour transformer vos habitudes financières.</p>
      </motion.div>
    </div>
  </section>
);

// Nouveau composant pour la FAQ
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Qu'est-ce que la gestion budgétaire ?",
      answer: "La gestion budgétaire est le processus de planification et de contrôle de vos revenus et dépenses. Elle vous aide à atteindre vos objectifs financiers, à éviter les dettes et à épargner pour l'avenir."
    },
    {
      question: "Comment Mybudget peut m'aider ?",
      answer: "Mybudget vous offre des outils d'analyse, des conseils personnalisés et des stratégies d'épargne pour optimiser votre budget, réduire vos dépenses inutiles et augmenter votre capacité d'investissement."
    },
    {
      question: "Est-ce que mes données sont sécurisées ?",
      answer: "Absolument. Nous utilisons des protocoles de sécurité avancés et le chiffrement de bout en bout pour garantir la confidentialité et la sécurité de toutes vos informations financières."
    },
    {
      question: "Puis-je utiliser Mybudget pour mon entreprise ?",
      answer: "Oui, nos services d'audit et de conseil Mybudget sont également adaptés aux entreprises pour optimiser leur rentabilité."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section page-padding">
      <span className="subtitle">Questions Fréquentes</span>
      <h2>Vos interrogations, nos réponses</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <FontAwesomeIcon icon={['fas', openIndex === index ? 'minus' : 'plus']} />
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Composant de la page d'accueil (maintenant avec les sections)
const HomePageContent = ({ onStartBudget, onWatchVideo }) => (
  <>
    <div className="hero-image-container">
      <div className="hero-image-bg"></div>
      <div className="image-overlay-gradient"></div>
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="welcome-actions-video"
      >
        <span className="subtitle-bright">Bienvenue chez Mybudget</span>
        <h1>Prenez le contrôle de vos finances dès aujourd'hui</h1>
        <p>Découvrez une manière simplifiée et intelligente de gérer votre argent avec nos outils d'analyse et de coaching.</p>
        <div className="hero-actions-center">
          <button className="btn-primary-glow" onClick={onStartBudget}>Commencer mon bilan</button>
          <button className="btn-play-modern" onClick={onWatchVideo}><span>▶</span> Voir la démo</button>
        </div>
      </motion.section>
    </div>
    <ServicesCards />
    <WhyChooseUs />
    <FAQSection />
  </>
);

// Composant de la page À Propos
const About = () => (
  <div className="about-page">
    <section className="page-header">
      <h1>À propos de Mybudget</h1>
      <p>Découvrez notre parcours, nos valeurs et les experts qui font de votre réussite financière une réalité.</p>
    </section>
    
    <section className="about-details page-padding">
      <div className="about-grid">
        <div className="about-text">
          <span className="subtitle">Qui sommes-nous</span>
          <h2>Votre partenaire stratégique pour la sérénité financière</h2>
          <p>Fondée en 2010, Mybudget est à l'avant-garde du conseil budgétaire, aidant les particuliers et les entreprises à relever les défis financiers complexes. Notre équipe pluridisciplinaire réunit des décennies d'expérience en finance et gestion de patrimoine.</p>
          <p>Nous ne nous contentons pas de donner des conseils ; nous vous accompagnons dans la mise en œuvre de solutions concrètes qui génèrent des résultats mesurables et une stabilité à long terme.</p>
        </div>
        <div className="about-img">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Consulting team" />
        </div>
      </div>
    </section>

    <section className="values-section page-padding">
      <h2 className="section-title">Nos Valeurs Fondamentales</h2>
      <div className="values-grid">
        <div className="value-card">
          <FontAwesomeIcon icon={['fas', 'award']} className="value-icon" />
          <h3>Excellence</h3>
          <p>Nous nous engageons à fournir la plus haute qualité dans chaque analyse budgétaire.</p>
        </div>
        <div className="value-card">
          <FontAwesomeIcon icon={['fas', 'handshake']} className="value-icon" />
          <h3>Intégrité</h3>
          <p>La transparence et l'éthique sont au cœur de nos relations avec nos clients.</p>
        </div>
        <div className="value-card">
          <FontAwesomeIcon icon={['fas', 'rocket']} className="value-icon" />
          <h3>Innovation</h3>
          <p>Nous cherchons constamment de nouvelles méthodes pour optimiser votre épargne.</p>
        </div>
      </div>
    </section>

    <section className="team-section page-padding">
      <h2 className="section-title">Rencontrez Nos Experts</h2>
      <div className="team-grid">
        <div className="team-card">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" alt="CEO" />
          <h4>Marc Henderson</h4>
          <span>Directeur Général</span>
        </div>
        <div className="team-card">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" alt="Strategy" />
          <h4>Élise Rodriguez</h4>
          <span>Stratège Budgétaire</span>
        </div>
        <div className="team-card">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" alt="Finance" />
          <h4>Thomas Thorne</h4>
          <span>Conseiller financier</span>
        </div>
      </div>
    </section>
  </div>
);

// Composant de la page Services
const Services = ({ searchTerm }) => {
  const filteredServices = allServices.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div className="services-page">
    <section className="page-header">
      <h1>Nos Services</h1>
      <p>Des solutions d'expertise budgétaire adaptées à vos besoins spécifiques.</p>
    </section>
    
    <section className="services-list page-padding">
      <motion.div
        className="services-detailed-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-detail-card"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/services/${service.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <FontAwesomeIcon icon={service.icon} className="service-icon" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span style={{ color: 'var(--primary-color)', marginTop: '10px', display: 'block' }}>Voir les détails →</span>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="no-results">Aucun service ne correspond à votre recherche.</p>
        )}
      </motion.div>
    </section>
  </div>
);
};

// Composant de la page de détails d'un service
const ServiceDetail = () => {
  const { id } = useParams();
  const service = allServices.find(s => s.id === id);

  if (!service) return <div className="page-padding"><h2>Service non trouvé</h2></div>;

  return (
    <div className="service-detail-page page-padding">
      <div className="about-grid">
        <div className="about-text">
          <FontAwesomeIcon icon={service.icon} className="service-icon" style={{ fontSize: '4rem' }} />
          <h1>{service.title}</h1>
          <p className="service-description-large">{service.description}</p>
          <p>Nos experts Mybudget vous accompagnent pas à pas pour mettre en œuvre cette solution et garantir votre succès financier. Chaque plan est personnalisé selon vos revenus et vos objectifs de vie.</p>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>Discuter avec un conseiller</Link>
        </div>
        <div className="about-img">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&w=800&q=80" 
            alt={service.title} 
          />
        </div>
      </div>
    </div>
  );
};

// Composant du formulaire de contact
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'adresse email est invalide';
    }
    if (!formData.message) newErrors.message = 'Le message est requis';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Ici, vous enverriez les données à un backend
      console.log('Formulaire soumis:', formData);
      setIsSubmitted(true);
      // Réinitialiser le formulaire après soumission réussie
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="contact-form-container page-padding">
      <h2>Contactez-nous</h2>
      {isSubmitted && <p className="success-message">Merci pour votre message ! Nous reviendrons vers vous très bientôt.</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group"><label htmlFor="name">Nom :</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'input-error' : ''} /><p className="error-message">{errors.name}</p></div>
        <div className="form-group"><label htmlFor="email">Email:</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} /><p className="error-message">{errors.email}</p></div>
        <div className="form-group"><label htmlFor="message">Message :</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} className={errors.message ? 'input-error' : ''}></textarea><p className="error-message">{errors.message}</p></div>
        <button type="submit" className="btn-primary">Envoyer le message</button>
      </form>
    </div>
  );
};

// Composant de la page Tableau de Bord (Dashboard)
const Dashboard = () => {
  const savedData = JSON.parse(localStorage.getItem('budgetData')) || { revenus: 0, depenses: 0, objectifs: 0 };
  const rev = parseFloat(savedData.revenus) || 0;
  const dep = parseFloat(savedData.depenses) || 0;
  const epargne = rev - dep;
  
  // Calcul du graphique (Donut)
  const total = rev > 0 ? rev : 1;
  const depPercentage = Math.min((dep / total) * 100, 100);
  const strokeDash = (depPercentage * 251.2) / 100; // 251.2 est la circonférence pour r=40
  
  return (
    <div className="dashboard-page page-padding">
      <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>Votre Santé Financière</motion.h1>
      <p>Bienvenue sur votre espace personnel. Voici vos résultats réels basés sur votre dernier bilan.</p>
      <div className="dashboard-widgets">
        <div className="widget glass">
          <h3>Résumé Budgétaire Réel</h3>
          <div className="chart-flex">
            <div className="chart-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#334d57" strokeWidth="10" fill="transparent" />
                <motion.circle 
                  cx="50" cy="50" r="40" stroke="var(--primary-color)" strokeWidth="10" fill="transparent"
                  strokeDasharray="251.32"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.32 - strokeDash }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
                <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{Math.round(depPercentage)}%</text>
              </svg>
              <p className="chart-label">Dépenses / Revenus</p>
            </div>
            <div className="stats">
              <p>Revenus: <span>${rev}</span></p>
              <p>Dépenses: <span>${dep}</span></p>
              <p>Épargne actuelle: <span style={{ color: epargne >= 0 ? 'var(--primary-color)' : '#e74c3c' }}>${epargne}</span></p>
            </div>
          </div>
        </div>
        <div className="widget glass">
          <h3>Objectifs d'Épargne</h3>
          <p>Cible mensuelle: <span>${savedData.objectifs || 0}</span></p>
          <p>Statut: <span>{epargne >= (savedData.objectifs || 0) ? 'Objectif atteint !' : 'En progression...'}</span></p>
          <div className="progress-bar-bg">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((epargne / (parseFloat(savedData.objectifs) || 1)) * 100, 100)}%` }}
            ></motion.div>
          </div>
        </div>
        <div className="widget glass">
          <h3>Conseils Personnalisés</h3>
          <p>{epargne < 0 ? "Attention, vos dépenses dépassent vos revenus. Un audit de trésorerie est recommandé." : "Bonne gestion ! Vous pourriez investir votre excédent de $" + epargne + " pour faire croître votre capital."}</p>
        </div>
      </div>
    </div>
  );
};

// Nouveau composant Page Historique
const HistoryPage = () => {
  const history = JSON.parse(localStorage.getItem('budgetHistory')) || [];

  return (
    <div className="history-page page-padding">
      <div className="page-header-simple">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Historique d'Évolution</motion.h1>
        <p>Retrouvez vos anciens bilans Mybudget pour mesurer vos progrès.</p>
      </div>
      
      <div className="history-list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <motion.div 
              key={index} 
              className="history-item glass"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="history-date">
                <FontAwesomeIcon icon={['fas', 'calendar-alt']} /> {item.date}
              </div>
              <div className="history-stats">
                <span>Revenus: <strong className="text-success">${item.revenus}</strong></span>
                <span>Dépenses: <strong className="text-error">${item.depenses}</strong></span>
                <span className="history-epargne">Épargne: <strong className="text-primary">${(parseFloat(item.revenus) - parseFloat(item.depenses)).toFixed(2)}</strong></span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="no-results">Aucun historique disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
};

// Composant Modal pour le Bilan Budgétaire
const BudgetModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [budgetData, setBudgetData] = useState(() => {
    const savedData = localStorage.getItem('budgetData');
    return savedData ? JSON.parse(savedData) : { revenus: '', depenses: '', objectifs: '' };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData(prev => ({ ...prev, [name]: value }));
  };

  const saveBudget = () => {
    const date = new Date().toLocaleString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const newEntry = { ...budgetData, date };
    const history = JSON.parse(localStorage.getItem('budgetHistory')) || [];
    
    localStorage.setItem('budgetHistory', JSON.stringify([newEntry, ...history]));
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
    alert('Vos données budgétaires ont été sauvegardées !');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Commencer mon Bilan Budgétaire</h2>
        {step === 1 && (
          <div>
            <h3>Étape 1: Vos Revenus</h3>
            <div className="form-group">
              <label htmlFor="revenus">Revenus Mensuels (Net en $) :</label>
              <input type="number" id="revenus" name="revenus" value={budgetData.revenus} onChange={handleChange} placeholder="Ex: 2500" />
            </div>
            <button className="btn-primary" onClick={() => setStep(2)}>Suivant</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Étape 2: Vos Dépenses</h3>
            <div className="form-group">
              <label htmlFor="depenses">Dépenses Fixes Mensuelles ($) :</label>
              <input type="number" id="depenses" name="depenses" value={budgetData.depenses} onChange={handleChange} placeholder="Ex: 1500" />
            </div>
            <button className="btn-secondary" onClick={() => setStep(1)}>Précédent</button>
            <button className="btn-primary" onClick={() => setStep(3)}>Suivant</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3>Étape 3: Vos Objectifs</h3>
            <div className="form-group">
              <label htmlFor="objectifs">Objectifs d'Épargne ($ / mois) :</label>
              <input type="number" id="objectifs" name="objectifs" value={budgetData.objectifs} onChange={handleChange} placeholder="Ex: 300" />
            </div>
            <button className="btn-secondary" onClick={() => setStep(2)}>Précédent</button>
            <button className="btn-primary" onClick={saveBudget}>Terminer & Sauvegarder</button>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant Modal pour la Vidéo Tutoriel
const VideoModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content video-modal-content">
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>Tutoriel d'Orientation Mybudget</h2>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Exemple de vidéo YouTube (Rick Astley)
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="video-note">Cette vidéo vous guidera à travers les fonctionnalités clés de notre plateforme.</p>
    </div>
  </div>
);

// Composant Modal pour le Devis
const QuoteModal = ({ onClose }) => {
  const [quoteData, setQuoteData] = useState({
    service: '',
    budget: '',
    details: '',
  });
  const [quoteResult, setQuoteResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData(prev => ({ ...prev, [name]: value }));
  };

  const generateQuote = (e) => {
    e.preventDefault();
    // Logique simple pour générer un devis basé sur les inputs
    const basePrice = 100;
    let estimatedCost = basePrice;
    let serviceDescription = "Conseil personnalisé";

    if (quoteData.service === "Planification Mensuelle") {
      estimatedCost += 50;
      serviceDescription = "Planification budgétaire mensuelle détaillée";
    } else if (quoteData.service === "Audit de Trésorerie") {
      estimatedCost += 150;
      serviceDescription = "Audit complet de trésorerie avec rapport";
    } else if (quoteData.service === "Optimisation Fiscale") {
      estimatedCost += 200;
      serviceDescription = "Optimisation fiscale et conseils en défiscalisation";
    }

    if (quoteData.budget && parseInt(quoteData.budget) > 1000) {
      estimatedCost += 50; // Complexité accrue pour budgets plus importants
    }

    setQuoteResult({
      service: serviceDescription,
      budgetIndicatif: quoteData.budget ? `$${quoteData.budget}` : 'Non spécifié',
      detailsDemande: quoteData.details || 'Aucun',
      coutEstime: `$${estimatedCost}`,
      delaiEstime: '5-7 jours ouvrés',
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Obtenir un Devis Personnalisé</h2>
        {!quoteResult ? (
          <form onSubmit={generateQuote} className="quote-form">
            <div className="form-group">
              <label htmlFor="service">Service souhaité :</label>
              <select id="service" name="service" value={quoteData.service} onChange={handleChange} required>
                <option value="">Sélectionnez un service</option>
                <option value="Planification Mensuelle">Planification Mensuelle</option>
                <option value="Audit de Trésorerie">Audit de Trésorerie</option>
                <option value="Optimisation Fiscale">Optimisation Fiscale</option>
                <option value="Coaching en Épargne">Coaching en Épargne</option>
                <option value="Gestion de Patrimoine">Gestion de Patrimoine</option>
                <option value="Audit pour Entreprises">Audit pour Entreprises</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget indicatif (mensuel en $) :</label>
              <input type="number" id="budget" name="budget" value={quoteData.budget} onChange={handleChange} placeholder="Ex: 1000" />
            </div>
            <div className="form-group">
              <label htmlFor="details">Détails supplémentaires :</label>
              <textarea id="details" name="details" value={quoteData.details} onChange={handleChange} placeholder="Décrivez vos besoins spécifiques..."></textarea>
            </div>
            <button type="submit" className="btn-primary">Générer le Devis</button>
          </form>
        ) : (
          <div className="quote-results">
            <h3>Votre Devis Estimatif</h3>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Détail</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Service</td><td>{quoteResult.service}</td></tr>
                <tr><td>Budget Indicatif</td><td>{quoteResult.budgetIndicatif}</td></tr>
                <tr><td>Détails de la demande</td><td>{quoteResult.detailsDemande}</td></tr>
                <tr><td>Coût Estimé</td><td>{quoteResult.coutEstime}</td></tr>
                <tr><td>Délai Estimé</td><td>{quoteResult.delaiEstime}</td></tr>
              </tbody>
            </table>
            <p className="quote-note">Ce devis est une estimation. Un conseiller vous contactera pour affiner votre besoin.</p>
            <button className="btn-primary" onClick={onClose}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">Mybudget</div>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/about">À Propos</Link>
          <Link to="/services">Services</Link>
          <Link to="/dashboard">Tableau de Bord</Link> {/* Nouveau lien */}
          <Link to="/history">Historique</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="navbar-actions">
          <div className="search-bar-container">
            <input 
              type="text" 
              placeholder="Rechercher un service..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-input" 
            />
            <FontAwesomeIcon icon={['fas', 'search']} className="search-icon" />
          </div>
        <button className="btn-gmail-nav">
          <FontAwesomeIcon icon={['fab', 'google']} />
        </button>
          <button className="btn-primary" onClick={() => setShowQuoteModal(true)}>Obtenir un devis</button>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePageContent onStartBudget={() => setShowBudgetModal(true)} onWatchVideo={() => setShowVideoModal(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services searchTerm={searchTerm} />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Nouvelle route */}
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>

      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Mybudget</h3>
            <p>Votre partenaire de confiance pour la liberté financière et la gestion saine de votre patrimoine.</p>
          </div>
          <div className="footer-col">
            <h4>Liens Rapides</h4>
            <Link to="/about">À Propos</Link>
            <Link to="/services">Services</Link>
            <Link to="/dashboard">Tableau de Bord</Link>
            <Link to="/history">Historique</Link>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>Email : benbarakashamba@gmail.com</p>
            <p>Téléphone : +243 986760178</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Mybudget. Tous droits réservés.</p>
        </div>
      </footer>

      {showBudgetModal && <BudgetModal onClose={() => setShowBudgetModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
      {showQuoteModal && <QuoteModal onClose={() => setShowQuoteModal(false)} />}
    </div>
  );
}

export default App;