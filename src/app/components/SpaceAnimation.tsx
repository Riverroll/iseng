"use client"
import Image from 'next/image';
import styles from './SpaceHero.module.css';

export default function SpaceAnimation() {
  return (
    <div className={styles.spaceContainer}>
      <div className={styles.profile}>
        <div className={styles.front}>
          <div className={styles.photoWrapper}>
            <Image 
              src="/images/profilephoto.JPG" 
              alt="Profile" 
              className={styles.photo}
              fill={true}
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%' 
              }}
              priority
            />
          </div>
        </div>
        <div className={styles.glow}></div>
      </div>
      
      <div className={styles.rocket}>
        <svg viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
          {/* Nose cone */}
          <path d="M20 2 L8 26 L32 26 Z" fill="#f1f5f9" />
          <path d="M20 5 L10 26 L30 26 Z" fill="#e2e8f0" />

          {/* Body */}
          <rect x="8" y="25" width="24" height="32" rx="3" fill="white" />

          {/* Body accent stripe */}
          <rect x="8" y="34" width="24" height="5" fill="#e2e8f0" />
          <rect x="8" y="46" width="24" height="5" fill="#e2e8f0" />

          {/* Flag decal */}
          <rect x="13" y="28" width="14" height="5" rx="1" fill="#3b82f6" opacity="0.7" />
          <rect x="13" y="28" width="5" height="5" rx="1" fill="#ef4444" opacity="0.8" />

          {/* Porthole */}
          <circle cx="20" cy="30" r="5.5" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="20" cy="30" r="3.5" fill="#7dd3fc" opacity="0.6" />
          <circle cx="18" cy="28.5" r="1.2" fill="white" opacity="0.8" />

          {/* Left fin */}
          <path d="M8 48 L0 68 L8 60 Z" fill="#cbd5e1" />
          <path d="M8 50 L2 66 L8 60 Z" fill="#94a3b8" />

          {/* Right fin */}
          <path d="M32 48 L40 68 L32 60 Z" fill="#cbd5e1" />
          <path d="M32 50 L38 66 L32 60 Z" fill="#94a3b8" />

          {/* Bottom nozzle */}
          <path d="M12 57 L28 57 L25 65 L15 65 Z" fill="#94a3b8" />
          <path d="M13 57 L27 57 L24 64 L16 64 Z" fill="#64748b" />

          {/* Engine bells */}
          <ellipse cx="15" cy="65" rx="4" ry="2" fill="#475569" />
          <ellipse cx="25" cy="65" rx="4" ry="2" fill="#475569" />
        </svg>
        <div className={styles.rocketTrail}></div>
      </div>
    </div>
  );
}