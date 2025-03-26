import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../../../helper/socketService';
import styles from '../style/Timer.module.css';

export const GameTimer = ({ gameType, isValidGame }) => {
    const [timerData, setTimerData] = useState({
        label: '',
        currentTime: 0,
        duration: 0,
        timestamp: 0,
        isActive: false
    });

    // Adding a tick state to force periodic re-rendering
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const socket = connectSocket('timer');
        socket.emit('joinTimer', gameType);

        socket.on('timerUpdate', (data) => {
            console.log('Timer update received:', data);
            setTimerData({
                ...data,
                isActive: true
            });
        });

        return () => {
            disconnectSocket('timer');
        };
    }, [gameType]);

    // Set up an interval that triggers every second
    // Only set up the interval if the game is invalid
        useEffect(() => {
            if (!isValidGame) {
                const interval = setInterval(() => {
                    setTick(t => t + 1);
                }, 1000);
                return () => clearInterval(interval);
            }
        }, [isValidGame]);

    const getRemainingTime = () => {
        if (!timerData.isActive) return 0;

        const now = Date.now();
        const elapsed = now - timerData.timestamp;
        const remaining = Math.max(0, Math.ceil((timerData.duration - elapsed) / 1000));
        return remaining;
    };

    const getPhaseStyle = () => {
        switch (timerData.label) {
            case 'betting':
                return styles.bettingPhase;
            case 'dealing':
                return styles.dealingPhase;
            case 'completed':
                return styles.completedPhase;
            default:
                return '';
        }
    };

    const remainingTime = getRemainingTime();
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Calculate progress percentage etc. (same as before)
    const progress = timerData.duration
        ? ((timerData.duration - (remainingTime * 1000)) / timerData.duration) * 100
        : 0;
    const circumference = 2 * Math.PI * 45; // radius is 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className={`${styles.circularTimer} ${getPhaseStyle()}`}>
            <svg className={styles.progressRing} width="120" height="120">
                <circle
                    className={styles.progressRingCircleBg}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="8"
                    fill="transparent"
                    r="45"
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`${styles.progressRingCircle} ${getPhaseStyle()}`}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    r="45"
                    cx="60"
                    cy="60"
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: strokeDashoffset
                    }}
                />
            </svg>
            <div className={styles.timerContent}>
                <div className={styles.time}>{formattedTime}</div>
                <div className={styles.label}>{timerData.label}</div>
            </div>
        </div>
    );
};
