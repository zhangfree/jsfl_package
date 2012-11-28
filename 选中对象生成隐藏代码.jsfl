var docSel=document.selection;
for(var i=0;i<docSel.length;i++){
	var obj = docSel[i];
	fl.trace(obj.name+".visible=false;");
}