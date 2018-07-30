/*global ko, Router */
(function () {
    'use strict';
     
    ko.validation.init({  
        registerExtenders: true,  
        messagesOnModified: true,  
        insertMessages: true,  
        parseInputAttributes: true,  
        errorClass:'errorStyle',  
        messageTemplate: null  
    }, true);  

    // Captcha Function  
    var captcha = function(val){  
        return val == 50;  
    }  

    //checkPassword Function  
    var checkPassword = function(val, other){  
        return val == other;  
    }  

    var viewModel ={  
        //var self = this;  

        FirstName: ko.observable().extend({ required: true, minLength: 2, maxLength:17}),  
        LastName : ko.observable().extend({ required: true, minLength: 2, maxLength:17}),  
        Email : ko.observable().extend({email: true}),  
        CountryList: ko.observableArray(['Morocco','India','USA']),  
        Country: ko.observable().extend({ required: true}),  
        PhoneNumber: ko.observable().extend({  
            required: true,  
            pattern: {  
                message: 'Phone Number does not match my pattern',  
                params: '^06-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$'  
            }  
        }),  
        Address: ko.observable().extend({required : true}),  
        Password: ko.observable().extend({ required: true }),  
        captcha: ko.observable().extend({  

            //custom Validation  
            validation:{  
                validator: captcha,  
                message: 'Please check your captcha !!'  
            }    
        }),  
        submit : function(){  
            $('div.alert-success').hide();  
            $('div.alert-danger').hide();  
            if(viewModel.errors().length === 0){  
                //alert('Thank you');  
                $('div.alert-success').show();  
            }else{  
                //alert('Please check your submission');  
                $('div.alert-danger').show();  
            }  
        }  
    };  

    //Confirm Password  
    viewModel.ConfirmPassword = ko.observable().extend({  
        validation: {  
            validator: checkPassword,  
            message: 'Please check your password !',  
            params: viewModel.Password  
        }  
    })  
   //Catch errors  
    viewModel.errors = ko.validation.group(viewModel);  
    ko.applyBindings(viewModel);  
 
}());
