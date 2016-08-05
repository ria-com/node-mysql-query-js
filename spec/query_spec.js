//Load our function
var query = require('../lib/mysql-query');
var testRows;

describe("Simple query param's testing", function () {
    "use strict";

    var qs = "show databases";

    beforeEach(function (done) {
            query(qs, function (err, rows, fields) {
                if (err) throw err;
                testRows = rows;

                done();
            })
    });

    it("Проверяем работоспособность при минимальистическом числе параметров", function (done) {
        expect(testRows.length).toBeGreaterThan(1);

        done();
    });
});



describe("Master query param's testing", function () {
    "use strict";

    var qs = "show databases";
    var testRows2;

    beforeEach(function (done) {
        query(qs, 'master', function(err, rows, fields) {
            if (err) throw err;
            testRows2 = rows;

            done();
        });
    });

    it("Проверяем работоспособность при минимальистическом числе параметров", function (done) {
        expect(testRows2.length).toBeGreaterThan(1);
        expect(testRows2).toEqual(testRows);

        done();
    });
});

describe("Master query param's testing", function () {
    "use strict";

    var qs = "show databases";
    var testRows2;

    beforeEach(function (done) {
        query(qs, ['param1', 'param2'], 'master', function(err, rows, fields) {
            if (err) throw err;
            testRows2 = rows;

            done();
        });
    });

    it("Проверяем работоспособность при минимальистическом числе параметров", function (done) {
        expect(testRows2.length).toBeGreaterThan(1);
        expect(testRows2).toEqual(testRows);

        done();
    });
});
