import React, { useEffect, useRef } from 'react';
import styles from '../style/Timer.module.css';

export const CountdownTimer = ({ initialTime, phase, onComplete }) => {
    // Use useRef for the time tracking to avoid re-renders affecting the interval
    const timeLeftRef = useRef(initialTime);
    const [displayTime, setDisplayTime] = React.useState(initialTime);
    const intervalRef = useRef(null);

    // Reset timer when initialTime or phase changes
    useEffect(() => {
        console.log(`Timer reset with ${initialTime} seconds for phase: ${phase}`);
        timeLeftRef.current = initialTime;
        setDisplayTime(initialTime);

        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Start new countdown
        const startTime = Date.now();
        intervalRef.current = setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            const newTime = initialTime - elapsedSeconds;

            if (newTime <= 0) {
                clearInterval(intervalRef.current);
                setDisplayTime(0);
                if (onComplete) onComplete();
            } else {
                setDisplayTime(newTime);
            }
        }, 100); // Update more frequently for smoother countdown

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [initialTime, phase, onComplete]);

    const minutes = String(Math.floor(displayTime / 60)).padStart(2, '0');
    const seconds = String(displayTime % 60).padStart(2, '0');

    const getPhaseStyle = () => {
        switch (phase) {
            case 'betting':
                return styles.bettingPhase;
            case 'cardDealing':
                return styles.dealingPhase;
            case 'completed':
                return styles.completedPhase;
            default:
                return '';
        }
    };

    return (
        <div className={`${styles.timer} ${getPhaseStyle()}`}>
            {minutes}:{seconds}
        </div>
    );
};
