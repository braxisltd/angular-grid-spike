'use strict';

describe('Scenarios examples', function () {

    beforeEach(function () {
        browser().navigateTo('../../app/scenarios.html');
    });

    describe('Example 1: Simple click and assert value present in textbox and span.', function () {

        var expected = "my value";

        beforeEach(function () {
            input("eg1.input").enter(expected);
            element(".eg1 .btn").click();
        });

        it('value should be copied into another input', function () {
            expect(input("eg1.output").val()).toEqual(expected);
        });

        it('value should be copied into a span', function () {
            expect(element(".eg1 .output").text()).toEqual(expected);
        });

    });

    describe('Example 2: Select value should be copied to another select.', function () {

        it('value should be copied into another input', function () {
            var expected = "Option 2";
            select("eg2.input").option(expected);
            element(".eg2 .btn").click();
            expect(select("eg2.output").selectedOption()).toEqual(expected);
        });

    });

    describe('Example 3: Interacting with and asserting on elements created in repeaters.', function () {

        it('Second input should have its value updated (Using element index selectors).', function () {
            using(".eg3 p:eq(1)").element("button").click();
            var secondInputValueFuture = using(".eg3 p:eq(1)").input("text.from").val();
            expect(secondInputValueFuture).toEqual("changed!");
        });

    });

    describe('Example 3: Interact with and assert on elements created in a repeater using other fields to find them.', function () {

        it('Second input should have its value updated (Using class selectors).', function () {
            repeater("eg4 tr").row(1).behaviour(function(error, result) {
                dump(result);
            });
        });

    });
});
