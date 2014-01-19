define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone'),

        cars = [
            {"id": 1, "name": "Nissan", "officePhone": "781-000-0001", "city": "Atlanta, GA", "street": "1234 Roswell Rd", "zipCode":"30188", "dealerId":"1"},
            {"id": 2, "name": "VW", "officePhone": "781-000-0002", "city": "Atlanta, GA", "street": "2345 Roswell Rd", "zipCode":"30222", "dealerId":"1"},
            {"id": 3, "name": "Volvo", "officePhone": "781-000-0002", "city": "Atlanta, GA", "street": "2345 Roswell Rd", "zipCode":"30222", "dealerId":"2"}

        ],

        findById = function (id) {
            var deferred = $.Deferred(),
                car = null,
                l = cars.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (cars[i].id === id) {
                    car = cars[i];
                    break;
                }
            }
            deferred.resolve(car);
            return deferred.promise();
        },

        findByDealerId = function (dealerId) {
            var deferred = $.Deferred(),
                results = cars.filter(function (element) {
                    return dealerId = element.dealerId;
                });
            deferred.resolve(results);
            return deferred.promise();
        },

        Car = Backbone.Model.extend({

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

        CarCollection = Backbone.Collection.extend({

            model: Car,

            sync: function (method, model, options) {
                if (method === "read") {
                    findByDealer(options.data.dealerId).done(function (data) {
                        options.success(data);
                    });
                }
            }
        });

    return {
        Car: Car,
        CarCollection: CarCollection
    };

});
