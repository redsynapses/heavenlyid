define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        PageSlider  = require('app/utils/pageslider'),
        HomeView    = require('app/views/Home'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "dealers/:dealerId": "dealerDetails",
            "dealers/:dealerId/dealerCars": "dealerCars",
            "employees/:id": "employeeDetails",
            "employees/:id/reports": "reports"
        },

        home: function () {
            homeView.delegateEvents();
            slider.slidePage(homeView.$el);
        },

        dealerDetails: function (dealerId) {
            require(["app/models/dealer", "app/views/Dealer"], function (models, DealerView) {
                var dealer = new models.Dealer({id: dealerId});
                dealer.fetch({
                    success: function (data) {
                        slider.slidePage(new DealerView({model: data}).$el);
                    }
                });
            });
        },

        dealerCars: function (dealerId) {
            require(["app/models/car", "app/views/CarList"], function (models, CarListView) {
                var cars = new models.CarCollection({dealerId: dealerId});
                cars.fetch({
                    success: function (data) {
                        slider.slidePage(new CarListView({collection: data}).$el);
                    },
                    data: {dealerId: dealerId}
                });
            });
        },

        employeeDetails: function (id) {
            require(["app/models/employee", "app/views/Employee"], function (models, EmployeeView) {
                var employee = new models.Employee({id: id});
                employee.fetch({
                    success: function (data) {
                        slider.slidePage(new EmployeeView({model: data}).$el);
                    }
                });
            });
        },

        reports: function (id) {
            require(["app/models/employee", "app/views/Reports"], function (models, ReportsView) {
                var employee = new models.Employee({id: id});
                employee.fetch({
                    success: function (data) {
                        slider.slidePage(new ReportsView({model: data}).$el);
                    }
                });
            });
        }

    });

});
