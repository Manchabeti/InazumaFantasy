import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const onFinishLoading =() =>{
        navigate('/Jornadas')
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1;
                } else {
                    clearInterval(interval);
                    onFinishLoading();
                    return 100;
                }
            });
        }, 40); 

        return () => clearInterval(interval);
    }, [onFinishLoading]);

 
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Cargando...</h2>
            <div
                style={{
                    border: '1px solid #ccc',
                    width: '300px',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    margin: '20px auto',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#4CAF50',
                        height: '20px',
                        width: `${progress}%`,
                        transition: 'width 0.4s ease',
                    }}
                />
            </div>
        </div>
    );
};

export default LoadingScreen;