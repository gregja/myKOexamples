/*global ko, Router */
(function () {
    'use strict';

    // inspiré de : http://jsfiddle.net/davidpadbury/BRP4d/

    ko.components.register('like-widget', {
        viewModel: function(params) {
            // Data: value is either null, 'like', or 'dislike'
            this.chosenValue = params.value;

            // Behaviors
            this.like = function() { this.chosenValue('like'); }.bind(this);
            this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
        },
        template:
            '<div class="like-or-dislike" data-bind="visible: !chosenValue()">\
                <button data-bind="click: like">Like it</button>\
                <button data-bind="click: dislike">Dislike it</button>\
            </div>\
            <div class="result" data-bind="visible: chosenValue">\
                You <strong data-bind="text: chosenValue"></strong> it\
            </div>'
    });

    function Product(name, rating) {
        this.name = name;
        this.userRating = ko.observable(rating || null);
    }

    function MyViewModel() {
        this.products = ko.observableArray([
            new Product('Garlic bread'),
            new Product('Pain au chocolat'),
            new Product('Seagull spaghetti', 'like') // This one was already 'liked'
        ]);
    }
    
    MyViewModel.prototype.addProduct = function() {
        var name = 'Product ' + (this.products().length + 1);
        this.products.push(new Product(name));
    };

    ko.applyBindings(new MyViewModel());

}());
