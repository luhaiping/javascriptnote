var DOM={};
DOM.listToArray=function(eles){
		try{
			var a=[].slice.call(eles,0);
			eles.slice(0)
		}catch(e){
			var a=[];
			for(var i=0;i<eles.length;i++){
				a.push(eles[i]);	
			}
		}
		return a;
}