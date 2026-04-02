window.addEventListener('load', () => {
    const progressBar = document.getElementById('loader-progress');
    const loader = document.getElementById('loader');

    // تفعيل بار التحميل
    if(progressBar) {
        progressBar.style.width = '100%';
    }

    // إخفاء الشاشة بعد ثانية ونصف
    setTimeout(() => {
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    }, 1500);
});