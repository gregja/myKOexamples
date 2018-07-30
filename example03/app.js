/*global ko, Router */
(function () {
    'use strict';

    function WebmailViewModel() {
        // Data
        var self = this;
        self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
        self.chosenFolderId = ko.observable();
        self.chosenFolderData = ko.observable();
        self.chosenMailData = ko.observable();

        // Behaviours
        self.goToFolder = function(folder) {
            self.chosenFolderId(folder);
            self.chosenMailData(null); // Stop showing a mail
            // $.get('/mail', { folder: folder+'.json' }, self.chosenFolderData);
            $.get('mail/'+folder+'.json', { }, self.chosenFolderData);
        };    
        
        self.goToMail = function(mail) { 
            self.chosenFolderId(mail.folder);
            self.chosenFolderData(null); // Stop showing a folder
            // on triche car la fonction serveur n'est pas implémentée
            //   donc on renvoie toujours le même mail
            $.get('mail/onemail.json', { }, self.chosenMailData);
        };

        // Show inbox by default
        self.goToFolder('Inbox');
    };

    ko.applyBindings(new WebmailViewModel());

}());
