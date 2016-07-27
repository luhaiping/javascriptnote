function bind(ele,type,handler){//this和重复绑定的问题
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);	
	}else if(ele.attachEvent){
		if(!ele["aBind"+type]){
			ele["aBind"+type]=[]	
		}
		var a=ele["aBind"+type];
		for(var i=0;i<a.length;i++){
			if(a[i].photo==handler)return;	
		}
		var fnTemp=function(){hanlder.call(ele)}
		fnTemp.photo=handler;
		a.push(fnTemp);
		ele.attachEvent("on"+type,fnTemp);
	}	
}
function unbind(ele,type,handler){
	if(ele.removeEventListener){
		ele.removeEventListener(type,handler,false);
	}else if(ele.detachEvent){
		var a=ele["aBind"+type];
		if(a&&a.length){
			for(var i=0;i<a.length;i++){
				if(a[i].photo==handler){
					ele.detachEvent("on"+type,a[i]);
					a.splice(i,1);	
					return;//
				}
			}
		}
	}
}

function on(ele,type,fn){
/*	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}*/
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];	
		//ele.attachEvent("on"+type,function(){run.call(ele)});
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);
	bind(ele,type,run);//真正的绑定的是run方法
}

function run(e){
	e=e||window.event;
	var a=this["aEvent"+e.type];
	if(!e.target){
		e.stopPropagation=function(){e.cancelBubble=true;};
		e.preventDefault=function(){e.returnValue=false;};
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;	
	}
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			a[i].call(this,e);	
		}
	}
}
//ele.onclick=function(e){}

function off(ele,type,fn){//解除绑定
	var a=ele["aEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a.splice(i,1);
				return;	
			}
		}
	}
}
