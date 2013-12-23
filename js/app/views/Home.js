define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        DealerListView      = require('app/views/DealerList'),
        models              = require('app/models/memory/dealer'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.dealerList = new models.DealerCollection();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new DealerListView({collection: this.dealerList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "keyup .search-key" :    "search",
            "keypress .search-key" : "onkeypress",
            "click button#addMore" : "addMore"
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.dealerList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        },

        addMore: function (event) {
            console.log("Clicked")
        }
    });

});
