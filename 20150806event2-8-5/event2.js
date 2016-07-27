//解决事件兼容性问题的整体方案
//1、解决this关键字的
on(ele,"click",fn1);
on(ele,"click",fn2);
on(ele,"click",fn3);
on(ele,"click",fn4);
on(ele,"click",fn5);
function on(ele,type,fn){//做事件绑定，对一件事的约定
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);	
	}else{
		if(!ele["aEvent"+type]){//只能执行一次
			ele["aEvent"+type]=[];	
			ele.attachEvent("on"+type,function(){run.call(ele)});
		}
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){
			if(a[i]==fn)return;	
		}
		a.push(fn);
		//bind(ele,type,run);//解决this的指向，保证run不被重复绑定
	}
	
}

function run(){
	var e=window.event;
	var a=this["aEvent"+e.type];
	for(var i=0;i<a.length;i++){
		a[i].call(this,e);
	}
}
function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);	
	}else{
		var a=ele["aEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i]==fn){
					//a[i]=null;
					a.splice(i,1);
					break;
				}
			}
		}
	}
}