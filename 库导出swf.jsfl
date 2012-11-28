var thisDoc = fl.getDocumentDOM();
var lib = fl.getDocumentDOM().library;
var selItems = lib.getSelectedItems();
var rsfolder=fl.browseForFolderURL("导出swf目录");
var aIndex = rsfolder.indexOf("assets");
var rootName;
if(aIndex !=-1)
{
	rootName = rsfolder.substr(aIndex,rsfolder.length);
	fl.trace(rootName);
}
fl.trace(rsfolder);
for(var i=0;i<selItems.length;i++){
	var obj = selItems[i];

	var doc = getDoc(thisDoc);

//	lib.addItemToDocument({x:0,y:0},obj.name);
	doc.addItem({x:0,y:0}, obj);
	
	var docSel = doc.selection;
	for(var j=0;j<docSel.length;j++){
		var elm = docSel[j];
		elm.x = 0;
		elm.y = 0;
	}
	var tid = obj.name.lastIndexOf(".");
	var str = obj.name.substr(0,tid);
	
	doc.exportSWF(rsfolder+"/"+str+".swf",true);
	
//	fl.saveDocument(doc, obj.name+".fla");
	fl.closeDocument(doc, false);
}

function getDoc(thisDoc)
{
//	return fl.getDocumentDOM();
	var doc = fl.createDocument();
	doc.frameRate = thisDoc.frameRate;
	doc.width = thisDoc.width;
	doc.height = thisDoc.height;
	doc.setPlayerVersion(thisDoc.getPlayerVersion());
	doc.asVersion = thisDoc.asVersion;
	doc.backgroundColor= thisDoc.backgroundColor;
	return doc;
}