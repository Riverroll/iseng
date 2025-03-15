// src/app/components/ProfileAnimation.tsx
"use client"
import { useState } from 'react';
import styles from './ProfileAnimation.module.css';

export default function ProfileAnimation() {
  const [isJumping, setIsJumping] = useState(false);

  const handleClick = () => {
    if (!isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1500);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={`${styles.profile} ${isJumping ? styles.jump : ''}`} onClick={handleClick}>
        <div className={styles.front}>
          <div className={styles.photoWrapper}>
            <img 
              src="/images/profilephoto.jpg" 
              alt="Profile" 
              className={styles.photo}
            />
          </div>
        </div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
}