define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Dealer.html'),
        CarListView         = require('app/views/CarList'),
        template = _.template(tpl);

    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(template(this.model.attributes));
            return this;
        },

        events: {
            "click button#dealer-checkin": "checkin",
            "click button#all-cars": "dealerCars"
        },

        checkin: function() {
            console.log("clicked checkin");
            $.ajax(
                {url:'http://test.org/checkin'})
            .done(
                function(data) {
                    console.log("Got " + data);
                }
            )
            .fail(
                function(err) {
                    console.log("error " + err);
                }
            );
        },

        dealerCars: function() {
            var key = $('#dealerId').val();
            this.dealerList.fetch({reset: true, data: {name: key}});

        }

    });

});
