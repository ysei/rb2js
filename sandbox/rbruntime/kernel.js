// Bootstrapping the object system
RbRootObject.defineConstant('STDOUT', function(){return document.getElementById('STDOUT')});
RbKernel = rbDefineModule('Kernel');
rbDefineMethod(RbKernel, 'print', function(receiver, args, block){
  var i=0;
  for (i=0; i < args.length; i++)
    RbRootObject.getConstant('STDOUT')().innerHTML += RbString.box(args[i]).stringValue;
  return null;
});
rbDefineMethod(RbKernel, 'puts', function(receiver, args, block){
  var i=0;
  for (i=0; i < args.length; i++)
    RbRootObject.getConstant('STDOUT')().innerHTML += RbString.box(args[i]).stringValue+"\n";
  return null;
});
