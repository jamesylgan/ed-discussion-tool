// ==UserScript==
// @name         Ed Delete
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  As a result of Georgia Tech HCI SP22's P1Q3
// @author       @jamesylgan -> https://bellevue.tech
// @match        *://edstem.org/us/courses/16797/discussion/*
// @icon         https://www.google.com/s2/favicons?domain=edstem.org
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==
var timeout_total = 10000

$(document).click((function() {
    function applyUpdates() {
        // get posts
        var posts = document.getElementsByClassName("dlv-item");
        if (posts.length == 0) {
            // HTML of our interest not available yet
            return;
        }
        //else {
        //    console.log("elements found");
        //    console.log(posts.length);
        //}
        for (let i = 0; i < posts.length; i++) {
            setTimeout(() => {
                if (((posts[i].innerText.toLowerCase().includes("Q3"))) || (posts[i].innerText.toLowerCase().includes("test"))) { // configure here
                    var deletingPost = posts[i]
                    timeout_total += 10000
                    console.log("deleting " + deletingPost.innerText + " with timeout " + timeout_total.toString());
                    setTimeout(() => {
                        deletingPost.children[0].click();
                        var buttons = document.getElementsByClassName("disucss-thread-action ed-focus-outline");
                        if (buttons.length > 2) {
                            console.log("Clicking initial delete");
                            buttons[2].click(); // click initial delete button
                        }
                        setTimeout(() => {
                            var confirm_buttons = document.getElementsByClassName("alert-button");
                            if (confirm_buttons.length > 0) {
                                console.log("clicking confirm delete");
                                confirm_buttons[1].click();
                            }}, 1000); // confirm delete click
                    }, timeout_total + 2000);
                }
            }, timeout_total);
        }
    };

    var MutationObserver = window.MutationObserver;
    // setTimeout(applyUpdates, 4000);
    var myObserver       = new MutationObserver (applyUpdates);
    var obsConfig        = {
        childList: true, attributes: true,
        subtree: true,   attributeFilter: ['class']
    };

    myObserver.observe(document, obsConfig);
}));
