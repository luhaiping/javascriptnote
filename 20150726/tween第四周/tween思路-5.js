function animate(ele,oTarget,duration,effect,fnCallback){
	//用了类似于方法重载的一种概念：相同的函数名，由于参数不同，实现效果不同。
	//JS是使用判断参数类型或参数的个数来实现方法重载的
	先安排默认的动画效果
	fnEffect=zhufengEffect.Expo.easeOut;
	if(effect是个数字){
		则按安排的这五种动画效果来处理	
		fnEffect=某种指定的动画效果
	}else if(是个数组){
		则用这个数据中的第0项和第1项的值，组合成一种动画效果
	}else if(是个函数){
		则把effect当成回调函数来处理
		fnCallback=effect;
	}
	
	//下面再处理每个方向的起始值和运动距离
	var oBegin={};
	var oChange={};
	for(var attr in oTarget){
		var begin=getCss(ele,attr);
		oChange[attr]=oTarget[attr]-begin;
		oBegin[attr]=begin;
	}
	//以上是没有优化的代码
	
	var times=0;
	var interval=15;
	clearInterval(ele.timer);//防止动画积累
	function step(){
		times+=interval;
		if(times<duration){
			//让每个方向到达当前应该到的位置
			for(var attr in oChange){
				var val=fnEffect(times,oBegin[attr],oChange[attr],duration);
				setCss(ele,attr,val);
			}
		}else{
			//各个方向都要到达终点
			for(var attr in oTarget){
				setCss(ele,attr,oTarget[attr]);
			}
			//停止动画等一系列其它的操作，比如执行回调函数
		}
	}
	ele.timer=window.setInterval(step,interval);
	
}