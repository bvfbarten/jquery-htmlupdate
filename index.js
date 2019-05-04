var morphdom = require ('morphdom');
var mustache = require ('mustache');

(function ( $ ) {
    $.fn.update = function(template, args, options) {
        var results;
        if (options === undefined){
            options = {};
        }
        this.each(function(i, e){
            if (args !== undefined){
                results = mustache.render(template, args, options.mustache);
                results = $('<div>').html(results)[0];
            } else {
                results = template;
            }
            if(options.morphdom == undefined){
                options.morphdom = {};
            }
            if(options.morphdom.childrenOnly == undefined){
                options.morphdom.childrenOnly = true;
            }
            morphdom(e, results, options.morphdom);
        });
        return this;
    }
    $.classed = function(args){
        console.log(this);
        var defaultArgs = {
            _id: "",
            _template: "",
            _data: {},
            _init: function(){
                this._render();
            },
            _render: function(){
                $(this._id).update(this._template, this._data);
            },
        };
        for(key in defaultArgs){
            if(args[key] === undefined){
                args[key] = defaultArgs[key];
            }
        }
        args._init();
        return args;
    }
}( jQuery ));

