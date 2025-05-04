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
    });

    const notranslates = document.querySelectorAll(".notranslate");

    notranslates.forEach(el => {
        const text = el.innerText || el.textContent || "";
        const hasEnglish = /^[a-zA-Z]/.test(text);

        if (hasEnglish) {
            el.style.direction = "ltr";
        } else {
            el.style.direction = isRtl ? "rtl" : "ltr";
        }
    });


    const bulletedListBlocks = document.querySelectorAll(".notion-selectable.notion-bulleted_list-block");
    bulletedListBlocks.forEach(el => {
        el.style.direction = isRtl ? "rtl" : "ltr";
        const notranslates2 = el.querySelectorAll(".notranslate");

        notranslates2.forEach(el => {
            el.style.direction = isRtl ? "rtl" : "ltr";
        });
    });
}

