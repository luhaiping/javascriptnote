//增加自定义事件
function on(ele,type,fn){//登记
	//事件类型凡是以self开头的，都认为是自定义事件
	if(/^self/.test(type)){
		if(!ele["selfEvent"+type]){
			ele["selfEvent"+type]=[];
		}
		var a=ele["selfEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		return;
	}
	
	//以上是自定义，自定义事件的处理，不需要浏览器的事件绑定方法的参与。
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];//建一个程序池	
		ele.attachEvent("on"+type,function(){run.call(ele)});		
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);	
}
function off(ele,type,fn){
	if(/^self/.test(type)){
		var a=ele["selfEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				a[i]=null;
				break;
			}
		}
		return;
	}
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
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
function run(e){//给IE打的补丁
	e=e||window.event;
	var a=this["aEvent"+e.type];
	if(!e.target){
		e.preventDefault=function(){this.returnValue=false;}
		e.stopPropagation=function(){this.cancelBubble=true;}
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);	
			}else{
				a.splice(i,1);	
				i--;
			}
		}
	}
}
function processThis(fn,obj){
	return function(e){fn.call(obj,e);}
}
function selfRun(selfType,e){//用来“发布”自定义
	var a=this["selfEvent"+selfType];
	if(a){
		for(var i=0;i<a.length;i++){
			if(typeof a[i]=="function"){
				a[i].call(this,e);//	
			}else{
				a.splice(i,1);
				i--;	
			}
		}
	}
}
