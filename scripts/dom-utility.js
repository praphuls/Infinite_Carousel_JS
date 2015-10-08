function DomUtility(){

}

DomUtility.prototype.create = function(tagName) {
	return document.createElement(tagName);
};

DomUtility.prototype.get = function(el) {
	var element;

	if(el.indexOf(".") == 0){
		//get element by class name
		element = document.getElementsByClassName(el.substr(1, el.length))[0];
	}else if(el.indexOf("#") == 0){
		//get element by id
		element = document.getElementById(el.substr(1, el.length));
	}else{
		element = document.getElementsByTagName(el)[0];
	}

	return element;
};

DomUtility.prototype.getAll = function(el) {
	return document.getElementsByTagName(el);
};

DomUtility.prototype.insert = function(elToAdd, position, refEl){

};

DomUtility.prototype.append = function(elToAdd, parentEl){
	parentEl.appendChild(elToAdd);
};