//游戏逻辑js文件

//获取dom元素
let start = document.querySelector('#start');
let pause = document.querySelector('#pause');
let end = document.querySelector('#end');
let s = document.querySelector('#s');
//画布
let cv = document.querySelector('#cv');
let ctx = cv.getContext('2d');
//audio
let game = document.querySelector('#game');
game.volume = 0.2;
let blast = document.querySelector('#blast');
//提高爆炸音效播放速度，防止连续击中多个目标时，没有音效
blast.playbackRate = 10;

//游戏开始才能暂停、防止多次点击开始按钮
let startBool = false;
//是否第一次开始标志
let firstBool = true;
//敌机数组
let enemyFlySum = [];
//敌机移动定时器id
let _id = null;
//统计击毁的敌机数量
let enemySum = 0;

//实例化飞机
let fly = new aircraft('#cv', 'imgs/plane.png', 'imgs/bullet.png', 'imgs/blast.png', 50, 50);
//开始游戏
start.onmousedown = function(e) {
	//阻止继续冒泡，触发子弹发射
	e.stopPropagation();
	if(startBool) {
		return
	}
	startBool = !startBool;
	//清理画布
	ctx.clearRect(0, 0, cv.width, cv.height);
	//将飞机水平居中放置
	if(firstBool) {
		fly.flyDrawImg(fly.cvWidth / 2 - 20, fly.cvHeight - 80);
		//清空得分
		s.innerText = 0;
		firstBool = false;
		enemySum = 0;
		start.innerText = '开始游戏';
	}
	//暂停后再开始重绘飞机
	fly.flyDrawImg(fly.x, fly.y);
	//启动子弹定时器
	fly.attack()
	//启动敌机移动定时器
	_id = setInterval(enemyMove, 35);
	//添加键盘事件
	window.addEventListener('keydown', keys);
	game.play();
}
//暂停游戏
pause.onmousedown = function(e) {
	//阻止继续冒泡，触发子弹发射
	e.stopPropagation();
	if(!startBool) {
		return
	}
	startBool = !startBool;
	clearInterval(fly.id);
	clearInterval(_id);
	game.pause();
	//清除键盘事件
	window.removeEventListener('keydown', keys);
	ctx.fillStyle = 'red';
	ctx.font = 'bold 40px 楷体';
	ctx.fillText('游戏暂停！', cv.width / 2 - 70, cv.height / 2);
}

//结束游戏
end.onmousedown = function(e) {
	//阻止继续冒泡，触发子弹发射
	e.stopPropagation();
	startBool = false;
	clearInterval(fly.id);
	clearInterval(_id);
	game.pause();
	//点开始将重新开始游戏
	firstBool = true;
	start.innerText = '重新开始';
	//清空敌机数组
	enemyFlySum = [];
	//清空子弹数组
	fly.bulletArr = [];
	//清除键盘事件
	window.removeEventListener('keydown', keys);
	//清理画布
	ctx.clearRect(cv.width / 2 - 70, cv.height / 2 - 50, 300, 70);
	ctx.fillStyle = 'red';
	ctx.font = 'bold 40px 楷体';
	ctx.fillText('游戏结束！', cv.width / 2 - 70, cv.height / 2);

}

//监听键盘事件函数
function keys(e) {
	//阻止事件默认行为
	e.preventDefault();
	switch(e.keyCode) {
		case 37:
			if(fly.x - 5 < 0) {
				fly.flyDrawImg(0, fly.y);
				return
			}
			fly.flyDrawImg(fly.x - 5, fly.y);
			break;
		case 39:
			if(fly.x + 5 > fly.cvWidth - 50) {
				fly.flyDrawImg(fly.cvWidth - 50, fly.y);
				return
			}
			fly.flyDrawImg(fly.x + 5, fly.y);
			break;
		case 38:
			if(fly.y - 5 < 0) {
				fly.flyDrawImg(fly.x, 0);
				return
			}
			fly.flyDrawImg(fly.x, fly.y - 5);
			break;
		case 40:
			if(fly.y + 5 > fly.cvHeight - 50) {
				fly.flyDrawImg(fly.x, fly.cvHeight - 50);
				return
			}
			fly.flyDrawImg(fly.x, fly.y + 5);
			break;
			//发射子弹
			// case 32:
			// 	fly.addBullet();
		default:
			break;
	}
}
//将鼠标事件绑定子弹发射函数
window.onmousedown = function(e) {
	if(e.button == 0) {
		fly.addBullet();
	}
}
//初始化敌机

setInterval(() => {
	//限制敌机总数
	for(let i = 0; i < 10 - enemyFlySum.length; i++) {
		let enemy = new aircraft('#cv', 'imgs/enemy.png', 'imgs/enemyBullet.png', 'imgs/blast.png', 37, 39);
		let _x = Math.round(Math.random() * (enemy.cvWidth - 40));
		let _y = Math.round(Math.random() * (-100) - 50);
		//防止敌机相互堆叠
		for(let j = 0; j < enemyFlySum.length; j++) {
			let diffX = Math.pow((enemyFlySum[j].e.x - _x), 2);
			let diffY = Math.pow((enemyFlySum[j].e.y - _y), 2);
			let r = Math.sqrt(diffX + diffY);
			if(r < 100) {
				return
			}

		}
		//设置敌机下一个目标点
		//		let target = {
		//			x: Math.round(Math.random() * (enemy.cvWidth - 40)),
		//			y: Math.round(Math.random() * (enemy.cvHeight - _y) + _y)
		//		}

		enemy.flyDrawImg(_x, _y);
		enemyFlySum.push({
			//			t: target
			e: enemy
		})
	}
}, 10)

//定时移动敌机
function enemyMove() {
	enemyFlySum.forEach(function(item, index, arr) {
		//删除y坐标已经超出canvas的敌机
		if(item.e.y > item.e.cvHeight) {
			arr.splice(index, 1);
			//			console.log('删除')
			return
		}
		item.e.flyDrawImg(item.e.x, ++item.e.y);
		//判断函数
		collision();
	});
}

//画布待清理数组
let clearArray = [];
//判断是否发生碰撞，子弹与敌机，敌机与玩家飞机
function collision() {
	//玩家飞机宽高
	let flyWidth = fly.width;
	let flyHeight = fly.height;
	//玩家飞机当前坐标
	let flyX = fly.x;
	let flyY = fly.y;
	enemyFlySum.forEach(
		function(value, index, arr) {
			//敌机宽高
			let enemyWidth = value.e.width;
			let enemyHeight = value.e.height;
			//敌机当前坐标
			let enemyX = value.e.x;
			let enemyY = value.e.y;
			//两机各轴距离,宽高和
			let diffX = Math.pow((flyX + flyWidth / 2 - enemyX - enemyWidth / 2), 2);
			let diffY = Math.pow((flyY + flyHeight / 2 - enemyY - enemyHeight / 2), 2);
			//敌机与玩家飞机是否碰撞
			if(Math.sqrt(diffX + diffY) <= 40) {
				clearInterval(fly.id);
				clearInterval(_id);
				fly.blastdraw();
				value.e.blastdraw();
				//爆炸audio
				blast.play();
				//重置开始按钮
				start.innerText = '重新开始';
				startBool = false;
				firstBool = true;
				//清除键盘事件
				window.removeEventListener('keydown', keys);
				//清理画布
				ctx.clearRect(cv.width / 2 - 70, cv.height / 2 - 50, 300, 70);
				ctx.fillStyle = 'red';
				ctx.font = 'bold 40px 楷体';
				ctx.fillText('游戏结束！', cv.width / 2 - 70, cv.height / 2);
			}
			//子弹是否击中敌机
			fly.bulletArr.forEach(function(v, i, a) {
				let sum = Math.pow((v.x + 5 - enemyX - enemyWidth / 2), 2) + Math.pow((v.y + 10 - enemyY - enemyHeight / 3), 2);
				if(Math.sqrt(sum) <= 25) {
					// fly.bulletDrawImg(fly.blastPic, v.x, v.y, 20, 40);
					//飞机爆炸
					value.e.blastdraw();
					//子弹爆炸
					value.e.blastBullet(v.x - 10, v.y - 10, 40, 40);
					//爆炸audio
					blast.play();
					//击毁数量统计
					s.innerText = ++enemySum;
					//将被击中目标放入待清理数组
					clearArray.push({
						x: v.x - 10,
						y: v.y - 10,
						w: 40,
						h: 40
					}, {
						x: enemyX,
						y: enemyY,
						w: enemyWidth,
						h: enemyHeight
					});
					fly.bulletArr.splice(i, 1);
					enemyFlySum.splice(index, 1);
				}
			})
		}
	);

}
//画布清理定时器
let clearId = setInterval(function() {
	if(clearArray.length == 0) {
		return
	}
	for(let v of clearArray) {
		// console.dir(v)
		ctx.clearRect(v.x, v.y, v.w, v.h);
	}
}, 500)