var bool = confirm("将 "+fl.getDocumentDOM().name+" 库中的所有图片设为无损？");
 

if(bool)
 
{
 
        var lib = fl.getDocumentDOM().library;
 
        var count = 0;
 
        for(var i=0;i<lib.items.length;i++){
 
                if (lib.items[i].itemType=='bitmap'){
 
                        lib.items[i].compressionType = "lossless";
 
                        count++;
 
                }
 
        }
 
        alert("共有"+count+"图片被无损处理");
 
}