 //1、解决this关键字的

function on(ele,type,fn){//做事件绑定，对一件事的约定
	//self:约定好了，凡是自定义事件，标识符都以self开头
	if(/^self/.test(type)){//这是在处理自定义事件
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];
		}
		var a=ele["selfEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
	}else{
		if(!ele["aEvent"+type]){//只能执行一次
			ele["aEvent"+type]=[];	
			//在这里加一个判断，可以让所有浏览器在触发事件时都执行run
			if(ele.attachEvent){
				ele.attachEvent("on"+type,function(){run.call(ele)});
			}else if(ele.addEventListener){
				ele.addEventListener(type,run,false);	
			}
		}
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		//bind(ele,type,run);//解决this的指向，保证run不被重复绑定
	}
	
}
//
function run(e){
	e=e||window.event;
	if(!e.target){
		e.target=e.srcElement;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;}
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		
	}
	var a=this["aEvent"+e.type];
	for(var i=0;i<a.length;i++){
		if(typeof a[i]=="function"){
			a[i].call(this,e);
		}else{
			a.splice(i,1);
			i--;	
		}
	}
}
function off(ele,type,fn){
	if(/^seft/.test(type)){
		var a=ele["selfEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					break;
				}
			}
		}
		
	}else{
		var a=ele["aEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					a[i]=null;
					break;
				}
			}
		}
	}
}
function selfRun(selfType,e){
	var a=this["selfEvent"+selfType];
	if(a){
		for(var i=0;i<a.length;i++){
			a[i].call(this,e);//第二个参数e是系统的事件对象	
		}
	}
}