var prefix=prompt("请输入批量命名的前缀", "batName");
if(prefix){
	var docSel=document.selection;
	for(var i=0;i<docSel.length;i++){
		docSel[i].name = prefix + i;
		fl.trace(docSel[i]);
	}
}