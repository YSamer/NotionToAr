let isRtl = false;

// عند تحميل popup
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["isRtl"], (result) => {
        isRtl = result.isRtl || false;
        updateButtonText();
    });

    document.getElementById("toggleButton").addEventListener("click", () => {
        isRtl = !isRtl;
        chrome.storage.local.set({ isRtl });
        updateButtonText();

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: setDirection,
                args: [isRtl],
            });
        });
    });
});

function updateButtonText() {
    document.getElementById("toggleButton").innerText = isRtl ? "تحويل إلى LTR" : "تحويل إلى RTL";
}

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

