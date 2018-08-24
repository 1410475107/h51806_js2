//飞机类js文件

function aircraft(selector, flyPicPath, bulletPicPath, blastPicPath, width, height) {
	//获取当前画布canvas
	this.cv = document.querySelector(selector);
	this.ctx = cv.getContext('2d');
	//canvas的width、height
	this.cvWidth = cv.width;
	this.cvHeight = cv.height;
	//飞机当前坐标
	this.x = null;
	this.y = null;
	//加载飞机图片
	this.flyPic = new Image();
	this.flyPic.src = flyPicPath;
	//飞机高宽
	this.width = width;
	this.height = height;
	//加载子弹图片
	this.bulletPic = new Image();
	this.bulletPic.src = bulletPicPath;
	//子弹数组
	this.bulletArr = [];
	//子弹改变坐标定时器id
	this.id = null;
	//启动定时器
	//	this.attack();
	//加载飞机、子弹爆炸图片
	this.blastPic = new Image();
	this.blastPic.src = blastPicPath;
	//子弹发射音效audio
	this.bulletAudio = document.querySelector('#bullet');
	this.bulletAudio.playbackRate = 5;
}

aircraft.prototype.flyDrawImg = function (x, y) {
	//	this.width = width;
	//	this.height = height;
	//	console.trace()
	//	console.info(`plane-width:${this.width},plane-height:${this.height}`)
	//将图片画到canvas中
	//清除原来的位置
	if (this.x != null || this.y != null) {
		this.ctx.clearRect(this.x, this.y - 2, this.width, this.height + 2);
	}
	this.ctx.beginPath();
	this.ctx.drawImage(this.flyPic, x, y, this.width, this.height);
	this.x = x;
	this.y = y;
}
//画子弹
aircraft.prototype.bulletDrawImg = function (item, x, y, width, height) {
	//将子弹画到canvas中
	//清除原来的位置
	//	console.info(this)
	this.ctx.clearRect(item.x, item.y, width, height);
	this.flyDrawImg(fly.x, fly.y, this.width, this.height);
	this.ctx.beginPath();
	this.ctx.drawImage(this.bulletPic, x, y, width, height);
	//	item.x = x;
	item.y = y;
}
//向子弹数组添加元素
aircraft.prototype.addBullet = function () {
	this.bulletArr.push({
		x: this.x + this.width / 2 - 10,
		y: this.y
	});
	//子弹发射音效
	this.bulletAudio.play();
}
//子弹数组遍历定时器
aircraft.prototype.attack = function () {
	let This = this;
	This.id = setInterval(() => {
		//检查子弹是否击中或超出画布
		This.bulletArr.forEach(function (item, index, arr) {
			if (item.y- 25 < -30) {
				arr.splice(index, 1);
				return
			}
			This.bulletDrawImg(item, item.x, item.y - 25, 10, 20);
		})
	}, 100)
}

//飞机爆炸
aircraft.prototype.blastdraw = function () {
	// console.log(this.blastPic)
	// this.ctx.clearRect(item.x, item.y, width, height);
	this.ctx.drawImage(this.blastPic, this.x, this.y, this.width, this.height)
}

//子弹爆炸
aircraft.prototype.blastBullet = function (x, y, width, height) {
	this.ctx.drawImage(this.blastPic, x, y, width, height)
}