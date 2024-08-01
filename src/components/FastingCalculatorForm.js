'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaVenusMars, FaWeight, FaRulerVertical, FaRunning, FaClock } from 'react-icons/fa';
import styles from './FastingCalculatorForm.module.css';

const FastingCalculatorForm = ({ onCalculate, isMetric }) => {
  console.log('FastingCalculatorForm component rendering');

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    heightInches: '',
    activityLevel: '',
    fastingMethod: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const calculateWeightLoss = () => {
    console.log('Calculating weight loss');
    const { age, gender, weight, height, heightInches, activityLevel, fastingMethod } = formData;
    
    let bmr;
    const weightKg = isMetric ? parseFloat(weight) : parseFloat(weight) * 0.453592;
    let heightCm;
    if (isMetric) {
      heightCm = parseFloat(height);
    } else {
      const feet = parseFloat(height);
      const inches = parseFloat(heightInches) || 0;
      heightCm = (feet * 30.48) + (inches * 2.54);
    }

    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }

    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
    };

    const tdee = bmr * activityFactors[activityLevel];

    const fastingFactors = {
      '5:2': 0.7,
      '16/8': 0.85,
      'alternate': 0.6,
    };

    const estimatedDailyCaloricDeficit = tdee * (1 - fastingFactors[fastingMethod]);
    const estimatedMonthlyWeightLoss = (estimatedDailyCaloricDeficit * 30) / 7700;

    return isMetric ? estimatedMonthlyWeightLoss.toFixed(2) : (estimatedMonthlyWeightLoss * 2.20462).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const result = calculateWeightLoss();
    onCalculate(result);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}><FaUser className={styles.inputIcon} /> Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required className={styles.input} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="gender" className={styles.label}><FaVenusMars className={styles.inputIcon} /> Gender:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required className={styles.select}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="weight" className={styles.label}>
          <FaWeight className={styles.inputIcon} /> Weight ({isMetric ? 'kg' : 'lbs'}):
        </label>
        <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} required className={styles.input} step="0.1" />
      </div>
      {isMetric ? (
        <div className={styles.formGroup}>
          <label htmlFor="height" className={styles.label}>
            <FaRulerVertical className={styles.inputIcon} /> Height (cm):
          </label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} required className={styles.input} step="0.1" />
        </div>
      ) : (
        <div className={styles.formGroup}>
          <label htmlFor="height" className={styles.label}>
            <FaRulerVertical className={styles.inputIcon} /> Height:
          </label>
          <div className={styles.heightInputGroup}>
            <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} required className={styles.input} placeholder="Feet" step="0.1" />
            <input type="number" id="heightInches" name="heightInches" value={formData.heightInches} onChange={handleInputChange} className={styles.input} placeholder="Inches" step="0.1" />
          </div>
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="activityLevel" className={styles.label}><FaRunning className={styles.inputIcon} /> Activity Level:</label>
        <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} required className={styles.select}>
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light activity (1-3hrs/week)</option>
          <option value="moderate">Moderate activity (3-7hrs/week)</option>
          <option value="very">Very active (7+hrs/week)</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="fastingMethod" className={styles.label}><FaClock className={styles.inputIcon} /> Fasting Method:</label>
        <select id="fastingMethod" name="fastingMethod" value={formData.fastingMethod} onChange={handleInputChange} required className={styles.select}>
          <option value="">Select fasting method</option>
          <option value="5:2">5:2 Diet (fast 2 days a week)</option>
          <option value="16/8">16/8 (eat within 8 hours / fast 16 hours)</option>
          <option value="alternate">Alternate-day Fasting (eat one day / fast the next day)</option>
        </select>
      </div>
      <motion.button 
        type="submit" 
        className={styles.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Calculate
      </motion.button>
    </form>
  );
};

export default FastingCalculatorForm;