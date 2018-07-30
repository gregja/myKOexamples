/*global ko, Router */
(function () {
    'use strict';

    // inspiré de : http://jsfiddle.net/davidpadbury/BRP4d/

    ko.components.register('word-editor', {
        viewModel: function(params) {
            console.log(params);
            this.newWord = ko.observable(params && params.newWord || '');
        },
        template: '<form data-bind="submit: $parent.add">' +
                '<input placeholder="New Word" data-bind="value: $parent.newWord" autofocus />'+
                '</form>'
    });

    //var $wordList = $('#word-list'),
    function wordsViewModel ()  {
        var self = this;
        self.words = ko.observableArray();
        self.newWord = ko.observable();
        self.add = function() {
            self.words.push( self.newWord() );
            self.newWord('');
        };
        self.wordAdded = function(el) {
            //console.log(el)
        }
    };

    ko.applyBindings(new wordsViewModel(), document.getElementById("liveExample"));

}());
