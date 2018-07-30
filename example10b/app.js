/*global ko, Router */
(function () {
    'use strict';

    var translations = {};
    translations.fr = {
        header: "Bienvenue",    
        body: 'Vous êtes dans la démo de traduction',
        lang_fr: 'Français',
        lang_en: 'Anglais',
        lang_es: 'Espagnol'
    };
    translations.en = {
        header: "Welcome",
        body: "This is the language demo",
        lang_fr: 'French',
        lang_en: 'English',
        lang_es: 'spanish'
    }
    translations.es = {
        header: "Bienvenidos",    
        body: "Esta es la demostración de idioma",
        lang_fr: 'Francés', 
        lang_en: 'Inglés',
        lang_es: 'Español'
    };
    
    var ViewModel = function (translations) {  
        var self = this;
        self.translations = translations;
        self.l = ko.observable(self.translations.fr);
        self.chooselanguage = function (event, object) {
            //console.log(event);
            //console.log(object);
            var lang = object.target.getAttribute('data-lang');
            self.l(self.translations[lang]);
        };
    };

    ko.applyBindings(new ViewModel(translations));


}());
