function Canvas(sector) {
    this.canvas = document.querySelector(sector).children[6].children[0];
    let context = canvas.getContext('2d');
    context.beginPath();
    context.shadowColor = 'rgb(156, 243, 178)';
    //g
    context.strokeStyle = '#000';
    context.moveTo(160, 130);
    context.lineTo(200, 120);
    context.lineTo(200, 70);
    context.lineTo(180, 50);
    context.lineTo(50, 50);
    context.lineTo(50, 250);
    context.lineTo(190, 250);
    context.lineTo(200, 240);
    context.lineTo(200, 160);
    context.lineTo(140, 160);
    context.lineTo(140, 180);
    context.lineTo(170, 180);
    context.lineTo(170, 210);
    context.lineTo(90, 210);
    context.lineTo(90, 90);
    context.lineTo(160, 90);
    context.closePath();
    context.lineWidth = 4;
    context.fillStyle = 'rgb(156, 243, 178)';
    context.shadowBlur = 4;
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    // context.rotate(Math.PI / 180 * 355);
    context.fill();
    context.stroke();
    //a
    context.beginPath();
    context.moveTo(275, 50);
    context.lineTo(205, 250);
    context.lineTo(245, 248);
    context.lineTo(260, 210);
    context.lineTo(300, 210);
    context.lineTo(315, 248);
    context.lineTo(355, 250);
    context.closePath();
    context.shadowColor = 'rgb(245, 243, 150)';
    context.fillStyle = 'rgb(245, 243, 150)';
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(275, 120);
    context.lineTo(255, 180);
    context.lineTo(300, 180);
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fill();

    context.closePath();
    context.stroke();

    //M
    context.beginPath();
    context.moveTo(360, 50);
    context.lineTo(360, 250);
    context.lineTo(400, 250);
    context.lineTo(400, 150);
    context.lineTo(435, 245);
    context.lineTo(470, 150);
    context.lineTo(470, 250);
    context.lineTo(510, 250);
    context.lineTo(510, 50);
    context.lineTo(470, 50);
    context.lineTo(435, 150);
    context.lineTo(400, 50);
    context.shadowColor = '#ccc';
    context.fillStyle = '#ccc';
    context.fill();
    context.closePath();
    context.stroke();

//e
    context.beginPath();
    context.moveTo(665, 50);
    context.lineTo(517, 50);
    context.lineTo(517, 250);
    context.lineTo(665, 250);
    context.lineTo(665, 210);
    context.lineTo(555, 210);
    context.lineTo(555, 170);
    context.lineTo(640, 170);
    context.lineTo(640, 130);
    context.lineTo(555, 130);
    context.lineTo(555, 90);
    context.lineTo(665, 90);
    context.fillStyle = 'rgb(250, 211, 164)';
    context.shadowColor = 'rgb(250, 211, 164)'; 
    context.fill();
    context.closePath();
    context.stroke();
    //o
    context.beginPath();
    context.ellipse(125, 360, 75, 100, 0, 0, Math.PI * 2);
    context.fillStyle = 'rosybrown';
    context.shadowColor = 'rosybrown';
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.ellipse(125, 360, 35, 60, 0, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fill();
    context.stroke();
//v
    context.beginPath();
    context.moveTo(245, 260);
    context.lineTo(205, 260);
    context.lineTo(280, 460);
    context.lineTo(355, 260);
    context.lineTo(315, 260);
    context.lineTo(280, 350);
    context.fillStyle = '#ccc';
    context.shadowColor = '#ccc';
    context.fill();
    context.closePath();
    context.stroke();

//e
    context.beginPath();
    context.moveTo(510, 260);
    context.lineTo(360, 260);
    context.lineTo(360, 460);
    context.lineTo(510, 460);
    context.lineTo(510, 420);
    context.lineTo(400, 420);
    context.lineTo(400, 380);
    context.lineTo(480, 380);
    context.lineTo(480, 340);
    context.lineTo(400, 340);
    context.lineTo(400, 300);
    context.lineTo(510, 300);
    context.closePath();
    context.fillStyle = 'rgb(250, 211, 164)';
    context.shadowColor = 'rgb(250, 211, 164)';
    context.fill();
    context.stroke();

//r
    context.beginPath();
    context.moveTo(517, 260);
    context.lineTo(517, 460);
    context.lineTo(555, 460);
    context.lineTo(555, 380);
    context.lineTo(635, 460);
    context.lineTo(665, 460);
    context.lineTo(610, 380);
    context.lineTo(665, 360);
    context.lineTo(665, 270);
    context.lineTo(655, 260);
    context.closePath();
    context.fillStyle = 'yellowgreen';
    context.shadowColor = 'yellowgreen';
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(555, 300);
    context.lineTo(555, 360);
    context.lineTo(610, 360);
    context.lineTo(610, 300);
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fill();
    context.closePath();
    context.stroke();
}