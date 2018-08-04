const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const arrowClock = {
  size: 300, // размеры часов
  length: [0.8, 0.7, 0.6], //длина стрелок относительно размера часов
};

/**
* рисование часов
* @param { date } now - значение текущей даты
*/
arrowClock.draw = function(now) {
  //Рисование рамки и циферблата
  graphArcCircle(0, 0, this.size/2);
  graphArcCircle(0, 0, this.size/2*0.05);
  for (let i = 1; i <= 12; i += 1) {
    context.fillText(
      i,
      this.size/2+this.size/2*cos(90-30*i)*0.8,
      this.size/2-this.size/2*sin(90-30*i)*0.8
    );
    drawLine(
      this.size/2*cos(90-30*i)*0.9,
      this.size/2*sin(90-30*i)*0.9,
      this.size/2*cos(90-30*i),
      this.size/2*sin(90-30*i)
    );
  };
  const degs = setDeg(now);
  //Рисование стрелок
  for (let i = -1; i <= 2; i += 1) {
    drawLine(
      this.size/2*cos(90-degs[i])*0.05,
      this.size/2*sin(90-degs[i])*0.05,
      this.size/2*cos(90-degs[i])*this.length[i],
      this.size/2*sin(90-degs[i])*this.length[i]
    );
  };
};

/**
* синус и косинус
* @param { number } arg - значение угла
*/
const sin = arg => (
  Math.sin(arg*Math.PI/180)
);
const cos = arg => (
  Math.cos(arg*Math.PI/180)
);

/**
* получение массива значений углов для стрелок
* @param { date } now - значение текущей дата
*/
function setDeg(now) {
  const arr = now
    .toLocaleTimeString()
    .split(':');
  return [
    arr[2]*6,
    arr[1]*6+arr[2]/10,
    arr[0]*30+arr[1]/2+arr[0]/120
  ];
}; 

function drawLine(X1, Y1, X2, Y2) {
  context.moveTo(
    arrowClock.size/2+X1,
    arrowClock.size/2-Y1
  );
  context.lineTo(
    arrowClock.size/2+X2,
    arrowClock.size/2-Y2
  );
};

//рисование окружности с помощью метода arc
function graphArcCircle(x, y, r){
  context.moveTo(
    arrowClock.size/2+r,
    arrowClock.size/2-0
  );
  context.arc(
    arrowClock.size/2+x,
    arrowClock.size/2-y,
    r, 0, 2*Math.PI, true
  );
};

canvas.width = arrowClock.size;
canvas.height = arrowClock.size;
context.lineWidth = 2;

setInterval(
  () => {
    context.clearRect(
      0, 0, canvas.width, canvas.height
    );
    const now = new Date();
    context.beginPath();
    arrowClock.draw(now);
    context.stroke();
  },
  1000
);
