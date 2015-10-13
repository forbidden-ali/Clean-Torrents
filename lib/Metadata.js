var md5 = require('MD5');

function Metadata(metadata) {
    this.metadata = metadata;
}

module.exports = Metadata;

Metadata.prototype.cleanMetadata = function() {
    if (this.hasComment()) {
        this.metadata.comment = '';
    }
	
	if (this.hasCreatedBy()) {
		this.metadata.createdBy = '';
    }
	
	if (this.hasName()) {
		this.metadata.name = md5(this.metadata.name);
	}

    if (this.hasPublisher()) {
        this.metadata.info.publisher = '';
        if (this.metadata.info["publisher.utf-8"]) {
            this.metadata.info["publisher.utf-8"] = '';
        }
		if (this.metadata.info["publisher-url"]) {
			this.metadata.info["publisher-url"] = '';
		}
		if (this.metadata.info["publisher-url.utf-8"]) {
			this.metadata.info["publisher-url.utf-8"] = '';
		}
    }
	
	Array.prototype.in_array = function(e)
	{
	for(i=0;i<this.length;i++)
	{
	if(this[i] == e)
	return true;
	}
	return false;
	}
	
    if (this.isMultiFile()) {
        this.metadata.info.name = md5(this.metadata.info.name+'!@#!@#');
        if (this.metadata.info["name.utf-8"]) {
            this.metadata.info["name.utf-8"] = md5(this.metadata.info["name.utf-8"]+'!@#!@#');
        }
        this.metadata.info.files.forEach(function(file) {
            for (var key in file) {
                if (key === "path" || key === "path.utf-8") {
                    var text = file[key][0];
                    var dotIndex = text.lastIndexOf(".");
					var indexname = ['.txt','.url','.jpg','.flv','.rm','.mpeg','.avi','.mov','.asf','.wmv','.navi','.3gp','.mkv','.f4v','.rmvb','.mpg','.mp4','.mpe'];
					if (indexname.in_array(text.slice(dotIndex))){
						file[key][0] = md5(text.slice(0, dotIndex)) + text.slice(dotIndex);}
					else{
						file[key][0] = md5(text.slice(0, dotIndex));
					}	
                }
            }
        });
    } else {
        var text = this.metadata.info.name;
        var dotIndex = text.lastIndexOf(".");
        this.metadata.info.name = md5(text.slice(0, dotIndex)) + text.slice(dotIndex);
    }
    return this.metadata;
}

Metadata.prototype.getName = function() {
    return this.metadata.info.name;
}

Metadata.prototype.hasComment = function () {
    return this.metadata.comment ? true : false;
}

Metadata.prototype.hasCreatedBy = function () {
    return this.metadata.createdBy ? true : false;
}

Metadata.prototype.hasName = function () {
    return this.metadata.Name ? true : false;
}

Metadata.prototype.hasPublisher = function () {
    return this.metadata.info.publisher ? true : false;
}

Metadata.prototype.isMultiFile = function () {
    return this.metadata.info.files ? true : false;
}