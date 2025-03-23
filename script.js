// 52种语言的"我爱你"
const lovePhrases = [
  "我爱你", "I love you", "Je t'aime", "Ich liebe dich", "Ti amo",
  "Te quiero", "Eu te amo", "Я тебя люблю", "愛してる", "사랑해",
  "ฉันรักคุณ", "Mahal kita", "Szeretlek", "Jag älskar dig", "Ik hou van jou",
  "Σ'αγαπώ", "Miluji tě", "Kocham Cię", "Te iubesc", "Saya cinta padamu",
  "أحبك", "मैं तुमसे प्यार करता हूँ", "நான் உன்னை காதலிக்கிறேன்", "මම ඔයාට ආදරෙයි",
  "Tôi yêu bạn", "Nakupenda", "I love you", "Te amo", "Eu te amo", "Я тебя люблю",
  "愛してる", "사랑해", "ฉันรักคุณ", "Mahal kita", "Szeretlek", "Jag älskar dig",
  "Ik hou van jou", "Σ'αγαπώ", "Miluji tě", "Kocham Cię", "Te iubesc", 
  "Saya cinta padamu", "أحبك", "मैं तुमसे प्यार करता हूँ", "நான் உன்னை காதலிக்கிறேன்",
  "මම ඔයාට ආදරෙයි", "Tôi yêu bạn", "Nakupenda", "I love you", "Te amo", "Eu te amo"
];

// 爱心坐标计算
function getHeartCoordinates(progress) {
  const angle = progress * 2 * Math.PI;
  const x = 16 * Math.pow(Math.sin(angle), 3);
  const y = -1 * (13 * Math.cos(angle) - 
                5 * Math.cos(2 * angle) - 
                2 * Math.cos(3 * angle) - 
                Math.cos(4 * angle));
  return { x, y };
}

let textElements = [];
let animationFrame;

// 渲染文字
function renderText() {
  const container = document.querySelector('.heart-container');
  textElements = lovePhrases.map((phrase, i) => {
    const span = document.createElement('span');
    span.textContent = phrase;
    span.classList.add('love-text');
    span.style.setProperty('--i', i);
    
    // 初始位置
    const initialProgress = i / lovePhrases.length;
    const { x, y } = getHeartCoordinates(initialProgress);
    span.style.left = `${50 + x * 10}%`;
    span.style.top = `${50 + y * 10}%`;
    
    container.appendChild(span);
    return span;
  });
  
  startAnimation();
}

// 更新文字位置
function updatePositions() {
  const now = Date.now();
  const speed = 0.00005; // 控制移动速度，减小数值使移动更慢
  const offset = (now * speed) % 1;
  
  textElements.forEach((span, i) => {
    const progress = (i / textElements.length + offset) % 1;
    const { x, y } = getHeartCoordinates(progress);
    span.style.left = `${50 + x * 10}%`;
    span.style.top = `${50 + y * 10}%`;
  });
  
  animationFrame = requestAnimationFrame(updatePositions);
}

// 启动动画
function startAnimation() {
  if (!animationFrame) {
    updatePositions();
  }
}

// 停止动画
function stopAnimation() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

// 计时器
function updateTimer() {
  const startDate = new Date('2024-08-31');
  const now = new Date();
  const diff = now - startDate;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  renderText();
  setInterval(updateTimer, 1000);
});
