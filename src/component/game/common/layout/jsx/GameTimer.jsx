import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket } from '../../../helper/socketService';
import styles from '../style/Timer.module.css';

export const GameTimer = ({ gameType }) => {  // Add gameType prop
    const [timerData, setTimerData] = useState({
        label: '',
        currentTime: 0,
        duration: 0,
        timestamp: 0,
        isActive: false
    });

    useEffect(() => {
        const socket = connectSocket('timer');

        // Join the specific game type timer room
        socket.emit('joinTimer', gameType);

        socket.on('timerUpdate', (data) => {
            console.log('Timer update received:', data);
            setTimerData({
                ...data,
                isActive: true
            });
        });

        return () => {
            disconnectSocket('time');
        };
    }, [gameType]); // Add gameType to dependency array

    // Calculate remaining time
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

    return (
        <div className={`${styles.timer} ${getPhaseStyle()}`}>
            {timerData.label}: {formattedTime}
        </div>
    );
};
