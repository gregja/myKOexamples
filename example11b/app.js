/*global ko, Router */
(function () {
    'use strict';

    var AppViewModel = function() {
        var firstName = ko.observable().extend({required: "Please enter First Name"}),
            lastName = ko.observable(),
            fullName = ko.computed(function(){
                return firstName() + " " + lastName();
            });
        return {
            firstName: firstName,
            lastName: lastName,
            fullName: fullName
        };
    };

    ko.extenders.required = function (target, overrideMessage) {
        //add some sub-observables to our observable
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        function validate(newValue) {
            target.hasError(newValue ? false : true);
            target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
        }

        //initial validation
        validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    };

    ko.applyBindings(new AppViewModel());

}());
