const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
let options = [];

function addOption() {
    const option = document.getElementById('option').value;
    const percentage = parseFloat(document.getElementById('percentage').value);
    if (option && !isNaN(percentage) && percentage > 0) {
        options.push({ option, percentage });
        drawWheel();
        document.getElementById('option').value = '';
        document.getElementById('percentage').value = '';
    }
}

function drawWheel() {
    let startAngle = 0;
    const totalPercentage = options.reduce((sum, o) => sum + o.percentage, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    options.forEach((opt, index) => {
        const angle = (opt.percentage / totalPercentage) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, startAngle, startAngle + angle);
        ctx.fillStyle = `hsl(${index * 360 / options.length}, 70%, 60%)`;
        ctx.fill();
        ctx.stroke();
        startAngle += angle;
    });

    startAngle = 0;
    options.forEach((opt, index) => {
        const angle = (opt.percentage / totalPercentage) * 2 * Math.PI;
        const midAngle = startAngle + angle / 2;
        ctx.fillStyle = "#000";
        ctx.font = "bold 18px Cinzel";
        ctx.textAlign = "center";
        ctx.fillText(opt.option, 
            250 + Math.cos(midAngle) * 150, 
            250 + Math.sin(midAngle) * 150);
        startAngle += angle;
    });
}

function spin() {
    const spinAngle = Math.random() * 360 + 720;
    let currentAngle = 0;
    const spinSpeed = spinAngle / 100;

    const interval = setInterval(() => {
        currentAngle += spinSpeed;
        canvas.style.transform = `rotate(${currentAngle}deg)`;
        if (currentAngle >= spinAngle) {
            clearInterval(interval);
        }
    }, 10);
}

function saveWheel() {
    const name = document.getElementById('wheelName').value;
    if (name) {
        localStorage.setItem(name, JSON.stringify(options));
        updateSavedWheels();
    }
}

function updateWheel() {
    const select = document.getElementById('savedWheels');
    const name = select.value;
    if (name) {
        localStorage.setItem(name, JSON.stringify(options));
        updateSavedWheels();
    }
}

function loadWheel() {
    const select = document.getElementById('savedWheels');
    const name = select.value;
    if (name) {
        options = JSON.parse(localStorage.getItem(name));
        drawWheel();
    }
}

function deleteWheel() {
    const select = document.getElementById('savedWheels');
    const name = select.value;
    if (name) {
        localStorage.removeItem(name);
        updateSavedWheels();
        options = [];
        drawWheel();
    }
}

function updateSavedWheels() {
    const select = document.getElementById('savedWheels');
    select.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const option = document.createElement('option');
        option.value = key;
        option.text = key;
        select.appendChild(option);
    }
}

updateSavedWheels();
