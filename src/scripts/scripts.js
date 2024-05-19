// @ts-check

(function() {
    // biome-ignore lint/suspicious/noConsoleLog: debugging
    console.log('scripts');
    // // biome-ignore lint/suspicious/noDebugger: debugging
    // debugger;

    // TODO

    addEventListener("load", onLoad);

    function onLoad() {
        const body = document.getElementsByTagName('body')[0];
        const isMain = body && body.classList.contains('page__body--main')
        // biome-ignore lint/suspicious/noConsoleLog: debugging
        console.log('onLoad', {
            body,
            isMain,
        });
        // TODO: If is main, then start update animation properties...
    }
}());
