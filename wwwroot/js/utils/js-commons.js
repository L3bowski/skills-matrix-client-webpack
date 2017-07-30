'use strict';

(function () {
    var JsCommons = {
        actionModal: function actionModal(text, actionName) {
            return new Promise(function (resolve, reject) {
                basicModal.show({
                    body: text,
                    buttons: {
                        cancel: {
                            title: 'Cancel',
                            fn: function fn() {
                                basicModal.close();
                            }
                        },
                        action: {
                            title: actionName,
                            fn: resolve
                        }
                    }
                });
            });
        },
        arrayDifference: function arrayDifference(first, second, propertyName) {
            var result = first.filter(function (firstArrayElement) {
                return second.filter(function (secondArrayElement) {
                    return firstArrayElement[propertyName] === secondArrayElement[propertyName];
                }).length === 0;
            });
            return result;
        },
        delay: function delay(time) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, time);
            });
        },
        eventDelayer: function eventDelayer(eventHandler, delay) {
            var timeOut = null;
            delay = delay || 300;
            return function (event) {
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                timeOut = setTimeout(function () {
                    timeOut = null;
                    eventHandler(event);
                }, delay);
            };
        },
        stallPromise: function stallPromise(promise, minimumTime) {
            return Promise.all([promise, JsCommons.delay(minimumTime)]).then(function (results) {
                return results[0];
            });
        }
    };
    window.JsCommons = JsCommons;
})();