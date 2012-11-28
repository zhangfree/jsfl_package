var docSel=document.selection;
var arr = [];
for(var i=0;i<docSel.length;i++){
	arr.push(""+docSel[i].name);
	//fl.trace(obj.name+".visible=false;");
}

fl.trace(arr);
	
// 复制到剪贴板
fl.clipCopyString(arr);