// Proxy classes for immediate objects

// Null

RbNullProxy = rbDefineAnonymousClass(RbClass)
rbDefineMethod(RbNullProxy, 'nil?', function(){ return true });

// True

RbTrueProxy = rbDefineAnonymousClass(RbClass);

// False

RbFalseProxy = rbDefineAnonymousClass(RbClass);

// Number

RbNumberProxy = rbDefineAnonymousClass(RbClass);
//rbDefineMethod(RbNumberProxy, '')
