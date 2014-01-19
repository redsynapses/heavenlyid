define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        dealers = [
            {"id": 1, "name": "Nissan", "officePhone": "781-000-0001", "city": "Atlanta, GA", "street": "1234 Roswell Rd", "zipCode":"30188"},
            {"id": 2, "name": "VW", "officePhone": "781-000-0002", "city": "Atlanta, GA", "street": "2345 Roswell Rd", "zipCode":"30222"},
            {"id": 3, "name": "Volvo", "officePhone": "781-000-0002", "city": "Atlanta, GA", "street": "2345 Roswell Rd", "zipCode":"30222"}

        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                dealer = null,
                l = dealers.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (dealers[i].id === id) {
                    dealer = dealers[i];
                    break;
                }
            }
            deferred.resolve(dealer);
            return deferred.promise();
        },

        findByName = function (searchKey) {
            var deferred = $.Deferred(),
                results = dealers.filter(function (element) {
                    var name = element.name;
                    return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        Dealer = Backbone.Model.extend({

            initialize: function () {
                //this.cars = new CarsCollection();
                //this.reports.parent = this;
            },

            sync: function (method, model, options) {
                if (method === "read") {
                    findById(parseInt(this.id)).done(function (data) {
                        options.success(data);
                    });
                }
            }
        }),

        DealerCollection = Backbone.Collection.extend({

            model: Dealer,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByName(options.data.name).done(function (data) {
                        options.success(data);
                    });
                }
            }
        });

    return {
        Dealer: Dealer,
        DealerCollection: DealerCollection
    };

});
