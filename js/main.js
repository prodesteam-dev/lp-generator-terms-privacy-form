(function (d) {
    var config = {
        kitId: 'njb3zoe',
        scriptTimeout: 3000,
        async: true
    },
    h = d.documentElement,
    t = setTimeout(function () { h.className = h.className.replace(/wf-loading/g, "") + " wf-inactive"; }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
    h.className += " wf-loading";
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
        a = this.readyState;
        if (f || a && a != "complete" && a != "loaded") return;
        f = true;
        clearTimeout(t);
        try { Typekit.load(config) } catch (e) { }
    };
    s.parentNode.insertBefore(tk, s)
})(document);

$(document).ready(function () {
    // Scroll animation
    $(window).on("load, scroll", function () {
        $(".u_anime").each(function () {
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if ($(window).width() <= 768) {
                if (scroll > elemPos - windowHeight) {
                    $(this).addClass("show");
                }
            } else {
                if (scroll > elemPos - windowHeight + 80) {
                    $(this).addClass("show");
                }
            }
        });
    });

    // Accordion
    $('.accordion .accordion-tit').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
    });

    // Floating button show/hide based on form position
    var $form = $('#form');
    if ($form.length > 0) {
        var $floating = $('#floating');
        if ($floating.length) {
            var formPos = $form.offset().top;
            var scroll = $(window).scrollTop();
            if (scroll >= formPos) {
                $floating.hide();
            } else {
                $floating.show();
            }
        }
    }

    $(window).on("scroll", function () {
        var $form = $('#form');
        var $floating = $('#floating');

        if ($form.length && $floating.length) {
            const formRect = $form[0].getBoundingClientRect();
            const isAtForm = formRect.top <= $(window).innerHeight() && formRect.bottom >= 0;

            if (!isAtForm) {
                $floating.fadeIn();
            } else {
                $floating.fadeOut();
            }
        }
    });

    // Form validation
    function isCheck() {
        let isValid = true;
        let firstErrorElement = null;

        $('.error-message').remove();

        const requiredFields = [
            { id: 'f_name', label: '名前', selector: '#f_name' },
            { id: 'f_tel', label: '電話番号', selector: '#f_tel' },
            { id: 'f_email', label: 'メールアドレス', selector: '#f_email' },
            { id: 'f_content', label: 'お問い合わせ内容', selector: '#f_content' }
        ];

        requiredFields.forEach(function (field) {
            let value = $(field.selector).val();
            let $formItem = $(field.selector).closest('.c-form__group');
            if (!value || value.trim() === '') {
                isValid = false;
                $formItem.append('<p class="error-message">' + field.label + 'は必須です。</p>');
                if (!firstErrorElement) {
                    firstErrorElement = $formItem;
                }
            }
        });

        // Email validation
        let email = $('#f_email').val();
        let emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
        if (email && !emailRegex.test(email)) {
            isValid = false;
            let $formItem = $('#f_email').closest('.c-form__group');
            $formItem.append('<p class="error-message">メールアドレスの形式が正しくありません。</p>');
            if (!firstErrorElement) {
                firstErrorElement = $formItem;
            }
        }

        // Phone validation
        let phone = $('#f_tel').val();
        let phoneRegex = /^d{10,11}$/;
        if (phone && !phoneRegex.test(phone)) {
            isValid = false;
            let $formItem = $('#f_tel').closest('.c-form__group');
            $formItem.append('<p class="error-message">電話番号は10～11桁の数字で入力してください。</p>');
            if (!firstErrorElement) {
                firstErrorElement = $formItem;
            }
        }

        if (!isValid && firstErrorElement) {
            $('html, body').animate({
                scrollTop: firstErrorElement.offset().top - 80
            }, 300);
        }

        return isValid;
    }

    // Clear error on input change
    $('input, textarea').on('change', function () {
        let $parent = $(this).closest('.c-form__group');
        $parent.find('.error-message').remove();
    });

    // Form submit validation
    $('#reserve_form').on('submit', function (e) {
        if (!isCheck()) {
            e.preventDefault();
        }
    });
});