/*global ko, Router */
(function () {
    'use strict';

    var viewModel = function() {
        var self = this;
        self.taxRate = 0.05;
        self.amount = ko.observable();
        self.dblAmount = function() {
            var newAmount = parseInt(self.amount()) * 2;
            self.amount(newAmount);
        };
        self.grandTotal = ko.computed(function() {
            return self.amount() * (1+self.taxRate);
        });
               
        self.amount('5');

    }.bind(this);  // Ensure that "this" is always this view model
    ko.applyBindings(new viewModel());
}());
