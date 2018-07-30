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


        
    ko.components.register('my-form', {
        template: `
            <form data-bind="submit: capitalizeNames">
                <p><label>Prénom : <input data-bind="value: firstName" /></label></p>
                <p><label>Nom: <input data-bind="value: lastName" /></label></p>
                <p>Nom complet: <strong data-bind="text: fullName" ></strong></p>

                <button type="submit">Valider</button>
            </form>`
    });

    ko.components.register('my-list', {
        template: `
            <table data-bind="if: names().length > 0" >
                <thead><tr>
                    <th>Id</th><th>Nom et prénom</th><th>Action</th>
                </tr></thead>
                <tbody data-bind="foreach: names">
                    <tr>
                        <td data-bind="text: ($index() + 1)"></td>
                        <td data-bind="text: $data.nom+' '+$data.prenom"></td>
                        <td><a href="#" data-bind="click: $parent.removeName">Supprimer</a></td>
                    </tr>
                </tbody>
            </table> 
            <!-- ko if : names().length > 0 -->
            <p>Nombre d'inscrits : <span data-bind="text: names().length"</span></p>
    <!-- /ko -->
`
    });
    
    ko.components.register('my-form-list', {
        viewModel: AppViewModel,
        template: `
        <my-form params='{firstName: firstName, lastName: lastName, 
          fullName: fullName, capitalizeNames: capitalizeNames}'></my-form>
        <my-list params='{names: names, removeName: removeName}'></my-list>
        `
    });


    // Démmarrage du data binding dans knockout.js
    ko.applyBindings();
}());
