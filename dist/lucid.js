!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.lucidJS=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.EventEmitter=require("./lib/event-emitter");
},{"./lib/event-emitter":2}],2:[function(require,module,exports){
function EventEmitter(){this._listeners={},this._pipedEmitters=[],this._flags={},this.source=null,this.event=null,this.cancelBubble=!1}EventEmitter.prototype._expandEvent=function(t){for(var e=t.split("."),i=[];e.length>0;)i.push(e.join(".")),e.pop();return i},EventEmitter.prototype.emit=function(t){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var e=0;e<t.length;e+=1)switch(arguments.length){case 1:this.emit(t[e]);break;case 2:this.emit(t[e],arguments[1]);break;case 3:this.emit(t[e],arguments[1],arguments[2]);break;default:var i=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1);i.unshift(t[e]),this.emit.apply(this,i)}return this}var s=this.source;if(this.source=this._remoteSource||this,this._remoteSource&&(this._remoteSource=null),"emitter"!==t.slice(0,7)){var r=this.event;switch(this.event=t,arguments.length){case 1:this.emit("emitter.emit",t);break;case 2:this.emit("emitter.emit",t,arguments[1]);break;case 3:this.emit("emitter.emit",t,arguments[1],arguments[2]);break;default:var i=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1);i.unshift("emitter.emit",t),this.emit.apply(this,i)}}var n=this.cancelBubble;this.cancelBubble=!1;for(var h=this._expandEvent(t),e=0;e<h.length;e+=1){var l=h[e];if(this._listeners[l]&&this._listeners[l].length)for(var o,p=this._listeners[l].slice(0),a=0;a<p.length;a+=1){switch(arguments.length){case 1:o=p[a].call(this);break;case 2:o=p[a].call(this,arguments[1]);break;case 3:o=p[a].call(this,arguments[1],arguments[2]);break;default:var i=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1);o=p[a].apply(this,i)}o===!1&&(this.cancelBubble=!1)}else if("error"===t)throw arguments[1]||new Error("Unknown emitter error")}if("emitter"!==t.slice(0,7)&&(this.event=r),this.source=s,!this.cancelBubble){for(var e=0;e<this._pipedEmitters.length;e+=1){var u=this._pipedEmitters[e];u._remoteSource=this,u.emit.apply(u,arguments)}for(var e=0;e<h.length;e+=1){var l=h[e],m=this._pipedEmitters[l];if(m)for(var a=0;a<m.length;a+=1)u=m[e],u&&(u._remoteSource=this,u.emit.apply(u,arguments))}}return this.cancelBubble=n,this},EventEmitter.prototype.trigger=EventEmitter.prototype.emit,EventEmitter.prototype.bind=function(t,e){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var i=0;i<t.length;i+=1)this.bind(t[i],e);return this}var s=this.event,r=this.source;if(this.event=t,this.source=this,this.emit("emitter.bind",e),this.event=s,this.source=r,this._listeners[t]||(this._listeners[t]=[]),"function"==typeof e)this._listeners[t].push(e);else if(null!==e&&"object"==typeof e&&"number"==typeof e.length)for(var i=0;i<e.length;i+=1)this._listeners[t].push(e[i]);this._executeFlag(t,e);for(var i=0;i<this._pipedEmitters.length;i+=1){var n=this._pipedEmitters[i];n._executeFlag(t,e)}if(this._pipedEmitters[t])for(var i=0;i<this._pipedEmitters[t].length;i+=1){var n=this._pipedEmitters[t][i];n._executeFlag(t,e)}return this},EventEmitter.prototype.addListener=EventEmitter.prototype.bind,EventEmitter.prototype.on=EventEmitter.prototype.bind,EventEmitter.prototype._executeFlag=function(t,e){if(this._flags[t]){var i=this.source,s=this.event;if(this.source=this,this.event=t,"function"==typeof e)e.apply(this,this._flags[t]);else if(null!==e&&"object"==typeof e&&"number"==typeof e.length)for(var r=0;r<e.length;r+=1)e[r].apply(this,this._flags[t]);this.source=i,this.event=s}},EventEmitter.prototype.weakBind=function(t,e){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var i=0;i<t.length;i+=1)this.weakBind(t[i],e);return this}if(this._listeners[t]||(this._listeners[t]=[]),"function"==typeof e)this._listeners[t].push(e);else if(null!==e&&"object"==typeof e&&"number"==typeof e.length)for(var i=0;i<e.length;i+=1)this._listeners[t].push(e[i]);this._listeners[t].push(function r(){if("function"==typeof e){var i=this._listeners[t].indexOf(e);i>-1&&this._listeners[t].splice(i,1)}else if(null!==e&&"object"==typeof e&&"number"==typeof e.length)for(var i=0;i<e.length;i+=1){var s=this._listeners[t].indexOf(e[i]);s>-1&&(this._listeners[t].splice(s,1),i-=1)}var i=this._listeners[t].indexOf(r);i>-1&&this._listeners[t].splice(i,1)}),this._executeFlag(t,e);for(var i=0;i<this._pipedEmitters.length;i+=1){var s=this._pipedEmitters[i];s._executeFlag(t,e)}if(this._pipedEmitters[t])for(var i=0;i<this._pipedEmitters[t].length;i+=1){var s=this._pipedEmitters[i];s._executeFlag(t,e)}return this},EventEmitter.prototype.once=EventEmitter.prototype.weakBind,EventEmitter.prototype.unbind=function(t,e){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var i=0;i<t.length;i+=1)this.unbind(t[i],e);return this}if(this._listeners[t]){var s=this.event,r=this.source;this.event=t,this.source=this;var n=this._listeners[t];if(null!==e&&"object"==typeof e&&"number"==typeof e.length)for(var i=0;i<e.length;i+=1){var h=n.indexOf(e[i]);h>-1&&(this.emit("emitter.unbind",e[i]),n.splice(h,1),i-=1)}else if("function"==typeof e){var h=n.indexOf(e);h>-1&&(this.emit("emitter.unbind",e),n.splice(h,1))}this.event=s,this.source=r}return this},EventEmitter.prototype.removeListener=EventEmitter.prototype.unbind,EventEmitter.prototype.off=EventEmitter.prototype.unbind,EventEmitter.prototype.unbindAll=function(t){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var e=0;e<t.length;e+=1)this.unbindAll(t[e]);return this}if("string"==typeof t&&this._listeners[t]){for(var e=0;e<this._listeners[t].length;e+=1)this.unbind(t,this._listeners[t][e]);return this}for(var t in this._listeners)for(var e=0;e<this._listeners[t].length;e+=1)this.unbind(t,this._listeners[t][e]);return this},EventEmitter.prototype.removeAllListeners=EventEmitter.prototype.unbindAll,EventEmitter.prototype.flag=function(t){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var e=0;e<t.length;e+=1)switch(arguments.length){case 1:this.flag(t[e]);break;case 2:this.flag(t[e],arguments[1]);break;case 3:this.flag(t[e],arguments[1],arguments[2]);break;default:var i=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1);i.unshift(t[e]),this.flag.apply(this,i)}return this}var s=this.event,r=this.source;switch(this.event=t,this.source=this,arguments.length){case 1:this.emit("emitter.flag",t);break;case 2:this.emit("emitter.flag",t,arguments[1]);break;case 3:this.emit("emitter.flag",t,arguments[1],arguments[2]);break;default:var i=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1);i.unshift("emitter.flag",t),this.emit.apply(this,i)}if(this.event=s,this.source=r,this._listeners[t])for(var n=this._listeners[t].splice(0),e=0;e<n.length;e+=1)this._executeFlag(t,n[e]);return this._flags[t]=arguments.slice?arguments.slice(1):Array.prototype.slice.call(arguments,1),this},EventEmitter.prototype.unflag=function(t){if(null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var e=0;e<t.length;e+=1)this.unflag(t[e]);return this}if(this._flags[t]){var i=this.event,s=this.source;this.event=t,this.source=this,this.emit("emitter.unflag",t),this.event=i,this.source=s,delete this._flags[t]}return this},EventEmitter.prototype.pipe=function(t,e){if(null!==t&&"object"==typeof t&&void 0===e&&(e=t,t=null),null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var i=0;i<t.length;i+=1)this.pipe(t[i],e);return this}var s=this.source;this.source=this;var r=this.event;return this.event=t,this.emit("emitter.pipe",e,t),this.event=r,this.source=s,null===t?this._pipedEmitters.push(e):(this._pipedEmitters[t]||(this._pipedEmitters[t]=[]),this._pipedEmitters[t].push(e)),this},EventEmitter.prototype.unpipe=function(t,e){if(null!==t&&"object"==typeof t&&void 0===e&&(e=t,t=null),null!==t&&"object"==typeof t&&"number"==typeof t.length){for(var i=0;i<t.length;i+=1)this.unpipe(t[i],e);return this}var s=this.source;this.source=this;var r=this.event;if(this.event=t,null===t){var n=this._pipedEmitters.indexOf(e);n>-1&&(this.emit("emitter.unpipe",this._pipedEmitters[n]),this._pipedEmitters.splice(n,1))}else{if(!this._pipedEmitters[t])return this;var n=this._pipedEmitters[t].indexOf(e);n>-1&&(this.emit("emitter.unpipe",this._pipedEmitters[t][n],t),this._pipedEmitters[t].splice(n,1))}return this.event=r,this.source=s,this},EventEmitter.prototype.listeners=function(t){return t?this._listeners[t]:this._listeners},module.exports=EventEmitter;
},{}]},{},[1])(1)
});