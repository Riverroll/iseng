// src/app/components/SpaceAnimation.tsx
"use client"
import { useEffect, useRef } from 'react';
import styles from './SpaceHero.module.css';

export default function SpaceAnimation() {
  return (
    <div className={styles.spaceContainer}>
      <div className={styles.profile}>
        <div className={styles.front}>
          <div className={styles.photoWrapper}>
            <img 
              src="/images/profilephoto.jpg" 
              alt="Profile" 
              className={styles.photo}
            />
          </div>
        </div>
        <div className={styles.glow}></div>
      </div>
      
      <div className={styles.rocket}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 2C9 2 4 6 4 11.5V20L7 17H12.5C18 17 18 2 12.5 2Z" fill="#f0f0f0" />
          <path d="M13 4.5C13 4.5 17 8.5 17 11.5" stroke="#888" strokeWidth="1" />
          <circle cx="9.5" cy="10.5" r="1.5" fill="#4a4a4a" />
        </svg>
        <div className={styles.rocketTrail}></div>
      </div>
    </div>
  );
}