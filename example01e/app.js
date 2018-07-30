(function () {
    'use strict';

    // Exemple de "VueModèle" simple définissant le comportement de
    //   l'UI (User Interface)
    function AppViewModel() {
        var self = this;
        // Data Binding dans les 2 sens (en lecture et mise à jour)
        self.firstName = ko.observable("kid");
        self.lastName = ko.observable("paddle");

        var liste = [];
        liste.push({nom:"LAMPION", prenom:"Séraphin"});
        liste.push({nom:"TOURNESOL", prenom:"Tryphon"});
            
        self.names = ko.observableArray(liste);
        
        // Data binding à sens unique (en lecture seule)
        self.fullName = ko.computed(function () {
            return self.firstName() + " " + self.lastName();
        });
        
        // Fonction associée à un événement (en l'occurrence le "submit"
        //   du formulaire)
        self.capitalizeNames = function() {
            var firstName = self.firstName();
            firstName = firstName.trim();
            if (firstName.length > 0) {
                var tmp_name = firstName;
                firstName = tmp_name[0].toUpperCase();
                if (tmp_name.length > 1) {
                    firstName += tmp_name.substring(1).toLowerCase();
                }
            }
            self.firstName(firstName);
            
            var lastName = self.lastName();      
            self.lastName(lastName.trim().toUpperCase());
            
            //self.names.push(self.firstName() + ' ' + self.lastName());
            self.names.push({prenom:self.firstName(), nom: self.lastName()});
        };
        self.removeName = function(item) { 
            self.names.remove(item) 
        }        

    }

    // Démmarrage du data binding dans knockout.js
    ko.applyBindings(new AppViewModel());
}());
