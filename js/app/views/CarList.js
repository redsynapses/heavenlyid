define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        models              = require('app/models/memory/car'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/CarList.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
            this.collection = new models.CarCollection();
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            this.$el.html(template({cars: this.collection.toJSON()}));
            return this;
        }
    });
});
