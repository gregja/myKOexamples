/*global ko, Router */
(function () {
    /*
     * test de perfs par rapport à un post daté de 2011, dont l'auteur se
     * plaignait de problèmes de pers avec Knockout
     * ces problèmes ne se vérifient pas avec la version actuelle, dont les
     * perfs sont excellentes
     */
    
    
    'use strict';

    var tmp_items = [];
    for (var t = 1; t <= 1000; t++)
        tmp_items.push({
        Col1: "C1R" + t.toString(),
        Col2: "C2R" + t.toString(),
        Col3: "C3R" + t.toString(),
        Col4: "C4R" + t.toString(),
        Col5: "C5R" + t.toString(),
        Col6: "C6R" + t.toString(),
        Col7: "C7R" + t.toString(),
        Col8: "C8R" + t.toString(),
        Col9: "C9R" + t.toString(),
        Col10: "C10R" + t.toString(),
        Col11: "C11R" + t.toString(),
        Col12: "C12R" + t.toString()
    });

    var AppViewModel = function() {
        var Items = ko.observableArray(tmp_items);
        return {
            items: Items,
            startTime : (new Date()).getTime()
        };
    };

    ko.applyBindings(new AppViewModel());

}());
