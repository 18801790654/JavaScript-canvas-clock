var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;

 function drawBackground(){
 	ctx.save();
 	ctx.translate(r,r);
 	ctx.beginPath();
 	ctx.lineWidth = 10 * rem;
 	ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2*Math.PI, false);
 	ctx.stroke();

 	var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
 	ctx.font = 18 * rem + 'px Arial';
 	//数字上下左右居中
 	ctx.textAlign = 'center';
 	ctx.textBaseline = 'middle';
 	//绘制表盘数字
    hourNum.forEach(function(num,i){
    	var rad = 2 * Math.PI / 12 * i;
    	var x = (r - 30 * rem) * Math.cos(rad);
    	var y = (r - 30 * rem) * Math.sin(rad);
    	ctx.fillText(num, x, y);
    });
    //绘制60个表盘圆点
    for(var i = 0; i < 60; i++){
    	var rad  = 2 * Math.PI / 60 * i;
    	var x = (r - 18 * rem) * Math.cos(rad);
    	var y = (r - 18 * rem) * Math.sin(rad);
    	ctx.beginPath();
    	if(i % 5 === 0){
    		ctx.fillStyle = '#000';
    		ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    	}
    	else{
    		ctx.fillStyle = '#ccc';
    		ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
    	}
    	ctx.fill();
    }
 }

//绘制秒针
 function drawSecond(second){
 	ctx.save();
 	ctx.beginPath();
 	ctx.fillStyle = "#c14543";
 	var rad = 2 * Math.PI / 60 * second;
 	ctx.rotate(rad);
 	ctx.moveTo(2 * rem, 20 * rem);
 	ctx.lineTo(-2 * rem, 20 * rem);
 	ctx.lineTo(-1 * rem, -r + 18 * rem);
 	ctx.lineTo(1 * rem, -r + 18 * rem);
 	ctx.fill();
 	ctx.restore();
 }

//绘制分针
 function drawMinute(minute, second){
 	ctx.save();
 	ctx.beginPath();
 	var rad = 2 * Math.PI / 60 * (minute + second / 60); ;
 	ctx.rotate(rad);
 	ctx.lineWidth = 3 * rem;
 	ctx.lineCap = 'round';
 	ctx.moveTo(0, 10 * rem);
 	ctx.lineTo(0, -r + 32 * rem);
 	ctx.stroke()
 	ctx.restore();
 }

//绘制时针
  function drawHour(hour, minute, second){
 	ctx.save();
 	ctx.beginPath();
 	var rad = 2 * Math.PI / 12 * (hour + minute / 60 + second / 3600); ;
 	ctx.rotate(rad);
 	ctx.lineWidth = 6 * rem;
 	ctx.lineCap = 'round';
 	ctx.moveTo(0, 10 * rem);
 	ctx.lineTo(0, -r / 2 );
 	ctx.stroke()
 	ctx.restore();
 }

//绘制中心白点
 function drawDot(){
 	ctx.beginPath();
 	ctx.fillStyle = '#fff'
 	ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI, false);
 	ctx.fill();
 }

function draw(){
	//清楚画布
	ctx.clearRect(0, 0, width, height);
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	drawBackground();
	drawHour(hour, minute, second);
    drawMinute(minute, second);
    drawSecond(second);
    drawDot();
    ctx.restore();
}

draw();
 setInterval(draw,1000);