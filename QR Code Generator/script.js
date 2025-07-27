// Coding By CodeWave Studio - www.codewavestudio.space 
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Vanta.js waves effect
  VANTA.WAVES({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x0066ff,
    waveHeight: 20.00,
    waveSpeed: 0.75,
    zoom: 0.85
  });

  const wrapper = document.querySelector(".wrapper"),
    qrInput = wrapper.querySelector(".form input"),
    generateBtn = wrapper.querySelector(".form button"),
    qrImg = wrapper.querySelector(".qr-code img"),
    downloadBtn = document.createElement("button"); // Create download button
  
  let preValue;

  // Add download button styling and attributes
  downloadBtn.innerHTML = 'Download QR Code';
  downloadBtn.classList.add('download-btn');
  downloadBtn.style.display = 'none'; // Hide initially
  wrapper.querySelector('.qr-code').appendChild(downloadBtn);

  generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    generateBtn.disabled = true;
    
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
    
    qrImg.addEventListener("load", () => {
      wrapper.classList.add("active");
      generateBtn.innerText = "Generate QR Code";
      generateBtn.disabled = false;
      
      // Show download button
      downloadBtn.style.display = 'block';
    });
  });

  // Download functionality
  downloadBtn.addEventListener("click", () => {
    if(!qrImg.src) return;
    
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = qrImg.src;
    link.download = `QRCode-${preValue.replace(/[^a-z0-9]/gi, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  qrInput.addEventListener("keyup", (e) => {
    if(!qrInput.value.trim()) {
      wrapper.classList.remove("active");
      preValue = "";
      downloadBtn.style.display = 'none';
    } else if (e.key === "Enter") {
      // Allow generating QR code by pressing Enter
      generateBtn.click();
    }
  });
});