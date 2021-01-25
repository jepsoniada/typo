chrome.runtime.onMessage.addListener(function (req) {
    if (req.type == "openOptions") {
        chrome.runtime.openOptionsPage()
    }
})