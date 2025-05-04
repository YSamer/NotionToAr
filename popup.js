let isRtl = false;

document.getElementById("toggleButton").addEventListener("click", () => {
    isRtl = !isRtl;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: setDirection,
            args: [isRtl]
        });
    });
});

function setDirection(isRtl) {
    const elements = document.querySelectorAll(".layout-content, .main-container");

    elements.forEach(el => {
        el.style.direction = isRtl ? "rtl" : "ltr";
        console.log(el);
    });

    console.log("Direction applied to multiple elements:", isRtl ? "rtl" : "ltr");
}
