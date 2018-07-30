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
        self.goToFolder = function(folder) { location.hash = folder };
        self.goToMail = function(mail) { location.hash = mail.folder + '/' + mail.id };

        // Behaviours
//        self.goToFolder = function(folder) {
//            self.chosenFolderId(folder);
//            self.chosenMailData(null); // Stop showing a mail
//            // $.get('/mail', { folder: folder+'.json' }, self.chosenFolderData);
//            $.get('mail/'+folder+'.json', { }, self.chosenFolderData);
//        };    
//        
//        self.goToMail = function(mail) { 
//            self.chosenFolderId(mail.folder);
//            self.chosenFolderData(null); // Stop showing a folder
//            // on triche car la fonction serveur n'est pas implémentée
//            //   donc on renvoie toujours le même mail
//            $.get('mail/onemail.json', { }, self.chosenMailData);
//        };

        // Client-side routes    
        Sammy(function() {
            this.get('#:folder', function() {
                self.chosenFolderId(this.params.folder);
                self.chosenMailData(null);
                //$.get("/mail", { folder: this.params.folder }, self.chosenFolderData);
                $.get('mail/'+this.params.folder+'.json', { }, self.chosenFolderData);
            });

            this.get('#:folder/:mailId', function() {
                self.chosenFolderId(this.params.folder);
                self.chosenFolderData(null);
                //$.get("/mail", { mailId: this.params.mailId }, self.chosenMailData);
                $.get('mail/onemail.json', { }, self.chosenMailData);
            });
            
            this.get('', function() { this.app.runRoute('get', '#Inbox') });
             
        }).run();
        
    };

    ko.applyBindings(new WebmailViewModel());

}());
