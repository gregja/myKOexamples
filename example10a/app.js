/*global ko, Router */
(function () {
    'use strict';

    var translations = {
        fr : {
            header: 'Bienvenue',
            body: 'Vous êtes dans la démo de traduction',
            lang_fr: 'Français',
            lang_en: 'Anglais',
            lang_es: 'Espagnol'            
        },
        en : {  
            header: 'Welcome',
            body: "This is the language demo",
            lang_fr: 'French',
            lang_en: 'English',
            lang_es: 'spanish'            
        },
        es : {
            header: 'Bienvenidos',
            body: "Esta es la demostración de idioma",
            lang_fr: 'Francés', 
            lang_en: 'Inglés',
            lang_es: 'Español'            
        }
    };

    function AppViewModel($languages) {
        var self = this;
        self.languages = $languages;

        self.l = ko.observable(self.languages['fr']);

        self.change = function(lang){
            self.l(self.languages[lang]);
            console.log(self.l());
        }
    }

    ko.applyBindings(new AppViewModel(translations));

}());
