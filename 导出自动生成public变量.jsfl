fl.outputPanel.clear();
fl.trace("////////////////////////////////////////////");
fl.trace("// jsfl自动生成");

expoVars();
	
function expoVars(ty){
	if(!ty) ty = "public";
	
	var doc = fl.getDocumentDOM();
	var lib = doc.library;
	var allItems = new Array();
	var str = '';
	for each(var item in lib.items)
	{
		if(item.linkageExportInFirstFrame){
			allItems.push(item.linkageClassName);
/*			fl.trace(ty + " static const " + item.linkageClassName.toUpperCase() + ':String = "' + item.linkageClassName + '";' +
			"\t//" + item.name);
			fl.trace(ty + " static function get " + changeType2(item).toUpperCase() + 
			"_" + item.linkageClassName.toUpperCase() + '():' + changeType(item) + 
			"{return " + changeType2(item) + "(" + item.linkageClassName.toUpperCase() + ");}\n");*/
			
			str += ty + " static const " + item.linkageClassName.toUpperCase() + ':String = "' + item.linkageClassName + '";' +
			"\t//" + item.name + "\n";
			/*
			str += ty + " static function get " + changeType2(item).toUpperCase() + 
			"_" + item.linkageClassName.toUpperCase() + '():' + changeType(item) + 
			"{return " + changeType2(item) + "(" + item.linkageClassName.toUpperCase() + ");}\n\n";
			*/
			
		}
	}
	fl.trace(str);
	
	// 复制到剪贴板
	fl.clipCopyString(str);
	
	str="",i=0;
	for each(var o in allItems){
		str += o+";"
		if(++i%6==0) str+="\n";
	}
	fl.trace(str);
}

function changeType(item)
{
	switch(item.itemType)
	{
		case "movie clip":
			if(item.timeline.frameCount==1) return "Sprite";
			return "MovieClip";
		break;
		case "button":
			return "SimpleButton";
		case "text":
			return "TextField";
		break;
		case "bitmap":
			return "BitmapData";
		break;
		default:
			return "DisplayObject";
		break;
	}
}
function changeType2(item)
{
	switch(item.itemType)
	{
		case "movie clip":
			if(item.timeline.frameCount==1) return "sp";
			return "mc";
		break;
		case "button":
			return "sb";
		case "text":
			return "txt";
		break;
		case "bitmap":
			return "bmpData";
		break;
		default:
			return "DisplayObject";
		break;
	}
}