// Macros

function RTEST(v){ return (v != null && v != false) }
function NIL_P(v){ return (v === null) }
function debug(str){ document.getElementById('STDOUT').innerHTML += str + "\n" }

// Basic Ruby message/constant system

function rbSendMessage(obj, msg, args, blk){
  if (obj === null)
    return RbNullProxy.sendMessage(RbNullProxy, msg, args, blk);
  else if (obj === true)
    return RbTrueProxy.sendMessage(RbTrueProxy, msg, args, blk);
  else if (obj === false)
    return RbFalseProxy.sendMessage(RbFalseProxy, msg, args, blk);
  else if ((typeof obj) == 'number')
    return RbNumberProxy.sendMessage(RbNumberProxy, msg, args, blk);
  // Autobox JS strings
  else if ((typeof obj) == 'string') {
    str = RbString.box(obj);
    return str.sendMessage(str, msg, args, blk);
  }
  //autobox JS arrays
  else if (obj instanceof Array) {
		ary = RbArray.box(obj);
		return ary.sendMessage(ary, msg, args, blk);
	}
  else if (typeof obj.sendMessage != 'function')
    throw "RB2JS Message Exception: object is not a RB2JS native or proxied type"
  else
    return obj.sendMessage(obj, msg, args, blk);
}

function rbDefineClass(name, superclass){ 
  return rbDefineClassUnder(name, RbRootObject, superclass)
}

function rbDefineAnonymousClass(superclass){ 
  klass = new RbObject();
  klass.setSuperclass(superclass);
  return klass;
}

function rbDefineClassUnder(name, obj, superclass){
  klass = new RbObject();
  obj.defineConstant(name, klass)
  klass.setSuperclass(superclass);
  return klass;
}

function rbDefineModule(name){ 
  return rbDefineModuleUnder(name, RbRootObject) 
}

function rbDefineModuleUnder(name, obj){
  module = new RbObject();
  obj.defineConstant(name, module);
  return module;
}

function rbDefineMethod(obj, name, fn){
  obj.defineMethod(name, fn);
}
//function rbDefineSingletonMethod(){}

function rbIvarSet(obj, name, value){
  obj.instanceVariables[name] = value;
}

function rbIvarGet(obj, name){
  return obj.instanceVariables[name];
}


// Object

function RbObject(){
  this.instanceMethods = {};
  this.instanceVariables = {};
  this.constants = {};
}
RbObject.prototype = {
  sendMessage: function(receiver, method, args, block){
    var delegatedFunction = null;
    var obj = receiver;
    while (!delegatedFunction){
      if (delegatedFunction = obj.instanceMethods[method])
        return delegatedFunction(receiver, args, block);
      else if (obj = obj.superclass);
      else if (obj = RbRootObject && RbRootObject.instanceMethods[method]);
      else
        throw "RB2JS NoMethodError: undefined method `"+method+"'";
    }
  },
  getConstant: function(name){
    var constant = null;
    var obj = this;
    while (!constant){
      if (constant = obj.constants[name])
        return constant;
      else if (obj = obj.superclass);
      else
        throw "RB2JS NameError: uninitialized constant "+name;
    }
  },
  defineMethod: function(name, fn){
    this.instanceMethods[name] = fn;
  },
  setSuperclass: function(klass){
    this.superclass = klass;
  },
  defineConstant: function(name, value){
    this.constants[name] = value;
  }
};

// The root object - Ruby's Object

RbRootObject = new RbObject();
RbRootObject.defineConstant('Object', RbRootObject);
rbDefineMethod(RbRootObject, 'constants', function(receiver, args, block){
  return receiver.constants;
});
rbDefineMethod(RbRootObject, 'methods', function(receiver, args, block){
  return receiver.instanceMethods;
});
rbDefineMethod(RbRootObject, 'nil?', function(){ return false });

// Prototype Class

RbClass = new RbObject();
RbClass.defineMethod('new', function(receiver, args, block){
  obj = new RbObject();
  obj.setSuperclass(receiver);
  obj.sendMessage(receiver, 'initialize', args, block);
  return obj;
});
rbDefineMethod(RbClass, 'initialize', function(receiver, args, block){
  // Do nothing by default
});
RbRootObject.defineConstant('Class', RbClass);

