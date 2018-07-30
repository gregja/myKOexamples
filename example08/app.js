/*global ko, Router */
(function () {
    'use strict';

    function TicketsViewModel() {
        var self = this;
        self.tickets = [
            {code:"eco", name: "Economy", price: 199.95 },
            {code:"biz", name: "Business", price: 449.22 },
            {code:"1cl", name: "First Class", price: 1199.99 }
        ];
        self.chosenTicket = ko.observable();
        self.resetTicket = function() { 
            self.chosenTicket(null) 
        }
    }
    ko.applyBindings(new TicketsViewModel(), document.getElementById("liveExample"));
        
}());
