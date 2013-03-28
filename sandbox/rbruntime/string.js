// Mutable String class

RbString = rbDefineClass('String', RbClass);
RbString.box = function(str){
  if ((typeof str) == 'string'){
    obj = rbSendMessage(RbString, 'new');
    obj.stringValue = str;
    return obj;
  } else {
    return str;
  }
}
rbDefineMethod(RbString, 'initialize', function(receiver, args, block){ 
  receiver.stringValue = (args) ? args[0] : '';
});
rbDefineMethod(RbString, 'inspect', function(receiver, args, block){ 
  return '"' + receiver.stringValue.replace(/"/g, "\\\"") + '"';
});
rbDefineMethod(RbString, 'upcase', function(receiver, args, block){
  return RbString.box(receiver.stringValue.toUpperCase());
});
rbDefineMethod(RbString, 'upcase!', function(receiver, args, block){
  var oldValue = receiver.stringValue;
  var newValue = oldValue.toUpperCase();
  receiver.stringValue = newValue;
  return (oldValue == newValue) ? null : receiver;
});
rbDefineMethod(RbString, 'downcase', function(receiver, args, block){
  return RbString.box(receiver.stringValue.toLowerCase());
});
rbDefineMethod(RbString, 'downcase!', function(receiver, args, block){
  var oldValue = receiver.stringValue;
  var newValue = oldValue.toLowerCase();
  receiver.stringValue = newValue;
  return (oldValue == newValue) ? null : receiver;
});
rbDefineMethod(RbString, 'length', function(receiver, args, block){
  return receiver.stringValue.length();
});
rbDefineMethod(RbString, '<<', function(receiver, args, block){
  receiver.stringValue = receiver.stringValue + args[0];
  return receiver;
});
rbDefineMethod(RbString, '+', function(receiver, args, block){
  return RbString.box(receiver.stringValue + args[0]);
});
rbDefineMethod(RbString,'reverse',function(receiver, args, block){
	var s = "";
  var i = receiver.stringValue.length;
  while (i>0) {
      s += receiver.stringValue.substring(i-1,i);
      i--;
  }
  return RbString.box(s);
});
/*
rbDefineMethod(RbString, '', function(receiver, args, block){
});
*/