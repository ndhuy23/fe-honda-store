import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';

window.addEventListener('DOMContentLoaded', function() {
    const popupButton = document.getElementById('popup-button');
    const countdownTimer = document.getElementById('countdown-timer');
    
    // Đếm ngược 10 giây
    let countdown = 10;
    const countdownInterval = setInterval(() => {
      countdown--;
    
      if (countdown === 0) {
        popupButton.removeAttribute('disabled');
        clearInterval(countdownInterval);
        countdownTimer.style.display = 'none';
      }
    }, 1000);
    
    popupButton.addEventListener('click', () => {
      window.location.href = 'detail.html?userId='+localStorage.getItem("userId");
    });
  });
  window.addEventListener('load', function() {
    const confettiConfig = {
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 }
    };
    canvasConfetti(confettiConfig);
  });
  
