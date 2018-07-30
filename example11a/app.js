/*global ko, Router */
(function () {
    'use strict';

    ko.extenders.required = function (target, overrideMessage) {
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();
        
        function validate(newValue) {
            var error = newValue ? false : true;
            target.hasError(error);
            target.validationMessage(!error ? "" : overrideMessage || "This field is required");
        }

        validate(target());
        target.subscribe(validate);
        return target;
    };
    ko.extenders.maxlength = function (target, options) {
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();
        var message = options.message || '';
        var maxsize = options.maxsize || 256;
        
        function validate(newValue) {
            var error = newValue.length > maxsize ? true : false;
            target.hasError(error);
            target.validationMessage(!error ? "" : message || "This field is too large");
        }

        validate(target());
        target.subscribe(validate);
        return target;
    };
    ko.extenders.currency = function(target, options) {
        var currencySymbol = options.symbol || '€';
        var position = options.position;
        var result = ko.computed({
            read: target,  
            write: function(newValue) {
                var current = String(target());
                current = current.replace(currencySymbol, '');
                if (position === 'left') {
                    target(currencySymbol+current);
                } else {
                    target(current+currencySymbol);
                }
            }
        }).extend({ notify: 'always' });
        
        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };
       
    ko.extenders.numeric = function(target, precision) {
        //create a writable computed observable to intercept writes to our observable
        var result = ko.pureComputed({
            read: target,  //always return the original observables value
            write: function(newValue) {
                var current = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newValueAsNum = window.isNaN(newValue) ? 0 : +newValue,
                    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    //if the rounded value is the same, but a different value was written, force a notification for the current field
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        }).extend({ notify: 'always' });

        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };

    function formatToNumber(str, decimals) {
        // https://thecodersperspective.wordpress.com/tag/knockoutjs/
        var roundingMultiplier = Math.pow(10,decimals);

        //Strip out everything except numbers and decimals (also strip out '%' and 'R')
        var newValueAsNum = new String(str).replace(/[^0-9\.]/g,'');
        if (isNaN(newValueAsNum))
        {
            //can happen with two decimals.
            newValueAsNum = 0;
        }
        var valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

        return valueToWrite;
    }
    
    //Add formatted observable to the target observable.
    ko.extenders.addPercentageFormatted = function(target, decimals) {
        // https://thecodersperspective.wordpress.com/tag/knockoutjs/
        target.formatted = ko.computed({
            read: function() {
                var val = target();
                return val.toFixed(decimals) + '%';
            },
            write: function(newValue) {
                var current = target();
                var valueToWrite = formatToNumber(newValue, decimals);

                //only write if it has changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        });
        return target;
    };



    //Add formatted observable to the target observable.
    ko.extenders.addCurrencyFormatted = function(target, decimals) {
        // https://thecodersperspective.wordpress.com/tag/knockoutjs/
        target.formatted = ko.computed({
            read: function() {
                var val = target();
                //Insert 1000 space.
                var formattedValue = ('€ ' + val).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return formattedValue;
            },
            write: function(newValue) {
                var current = target();
                var valueToWrite = formatToNumber(newValue, decimals);

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        });
        return target;
    };

    //Intercept to ensure only numbers and '.' are entered.
    ko.extenders.ensureNumeric = function(target, precision) {
        // https://thecodersperspective.wordpress.com/tag/knockoutjs/
        //create a writeable computed observable to intercept writes to our observable
        var result = ko.computed({
            read: target,  //always return the original observables value
            write: function(newValue) {
                var current = target();
                var valueToWrite = formatToNumber(newValue, precision);

                //only write if it changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        }).extend({ notify: 'always' });
        //initialize with current value to make sure it is rounded appropriately
        result(target());

        //return the new computed observable
        return result;
    };

    ko.subscribable.fn.addFormattedCurrency = function(decimals){
        // https://thecodersperspective.wordpress.com/tag/knockoutjs/
        var target = this;
        target.formatted = ko.computed({
            read: function() {
                var val = target();
                val = formatToNumber(val, decimals);
                var formattedValue = ('€ ' + val).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                return formattedValue;
            },
            write: function(newValue) {
                var current = target();
                var valueToWrite = formatToNumber(newValue, decimals);

                //only write if it has changed
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        });
        return this;
    }

    function AppViewModel(one, two) {
        var self = this;
        self.firstName = ko.observable('Kid').extend({ required: "firstname is required" });
        self.lastName = ko.observable('Paddle').extend({ maxlength: {message:"lastname exceeds 30 characters", maxsize:30}});

        self.myNumberOne = ko.observable(one).extend({ numeric: 0 });
        self.myNumberTwo = ko.observable(two).extend({ numeric: 2 });

        var currencyOptions = { symbol: '€', position: 'left' };
        self.one = ko.observable(one).extend({ currency: currencyOptions });

        self.amount1 = ko.observable(100).addFormattedCurrency(2);

        self.amount2 = ko.observable(50).extend({ addCurrencyFormatted:2 });

        self.amount3 = ko.observable(12).extend({ ensureNumeric:2 });

        self.percentage = ko.observable(50).extend({ addPercentageFormatted:2 });

        self.fullName = ko.computed(function () {
            return self.firstName().trim() + " " + self.lastName().trim();
        }, this);
        
        self.capitalizeLastName = function() {
            var currentVal = self.lastName().trim();        // Read the current value
            self.lastName(currentVal.toUpperCase()); // Write back a modified value
        };
        self.submitForm = function() {
            self.capitalizeLastName();
        };

    }

    ko.applyBindings(new AppViewModel(221.2234, 123.4525));
}());
