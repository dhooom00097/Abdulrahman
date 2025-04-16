// وظائف تبديل اللغة وتفعيل ميزات الموقع التفاعلية

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة اللغة الافتراضية (العربية)
    document.body.setAttribute('dir', 'rtl');
    
    // تبديل اللغة
    const arBtn = document.getElementById('ar-btn');
    const enBtn = document.getElementById('en-btn');
    const arElements = document.querySelectorAll('.ar');
    const enElements = document.querySelectorAll('.en');
    
    // زر اللغة العربية
    arBtn.addEventListener('click', function() {
        // تغيير اتجاه الصفحة
        document.body.setAttribute('dir', 'rtl');
        
        // تفعيل زر اللغة العربية
        arBtn.classList.add('active');
        enBtn.classList.remove('active');
        
        // إظهار عناصر اللغة العربية وإخفاء عناصر اللغة الإنجليزية
        arElements.forEach(el => el.classList.add('active'));
        enElements.forEach(el => el.classList.remove('active'));
    });
    
    // زر اللغة الإنجليزية
    enBtn.addEventListener('click', function() {
        // تغيير اتجاه الصفحة
        document.body.setAttribute('dir', 'ltr');
        
        // تفعيل زر اللغة الإنجليزية
        enBtn.classList.add('active');
        arBtn.classList.remove('active');
        
        // إظهار عناصر اللغة الإنجليزية وإخفاء عناصر اللغة العربية
        enElements.forEach(el => el.classList.add('active'));
        arElements.forEach(el => el.classList.remove('active'));
    });
    
    // تصفية المشاريع
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الأزرار
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            this.classList.add('active');
            
            // الحصول على فئة التصفية
            const filterValue = this.getAttribute('data-filter');
            
            // تصفية المشاريع
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // تفعيل القائمة المنسدلة في الشاشات الصغيرة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على أي رابط
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // تغيير شكل شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // تنعيم التمرير عند النقر على روابط التنقل
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثيرات ظهور العناصر عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تطبيق تأثيرات الظهور عند تحميل الصفحة
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.skill-item, .project-card, .contact-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // تأخير قصير قبل تطبيق التأثيرات
        setTimeout(animateOnScroll, 300);
    });
    
    // تطبيق تأثيرات الظهور عند التمرير
    window.addEventListener('scroll', animateOnScroll);
    
    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكن إضافة رمز لإرسال النموذج إلى الخادم
            // في هذا المثال، سنعرض رسالة نجاح فقط
            
            const formData = new FormData(contactForm);
            let formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            console.log('Form submitted:', formValues);
            
            // إعادة تعيين النموذج وعرض رسالة نجاح
            contactForm.reset();
            
            // إنشاء عنصر رسالة النجاح
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            
            // تعيين محتوى الرسالة حسب اللغة الحالية
            if (document.body.getAttribute('dir') === 'rtl') {
                successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.';
            } else {
                successMessage.textContent = 'Your message has been sent successfully! We will contact you soon.';
            }
            
            // تنسيق الرسالة
            successMessage.style.backgroundColor = '#4CAF50';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '8px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            
            // إضافة الرسالة بعد النموذج
            contactForm.parentNode.appendChild(successMessage);
            
            // إزالة الرسالة بعد 5 ثوانٍ
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
});
