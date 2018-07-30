/*global ko, Router */
(function () {
    'use strict';

    var ViewModel = function () {
        
        var tmp_books = [
            {code:'x1', title:"Patterns of Enterprise Application Architecture"},
            {code:'x2', title:"Domain-Driven Design: Tackling Complexity in the Heart of Software"},
            {code:'x3', title:"Microsoft .net: Architecting Applications for the Enterprise"}];
        
        this.items = ko.observable(tmp_books);
    };
    ko.applyBindings(new ViewModel());

}());
