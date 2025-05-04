let isRtl = false;

document.getElementById("toggleButton").addEventListener("click", function () {
    // التبديل بين RTL و LTR
    isRtl = !isRtl;
    if (isRtl) {
        // إضافة خاصية direction: rtl لجميع العناصر التي تحتوي على class "layout-content"
        chrome.tabs.executeScript({
            code: `
                const elements = document.querySelectorAll('.layout-content');
                elements.forEach(el => el.style.direction = 'rtl');
            `
        });
    } else {
        // إزالة خاصية direction أو تعيينها إلى ltr
        chrome.tabs.executeScript({
            code: `
                const elements = document.querySelectorAll('.layout-content');
                elements.forEach(el => el.style.direction = 'ltr');
            `
        });
    }
});

// document.getElementById("payButton").addEventListener("click", function () {
//     // يمكنك دمج نظام الدفع هنا
//     alert("تم الدفع بنجاح! يمكنك الآن استخدام كل الميزات.");
// });
