/*global ko, Router */
(function ($) {
    'use strict';

    function Task(data) {
        this.title = ko.observable(data.title);
        this.isDone = ko.observable(data.isDone);
    }

    function TaskListViewModel() {
        // Data
        var self = this;
        self.tasks = ko.observableArray([]);
        self.newTaskText = ko.observable();

        self.incompleteTasks = ko.computed(function() {
            return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() && !task._destroy });
        });

        // Operations
        self.addTask = function() {
            self.tasks.push(new Task({ title: this.newTaskText() }));
            self.newTaskText("");
        };
        self.removeTask = function(task) {
            self.tasks.destroy(task)  // add flag "_destroy:true" to transmit to server for deletion
            //self.tasks.remove(task)
         };
        self.save = function() {
            $.ajax("/tasks", {
                data: ko.toJSON({ tasks: self.tasks }),
                type: "post", contentType: "application/json",
                success: function(result) { alert(result) }
            });
        };         
        // Load initial state from server, convert it to Task instances, then populate self.tasks
        //  $.getJSON("/tasks", function(allData) {
        $.getJSON("tasks.json", function(allData) {
            var mappedTasks = $.map(allData, function(item) { return new Task(item) });
            self.tasks(mappedTasks);
            /*
             * don't recall ko.applyBindings after loading the data. 
             * Many Knockout newcomers make the mistake of trying to re-bind 
             * their UI every time they load some data, but that's not useful. 
             * There's no reason to re-bind - simply updating your existing 
             * viewmodel is enough to make the whole UI update.
             */
        });
    }

    ko.applyBindings(new TaskListViewModel());

}(jQuery));
