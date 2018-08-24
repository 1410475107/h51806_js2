//复制对象，即克隆
//target为目标对象，source为源对象
var _extends = Object.assign || function(target) {
	for(var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		//使用for in语句遍历可枚举的属性
		for(var key in source) {
			//判断对象原型链上是否存在该属性
			if(Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
};

var game = null;//初始化游戏
var bestScore = 0;//初始化最佳分数
var scoreDiv = document.getElementById('score');//获取分数的元素
var bestScoreDiv = document.getElementById('bestScore');//获取最佳分数的元素
var addDiv = document.getElementById('add');//获取增加分数的元素
var endDiv = document.getElementById('end');//获取游戏结束的元素
var size = 4;//设置游戏宽度
var nextId = 1;//初始化下一个元素的id值
var score = 0;//初始化分数

//初始化游戏的方法
function initGame() {
	game = Array(size * size).fill(null); // 设计游戏框架，用数组表示
	initBestScore();//调用初始化最佳分数
}

//初始化最佳分数的方法
function initBestScore() {
	//获取本地存储的最佳分数，并把最佳分数放入bestScoreDiv元素中，在网页上显示出来
	bestScore = localStorage.getItem('bestScore') || 0;
	bestScoreDiv.innerHTML = bestScore;
}

//更新数组的dom操作
function updateDOM(before, after) {
	//执行获取新数组的方法，并命名为newElements
	var newElements = getNewElementsDOM(before, after);
	//执行获取已存在数组的操作方法，并命名为existingElements
	var existingElements = getExistingElementsDOM(before, after);
	//执行获取参与合并的元素的方法，并命名为mergedTiles
	var mergedTiles = getMergedTiles(after);
	//删除参与合并的元素
	removeElements(mergedTiles);
	//保留新的数组元素，并重新排列数组
	drawGame(newElements, true);
	//保留未参与合并的元素，并重新排列数组
	drawGame(existingElements);
}
//获得新元素的dom操作
function getNewElementsDOM(before, after) {
	//创建一个新数组，并测试所有元素
	var beforeIds = before.filter(function(tile) {
		return tile;
	}).map(function(tile) {// map()方法将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。
		return tile.id;//返回tile的id值
	});
	var newElements = after.filter(function(tile) {
		return tile && beforeIds.indexOf(tile.id) === -1;
	});
	return newElements;
}
//删除参与合并的元素的方法
function removeElements(mergedTiles) {
	//寻找参与合并的元素
	for(var _iterator = mergedTiles, _isArray = Array.isArray(_iterator), i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
		var ref;
		//判断是否存在合并的元素
		if(_isArray) {
			if(i >= _iterator.length) break;
			ref = _iterator[i++];
		} else {
			i = _iterator.next();//遍历下一个元素
			if(i.done) break;
			ref = i.value;//将合并元素的值赋给ref
		}

		var tile = ref;//将合并后的元素值赋给tile变量
		
		//循环执行查找合并元素的方法
		var _loop = function _loop() {
			if(_isArray2) {
				if(i2 >= _iterator2.length) return 'break';
				ref2 = _iterator2[i2++];
			} else {
				i2 = _iterator2.next();
				if(i2.done) return 'break';
				ref2 = i2.value;
			}

			var id = ref2;

			var currentElm = document.getElementById(id);//获取参与合并的元素
			positionTile(tile, currentElm);//执行刷新数组位置的方法
			currentElm.classList.add('tile--shrink');
			setTimeout(function() {//使用计时器方法删除参与合并的元素
				currentElm.remove();
			}, 100);
		};

		for(var _iterator2 = tile.mergedIds, _isArray2 = Array.isArray(_iterator2), i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
			var ref2;

			var ret = _loop();

			if(ret === 'break') break;
		}
	}
}
//获取合并后的元素的方法
function getMergedTiles(after) {
	return after.filter(function(tile) {
		return tile && tile.mergedIds;
	});
}
//获取已存在的元素的方法
function getExistingElementsDOM(before, after) {
	var beforeIds = before.filter(function(tile) {
		return tile;
	}).map(function(tile) {
		return tile.id;
	});
	var existingElements = after.filter(function(tile) {
		return tile && beforeIds.indexOf(tile.id) !== -1;
	});
	return existingElements;
}
//构建游戏背景元素
function drawBackground() {
	var tileContainer = document.getElementById('tile-container');//获取游戏的框架容器
	tileContainer.innerHTML = '';//初始化游戏框架内容，首先置为空
	//用for循环构造元素节点
	for(var i = 0; i < game.length; i++) {
		var tile = game[i];
		var tileDiv = document.createElement('div');//构造div元素并命名为tileDiv
		var x = i % size;
		var y = Math.floor(i / size);//向下取整，让y轴方向的元素与x轴方向的元素大小相同
		tileDiv.style.top = y * 100 + 'px';
		tileDiv.style.left = x * 100 + 'px';

		tileDiv.classList.add("background");//给游戏背景添加类选择器命名为background
		tileContainer.appendChild(tileDiv);//把刚刚创建的背景元素加入游戏框架当中
	}
}

function positionTile(tile, elm) {
	var x = tile.index % size;
	var y = Math.floor(tile.index / size);
	elm.style.top = y * 100 + 'px';
	elm.style.left = x * 100 + 'px';
}
//构建游戏内容元素
function drawGame(tiles, isNew) {
	var tileContainer = document.getElementById('tile-container');//获取游戏框架
	for(var i = 0; i < tiles.length; i++) {
		var tile = tiles[i];
		if(tile) {
			if(isNew) {
				(function() {
					var tileDiv = document.createElement('div');//构造游戏元素
					positionTile(tile, tileDiv);
					tileDiv.classList.add('tile', 'tile--' + tile.value);
					tileDiv.id = tile.id;
					setTimeout(function() {
						tileDiv.classList.add("tile--pop");
					}, tile.mergedIds ? 1 : 150);
					tileDiv.innerHTML = '<p>' + tile.value + '</p>';
					tileContainer.appendChild(tileDiv);
				})();
			} else {
				var currentElement = document.getElementById(tile.id);//获取当前元素的id
				positionTile(tile, currentElement);
			}
		}
	}
}
//游戏结束的方法
function gameOver() {
	if(game.filter(function(number) {
			return number === null;
		}).length === 0) {
		var sameNeighbors = game.find(function(tile, i) {
			var isRightSame = game[i + 1] && (i + 1) % 4 !== 0 ? tile.value === game[i + 1].value : false;
			var isDownSame = game[i + 4] ? tile.value === game[i + 4].value : false;
			if(isRightSame || isDownSame) {
				return true;
			}
			return false;
		});
		return !sameNeighbors;
	}
}
//构造随机数的方法
function generateNewNumber() {
	var p = Math.random() * 100;
	return p <= 90 ? 2 : 4;
}
//在随机空元素中随机放入数字2或者数字4
function addRandomNumber() {
	var emptyCells = game.map(function(_, index) {
		return index;//返回下标
	}).filter(function(index) {
		return game[index] === null;
	});
	if(emptyCells.length === 0) {
		return;
	}
	var newPos = emptyCells[Math.floor(Math.random() * emptyCells.length)];//随机产生一个空元素的数组下标
	var newObj = {
		id: nextId++,
		index: newPos,
		value: generateNewNumber()
	};
	game.splice(newPos, 1, newObj);
}

function getIndexForPoint(x, y) {
	return y * size + x;
}
//让游戏框架以网格的框架呈现
function reflectGrid(grid) {
	var reflectedGame = Array(size * size).fill(0);//构建4*4的数组
	for(var row = 0; row < size; row++) {
		for(var col = 0; col < size; col++) {
			var index1 = getIndexForPoint(col, row);
			var index2 = getIndexForPoint(size - col - 1, row);
			reflectedGame[index1] = grid[index2];
		}
	}
	return reflectedGame;
}
//向左去下标
function rotateLeft90Deg(grid) {
	var rotatedGame = Array(size * size).fill(0);
	for(var row = 0; row < size; row++) {
		for(var col = 0; col < size; col++) {
			var index1 = getIndexForPoint(col, row);
			var index2 = getIndexForPoint(size - 1 - row, col);
			rotatedGame[index1] = grid[index2];
		}
	}
	return rotatedGame;
}
//向右取下标
function rotateRight90Deg(grid) {
	var rotatedGame = Array(size * size).fill(0);
	for(var row = 0; row < size; row++) {
		for(var col = 0; col < size; col++) {
			var index1 = getIndexForPoint(col, row);
			var index2 = getIndexForPoint(row, size - 1 - col);
			rotatedGame[index1] = grid[index2];
		}
	}
	return rotatedGame;
}

//向右方向移动元素，内容相同的元素合并
function shiftGameRight(gameGrid) {
	// 显示游戏布局
	var reflectedGame = reflectGrid(gameGrid);
	// 左移
	reflectedGame = shiftGameLeft(reflectedGame);
	// 返回移动
	return reflectGrid(reflectedGame);
}
//向左移动元素
function shiftGameLeft(gameGrid) {
	var newGameState = [];//初始化新数组
	var totalAdd = 0;
	// 在横轴方向
	for(var i = 0; i < size; i++) {
		// 竖轴方向
		var firstPos = 4 * i;
		var lastPos = size + 4 * i;
		var currentRow = gameGrid.slice(firstPos, lastPos);
		var filteredRow = currentRow.filter(function(row) {
			return row;
		});
		for(var _iterator3 = filteredRow, _isArray3 = Array.isArray(_iterator3), i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
			var ref3;

			if(_isArray3) {
				if(i3 >= _iterator3.length) break;
				ref3 = _iterator3[i3++];
			} else {
				i3 = _iterator3.next();
				if(i3.done) break;
				ref3 = i3.value;
			}

			var row = ref3;

			delete row.mergedIds;
		}

		for(var j = 0; j < filteredRow.length - 1; j++) {
			if(filteredRow[j].value === filteredRow[j + 1].value) {
				var sum = filteredRow[j].value * 2;
				filteredRow[j] = {
					id: nextId++,
					mergedIds: [filteredRow[j].id, filteredRow[j + 1].id],
					value: sum
				};
				filteredRow.splice(j + 1, 1);
				score += sum;
				totalAdd += sum;
			}
		}
		while(filteredRow.length < size) {
			filteredRow.push(null);
		};
		newGameState = [].concat(newGameState, filteredRow);
	}

	if(totalAdd > 0) {
		scoreDiv.innerHTML = score;
		addDiv.innerHTML = '+' + totalAdd;
		addDiv.classList.add('active');
		setTimeout(function() {
			addDiv.classList.remove("active");
		}, 800);
		if(score > bestScore) {
			localStorage.setItem('bestScore', score);
			initBestScore();
		}
	}
	return newGameState;
}
//向上
function shiftGameUp(gameGrid) {
	var rotatedGame = rotateLeft90Deg(gameGrid);
	rotatedGame = shiftGameLeft(rotatedGame);
	return rotateRight90Deg(rotatedGame);
}
//向下
function shiftGameDown(gameGrid) {
	var rotatedGame = rotateRight90Deg(gameGrid);
	rotatedGame = shiftGameLeft(rotatedGame);
	return rotateLeft90Deg(rotatedGame);
}
//开始游戏按钮的相关操作
var buttons = document.querySelectorAll(".js-restart-btn");//获取开始元素的按钮
var length = buttons.length;
for(var i = 0; i < length; i++) {
	if(document.addEventListener) {
		buttons[i].addEventListener("click", function() {
			newGameStart();
		});
	} else {
		buttons[i].attachEvent("onclick", function() {
			newGameStart();
		});
	};
};

document.addEventListener("keydown", handleKeypress);
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
	xDown = evt.touches[0].clientX;
	yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
	var prevGame = [].concat(game);
	if(!xDown || !yDown) {
		return;
	}
	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if(Math.abs(xDiff) > Math.abs(yDiff)) {
		if(xDiff > 0) {
			game = shiftGameLeft(game);
		} else {
			game = shiftGameRight(game);
		}
	} else {
		if(yDiff > 0) {
			game = shiftGameUp(game);
		} else {
			game = shiftGameDown(game);
		}
	}
	game = game.map(function(tile, index) {
		if(tile) {
			return _extends({}, tile, {
				index: index
			});
		} else {
			return null;
		}
	});
	addRandomNumber();
	updateDOM(prevGame, game);
	if(gameOver()) {
		setTimeout(function() {
			endDiv.classList.add('active');
		}, 800);
		return;
	}
	xDown = null;
	yDown = null;
};
//使用按键操作游戏的方法
function handleKeypress(evt) {
	var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	var whichKey = event.which;

	var prevGame = [].concat(game);
	//使用switch分支语句操作游戏
	if(!modifiers) {
		event.preventDefault();//清除浏览器默认操作
		switch(whichKey) {
			case 37:
				game = shiftGameLeft(game);
				break;
			case 38:
				game = shiftGameUp(game);
				break;
			case 39:
				game = shiftGameRight(game);
				break;
			case 40:
				game = shiftGameDown(game);
				break;
		}
		//返回新数组
		game = game.map(function(tile, index) {
			if(tile) {
				return _extends({}, tile, {
					index: index
				});
			} else {
				return null;
			}
		});
		addRandomNumber();//执行添加随机数
		updateDOM(prevGame, game);//更新数组
		if(gameOver()) {
			setTimeout(function() {//使用计时器删除游戏结束的active类选择器，使游戏结束的页面显示出来
				endDiv.classList.add('active');
			}, 800);
			return;
		}
	}
}
//重新开始游戏
function newGameStart() {
	document.getElementById('tile-container').innerHTML = '';//将游戏页面内容置为空
	endDiv.classList.remove('active');//删除游戏结束标签的active类选择器
	score = 0;//降分数置为0
	scoreDiv.innerHTML = score;//将置为0的分数显示在页面上
	initGame();//执行游戏初始化函数
	drawBackground();
	var previousGame = [].concat(game);
	addRandomNumber();
	addRandomNumber();
	updateDOM(previousGame, game);
}

newGameStart();