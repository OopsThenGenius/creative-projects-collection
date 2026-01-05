// 🌸 Confetti + Celebrate Logic
document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const celebrate = document.getElementById("celebrate");
  const confettiCanvas = document.getElementById("confetti");

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      if (celebrate) {
        celebrate.classList.add("show");
        startConfetti(confettiCanvas);
      } else {
        // Agar stage1 or stage2 hai, to next page bhej do
        window.location.href = "Stage3.html";
      }
    });
  }

  // ❌ Bhagne wala NO Button
  const noBtn = document.querySelector(".no");
  if (noBtn && window.location.pathname.includes("Stage1.html")) {
    noBtn.addEventListener("mouseover", () => {
      const x = Math.random() * (window.innerWidth - 100);
      const y = Math.random() * (window.innerHeight - 60);
      noBtn.style.position = "absolute";
      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;
    });
  }

  // 💕 Floating Hearts
  for (let i = 0; i < 15; i++) {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${100 + Math.random() * 20}vh`;
    heart.style.animationDuration = `${5 + Math.random() * 5}s`;
    document.body.appendChild(heart);
  }
});

// 🎉 Simple Confetti
function startConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 120 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 20 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
      ctx.stroke();
    });
    update();
  }

  function update() {
    confetti.forEach(c => {
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) * 0.7;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;

      if (c.y > canvas.height) {
        c.x = Math.random() * canvas.width;
        c.y = -20;
      }
    });
  }

  (function animate() {
    draw();
    requestAnimationFrame(animate);
  })();
}
