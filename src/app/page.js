'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';
import Modal from 'react-modal';
import FastingCalculatorForm from '../components/FastingCalculatorForm';
import styles from './page.module.css';

Modal.setAppElement('#root');

export default function Home() {
  console.log('Home component rendering');

  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const handleCalculation = (calculatedResult) => {
    console.log('Calculation result:', calculatedResult);
    setResult(calculatedResult);
    setShowConfetti(true);
    setModalIsOpen(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const toggleUnit = () => {
    setIsMetric(!isMetric);
  };

  return (
    <div className={styles.container}>
      {showConfetti && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
        />
      )}
      <motion.main
        className={styles.main}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FaCalculator className={styles.icon} /> Intermittent Fasting Calculator
        </motion.h1>
        <div className={styles.unitToggle}>
          <button
            className={`${styles.unitButton} ${isMetric ? styles.activeUnit : ''}`}
            onClick={toggleUnit}
          >
            Metric
          </button>
          <button
            className={`${styles.unitButton} ${!isMetric ? styles.activeUnit : ''}`}
            onClick={toggleUnit}
          >
            Imperial
          </button>
        </div>
        <FastingCalculatorForm onCalculate={handleCalculation} isMetric={isMetric} />
      </motion.main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Calculation Result"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2 className={styles.modalTitle}>Estimated Weight Loss</h2>
        <p className={styles.modalResult}>{result} {isMetric ? 'kg' : 'lbs'} per month</p>
        <button onClick={() => setModalIsOpen(false)} className={styles.modalButton}>Close</button>
      </Modal>
      <footer className={styles.footer}>
        Built live with Claude by <a href="https://x.com/Must_be_Ash" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>@must_be_Ash</a>
      </footer>
    </div>
  );
}