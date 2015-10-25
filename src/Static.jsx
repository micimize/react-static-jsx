/*global require, module, document*/
"use strict";

var React = require('react');
var R = require('ramda');
var styleToCssString = require('react-style-to-css');

function serializeObj(obj) {
    return R.values(
        R.mapObjIndexed( function (val, key) {
            if (!R.contains(key, ["children", "style"])){
                return `${key}='${val}'`;
            } else if (R.contains(key, ["styles", "style"])){
                switch (R.type(val)) {
                  case "String":
                    return `${key}='${val}'`;
                  case "Object":
                    return `style='${styleToCssString(val)}'` ;
                  case "Array":
                    return R.map(styleToCssString, "", val).join(" ");
                  default:
                      console.log(`${val} is not a String, Object, or Array`);
                      return " ";
                }
            }
                }, obj)
    ).join(" ")
}
function serializeChildren(children){
    if (R.type(children) == "Object"){
         return serializeChild(children);
    } else { // if (R.type(children) == "Array")
         return R.map(serializeChild, children).join("\n");
    }
}
function serializeChild(c){
    if(R.type(c) != "Object")
        return c;
    var str = "<" + c.type + " " + serializeObj(c.props) + ">\n"
    if(c.props.children)
        str += serializeChildren(c.props.children);
    str += "</" + c.type + ">"
    return str;
}

var Static = React.createClass({
    serializeChildren(){
        return serializeChildren(this.props.children);
    },
    render() {
        return (
            <span dangerouslySetInnerHTML={{__html: this.serializeChildren()}}/>
        );
    }
});

module.exports = Static;
