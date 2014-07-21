Flycats = window.Flycats || {};
Flycats.common = Flycats.common || {};

var debug = 1;
Flycats.common.page = {
    init: function () {
        this.jcarousel('.slider');
        this.datepicker('input.datepicker');
        this.checkboxes('.title input[type="checkbox"],.date-check input[type="checkbox"],.direct-flights input[type="checkbox"]');
        this.kostili();
        this.initPopups();
        this.responsiveNavigation('ul.b-nav');
        this.counters('.counter');
        this.initTravelServices('.additional-services fieldset');
        this.dropDowns('.dropdowns,.b-dropdown__header');
        this.autocomplete('.b-input_long .b-input__input');
//        this.scrollable('#header');
        this.trimText(9,'.info-flight span,.info-flight strong,.company-info dd,.ch__item,.item strong.city');
    },

    autocomplete: function (selector) {


        $(function () {

            var flyes = [
                {
                    label: "Новосибирск",
                    city: "Россия",
                    code: "OVB"
                },
                {
                    label: "Санкт-Петербург",
                    city: "Россия",
                    code: "SPB"
                },
                {
                    label: "Москва",
                    city: "Россия",
                    code: "MSK"
                }
            ];

            $(selector).each(function () {
                var self = $(this),
                    codeSpan = self.parent().find('.b-input__code'),
                    clear = self.parent().find('.b-input__clear'),
                    arrow = self.parent().find('.input_icon__arrow');

                clear.hide();

                self
                    .bind("keydown", function (event) {
                        if (event.keyCode === $.ui.keyCode.TAB &&
                            $(this).autocomplete("instance").menu.active) {
                            event.preventDefault();
                        }
                    })
                    .autocomplete({
                        source: flyes,
                        minLength: 0,
                        minChars: 0,
                        autoFill: true,
                        mustMatch: true,
                        matchContains: false,
                        scrollHeight: 220,
                        focus: function (event, ui) {
                            self.val(ui.item.label);
                            return false;
                        },
                        select: function (event, ui) {
                            codeSpan.text(ui.item.code);
                            self.val(ui.item.label);
                            clear.show();
                            return false;
                        },
                        open: function () {
                            $(this).addClass("hide-border");
                        },
                        close: function () {
                            $(this).removeClass("hide-border");
                        }
                    })
                    .data("ui-autocomplete")._renderItem = function (ul, item) {

                    var cleanTerm = this.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    var keywords = $.trim(cleanTerm).replace('  ', ' ').split(' ').join('|');
                    var re = new RegExp("(" + keywords + ")", "gi");
                    var output = item.label.replace(re,
                        '<span>$1</span>');

                    var wrapper = $('<div/>')
                            .append('<span class=\"code\">' + item.code + '</span>')
                            .append('<span class=\"route-location\"/>'),
                        label = wrapper.find('span.route-location').append('<span>' + output + ', <span/>').append(item.city);
                    return $("<li>").addClass('b-route-list__item').append($("<a>").html(wrapper))
                        .appendTo(ul);
                };

                clear.on('click', function () {
                    self.val('');
                    codeSpan.text('');
                    clear.hide()
                });
                arrow.on('click', function (event) {
                    self.focus().autocomplete("search", "");
                });
            });


            $('.ui-autocomplete').addClass('b-input__list').prepend('<li><span class=\"b-route-list__header\">Подходящие аэропоты или города</span></li>');
        });
    },

    activateRouteList: function (selector) {
    },


    dropDowns: function (selector) {

        $(selector).on('click', function () {
            console.log('asdsad')
            if (!$(this).parent().hasClass('opened')) {
                $(selector).parent().removeClass('opened');
                $(this).parent().addClass('opened');
            } else {
                $(selector).parent().removeClass('opened');
            }
        });
        $('.select-custom-value').on('click', function () {
            if ($(this).parent().is('#focus-field')) {
                $('div#focus-field').each(function () {
                    $(this).removeClass('bordered');
                });
                $(this).parent().addClass('bordered');
            }
        })
    },

    jcarousel: function (selector) {
        $(selector).each(function () {
            var jcarousel = $(this).find('.jcarousel');
            jcarousel
                .jcarousel({
                    wrap: 'circular',
                    transitions: Modernizr.csstransitions ? {
                        transforms: Modernizr.csstransforms,
                        transforms3d: Modernizr.csstransforms3d,
                        easing: 'ease'
                    } : false
                });

            $(this).find('.jcarousel-control-prev,.prev')
                .jcarouselControl({
                    target: '-=1'
                });

            $(this).find('.jcarousel-control-next,.next')
                .jcarouselControl({
                    target: '+=1'
                });
        })
    },

    checkboxes: function (selector) {
//        $(selector).button();
    },

    datepicker: function (selector) {
        $(selector).datepicker(
            $.extend({
                    numberOfMonths: 2,
                    showOtherMonths: true,
                    dateFormat: 'dd.mm.y'
                },
                $.datepicker.regional['ru']
            )
        );

//        $(".option.language a").click(function(e) {
//            e.preventDefault();
//            $('.option.language > span').html($(this).html());
//            $("input.datepicker").datepicker("option",
//                $.datepicker.regional[$(this).data('lang')]);
//        });

        $('input.datepicker').mask("99.99.99");
    },

    debug: function (what) {
        if (debug == 1) {
            console.log('#Flycats.common.page | ' + what);
        }
    },

    _trimtext: function (selector, maxSimbols) {
        $(selector).each(function () {
            if ($(this).text().length > maxSimbols) {
                $(this).text($(this).text().substr(0, maxSimbols));
                $(this).append('...');
            }
        })
    },

    initPopups: function () {
//        $('.slider a.hover-info').on('click', function (e) {
//
//            e.preventDefault();
//            var offset = $(this).offset();
//            // alert(e.clientX - offset.left);
//            // alert(e.clientY - offset.top);
//            var thisSlider = $(this).closest('div.slider'),
//                thisSlide = $(this).closest('li'),
//                x = $(this).offset();
//            thisSlider.find('.hover-items ul').eq(thisSlide.index()).css({
//                left: e.clientX,
//                top: e.clientY + 20,
//                'position': 'fixed'
//            }).fadeToggle();
////            this.debug(thisSlide.index());
//        });

        $('.hover-items ul').hide();

        $('a.share_hover').next('.social-panel').hide();

        $('.share_hover').on('click', function (e) {
            e.preventDefault();
            $(this).next('.social-panel').fadeToggle();
        });
        $('.show-more-hover').on('click', function (e) {
            e.preventDefault();
//            $('.show-all-modal__wr').fadeToggle();
            $('.show-all-modal__wr').addClass('show-all-modal__v');
            $('body').css('overflow', 'hidden');
        });

        $('.slider a.hover-info').on('click', function (e) {
            e.preventDefault();
            $('.proposals').css({
                'top': e.pageY + 30,
                'position': 'absolute',
                'left': e.pageX + 20
            }).children().show();

        });


        $('.social-panel.drop .close,.show-all-modal .close').on('click', function (e) {
            e.preventDefault();
            $(this).parent().fadeToggle();
            $('.show-all-modal__wr').removeClass('show-all-modal__v');
            $('body').css('overflow', 'visible');
        });
        $(document).mouseup(function (e) {
            var container = $(".dropdown");

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide(0);
                $('.show-all-modal__wr').removeClass('show-all-modal__v');
                $('body').css('overflow', 'visible');
            }
        });
    },
    trimText: function (maxSimbols,selector) {
        $(selector).each(function () {
            if ($(this).text().length > maxSimbols) {
                $(this).attr('title', $(this).text());
                $(this).text($(this).text().substr(0, maxSimbols));
                $(this).append('...');
            }
        });
    },
    kostili: function () {
        $('.b-dropdown_small').find('.b-dropdown__link').on('click', function (e) {
            e.preventDefault();
            $('.b-dropdown').removeClass('opened');
            $(this).parents('.b-dropdown_small').last().find('.b-dropdown__header').html($(this).html());
        });

        $('.b-input_select.currency').selecter({
            customClass: 'b-dropdown b-dropdown_small'
        });
        $('.b-input_select.class').selecter({
            customClass: 'b-input b-input_middle b-dropdown class'
        }).parent().append("<i class=\"input_icon__class\"/><span class=\"b-input__help\">Класс</span>");

        $('.b-input__checkbox').each(function () {
            $(this).icheck({
                checkboxClass: 'b-input__checkbox'
            });
        });

        $('.direct-flights [type=\'checkbox\'],.checkbox_item input[type=\"checkbox\"]').icheck({
            checkboxClass: 'b-input__checkbox_sm'
        });

        $('.b-input__checkbox_big').each(function () {
            $(this).icheck({
                checkboxClass: 'b-input__checkbox_big'
            });
        });

        // TODO: delete next link when btn will be active
        $('.search-form-submit__input').on('click', function () {
            window.location.href = 'landing.html';
        });

        // city trim

        if ($('.brands-slider').is(':hidden')) {
            $('div#tab-block').addClass('right_bottom_border');
        }
    },

    responsiveNavigation: function (selector) {
        $(selector).slicknav({
            label: '',
            prependTo: 'div.b-header__inner'
        });
    },

    counters: function (selector) {
        $(selector).each(function () {
            var holder = $(this),
                btnIncr = holder.find('.b-input__incr'),
                btnDecr = holder.find('.b-input__decr'),
                qtyField = holder.find('.b-input__input');
            holder.find('.b-input__decr,.b-input__incr').on('mousedown', function (e) {
                qtyField.css('boxShadow', '0 0 0px 4px #3fa492');
            });
            holder.find('.b-input__decr,.b-input__incr').on('mouseup', function (e) {
                qtyField.css('boxShadow', '0 0 0px 4px transparent');
            });
            btnIncr.bind('click', function (e) {
                e.preventDefault();
                var val = parseInt($.trim(qtyField.val()));
                if (!isNaN(val)) {
                    val++;
                    qtyField.val(val);
                }
            });
            btnDecr.bind('click', function (e) {
                e.preventDefault();
                var val = parseInt($.trim(qtyField.val()));
                if (!isNaN(val)) {
                    val--;
                    if (val > -1) qtyField.val(val);
                }
            });
        });
    },

    initTravelServices: function (selector) {
        $(selector).each(function () {
            var filedset = $(this),
                chk = filedset.find('.title input:checkbox'),
                chkLabel = filedset.find('.title label'),
                optionsBlock = filedset.find('.service-options'),
                btn = optionsBlock.find('input:button');

            if (chk.get(0).checked) {
                optionsBlock.show().prev().addClass('no_btm_border');
            } else {
                optionsBlock.hide().prev().removeClass('no_btm_border');
            }

            chk.bind('change', function () {
//                this.debug(chk.get(0).checked);
                if (chk.get(0).checked) {
                    optionsBlock.show().prev().addClass('no_btm_border');
                } else {
                    optionsBlock.hide().prev().removeClass('no_btm_border');
                }
            });

            chkLabel.bind('click', function (e) {
                if (chk.get(0).checked && optionsBlock.is(':hidden')) {
                    optionsBlock.show().prev().addClass('no_btm_border');
                    return false;
                }

            });

            btn.bind('click', function (e) {
                optionsBlock.hide().prev().removeClass('no_btm_border');

                e.preventDefault();
            });
        })

    },

    scrollable: function (selector) {
        if ($(window).scrollTop() >= 55) {
            $(selector).addClass('scrollable');
        } else {
            $(selector).removeClass('scrollable');
        }
    }


};

$(function () {
    Flycats.common.page.init();
    Flycats.common.page.scrollable('#header');
});

$(window).scroll(function () {
    Flycats.common.page.scrollable('#header');
});


Flycats.iefixes = {
    init: function () {
        this.placeholder('[placeholder]');
    },
    placeholder: function (selector) {
        $(selector).focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
};

jQuery(function () {
//    initHeaderSelects();
//    initCustomSelects();
//    initCounter();
//    initLightbox();
//    initSearch();
//    initTravelServices();
    initCustomSelect();
//    initNiseCheck();
//    initScrollable();

    $('.route-input > input[type="text"]').keydown(function () {
        $(this).parent().children('.route-list').show();
        $(this).parent().addClass('opened');
    });

    $('.route-list-content > ul > li').click(function () {
        var parent = $(this).parents('.route-input:first');
        parent.children('input[type="text"]').val($(this).children('.route-location').text());
        parent.children('.code').text($(this).children('.code').text());
        parent.children('.route-list').hide();
        parent.children('.remove_input').show();
        parent.removeClass('opened');
    });

    $(document).mouseup(function (e) {
        var container = $(".route-list.dropdown");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.parent().removeClass('opened');
        }
    });


});

$(document).mouseup(function (e) {
    var container = $(".select-custom.opened");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.removeClass('opened');
    }
});

function initCustomSelect() {
    $('.select-box > span').click(function (e) {
        /// <summary>Open select box</summary>
        /// <param name="e" type="Object"></param>

        $('.select-box').not($(this).parent()).removeClass('opened');
        e.stopImmediatePropagation();
        $(this).parent().addClass('opened');
    });

    $('.select-box-list').click(function (e) {
        e.stopImmediatePropagation();
    });

    $('body').click(function () {
        $('.select-box').removeClass('opened');
    });

//    $('select').each(function () {
//        var sel = $(this);
//        sel.chosen({
//            disable_search: true,
//            enable_split_word_search: false,
//            max_selected_options: 1,
//            no_results_text: '',
//            disable_search_threshold: 100
//        });
//        var chosenCont = sel.parent().find('.chosen-container');
//        chosenCont.trigger('mousedown.chosen');
//        setTimeout(function () {
//            chosenCont.find(' > a').removeAttr('href');
//            chosenCont.find(' .chosen-search').remove();
//            chosenCont.find('.chosen-drop').jScrollPane({
//                showArrows: true
//            });
//        }, 1000);
//    });
    setTimeout(function () {
        $(document).trigger('click.chosen');
    }, 100);
}

function initNiseCheck() {
    $('.nice-check').change(function () {
        var parent = $(this).parents('.search-date'),
            dateBox = parent.find('.last-child');
        if (this.checked) {
            dateBox.removeClass('disabled');
            dateBox.find('.datepicker').removeAttr('disabled');
        } else {
            dateBox.addClass('disabled');
            dateBox.find('.datepicker').attr('disabled', 'disabled');
        }
    });
}

//function initTravelServices() {
//    $('.additional-services fieldset').each(function () {
//        var filedset = $(this),
//            chk = filedset.find('.title input:checkbox'),
//            chkLabel = filedset.find('.title label'),
//            optionsBlock = filedset.find('.service-options'),
//            btn = optionsBlock.find('input:button');
//
//        if (chk.get(0).checked) {
//            optionsBlock.show();
//        } else {
//            optionsBlock.hide();
//        }
//
//        chk.bind('change', function () {
//            this.debug(chk.get(0).checked);
//            if (chk.get(0).checked) {
//                optionsBlock.show();
//            } else {
//                optionsBlock.hide();
//            }
//        });
//
//        chkLabel.bind('click', function (e) {
//            if (chk.get(0).checked && optionsBlock.is(':hidden')) {
//                optionsBlock.show();
//                return false;
//            }
//
//        });
//
//        btn.bind('click', function (e) {
//            optionsBlock.hide();
//
//            e.preventDefault();
//        });
//    });
//}

//function initSearch() {
//    $('.search-form').each(function () {
//        var btnSubmit = $(this).find('input:submit'),
//            lightboxOpener = $(this).find('.lightbox-opener');
//
//        btnSubmit.click(function (e) {
//            e.preventDefault();
//            lightboxOpener.trigger('click');
//
//        });
//    });
//}

function initHeaderSelects() {
    $('.nav .option').click(function (e) {
        e.stopImmediatePropagation();
        $('.nav .option').not($(this)).removeClass('opened');
        $(this).toggleClass('opened');
    });

    $('body').click(function () {
        $('.nav .option').removeClass('opened');
    });

}

function initCustomSelects() {
    $('.select-custom-value').click(function () {
        $(this).parent().toggleClass('opened');
    });

    $('.select-custom > ul > li').click(function () {
        var parent = $(this).parents('.select-custom:first');
        parent.children('.select-custom-value').text($(this).text());
        parent.removeClass('opened');
    });
}

//  lightbox function
function initLightbox() {
    var _zIndex = 1000;
    var _fadeSpeed = 350;
    var _faderOpacity = 1;
    var _faderBackground = '#fff url(../images/bg-body.png) repeat-x';
    var _faderId = 'lightbox-overlay';
    var _closeLink = 'a.close';
    var _fader;
    var _lightbox = null;
    var _ajaxClass = 'ajax-load';
    var _openers = jQuery('a.lightbox-opener');
    var _page = jQuery(document);
    var _scroll = false;

    // init popup fader
    _fader = jQuery('#' + _faderId);
    if (!_fader.length) {
        _fader = jQuery('<div />');
        _fader.attr('id', _faderId);
        jQuery('body').append(_fader);
    }
    _fader.css({
        opacity: _faderOpacity,
        backgroundColor: _faderBackground,
        position: 'absolute',
        overflow: 'hidden',
        display: 'none',
        top: 0,
        left: 0,
        zIndex: _zIndex
    });

    // lightbox positioning function
    function positionLightbox() {
        if (_lightbox) {
            var _minWidth = jQuery('body > div:eq(0)').outerWidth();
            var _windowHeight = jQuery(window).height();
            var _windowWidth = jQuery(window).width();
            var _lightboxWidth = _lightbox.outerWidth();
            var _lightboxHeight = _lightbox.outerHeight();
            var _pageHeight = _page.height();

            if (_windowWidth < _minWidth) _fader.css('width', _minWidth);
            else _fader.css('width', '100%');
            if (_windowHeight < _pageHeight) _fader.css('height', _pageHeight);
            else _fader.css('height', _windowHeight);

            _lightbox.css({
                position: 'absolute',
                zIndex: (_zIndex + 1)
            });

            // vertical position
            if (_windowHeight > _lightboxHeight) {
                _lightbox.css({
                    position: 'fixed',
                    top: (_windowHeight - _lightboxHeight) / 2
                });
            } else {
                var _faderHeight = _fader.height();
                if (_faderHeight < _lightboxHeight) _fader.css('height', _lightboxHeight);
                if (!_scroll) {
                    if (_faderHeight - _lightboxHeight > parseInt(jQuery(window).scrollTop())) {
                        _faderHeight = parseInt(jQuery(window).scrollTop())
                        _scroll = _faderHeight;
                    } else {
                        _scroll = _faderHeight - _lightboxHeight;
                    }
                }
                _lightbox.css({
                    position: 'absolute',
                    top: _scroll < 0 ? 0 : _scroll
                });
            }

            // horizontal position
            if (_fader.width() > _lightbox.outerWidth()) _lightbox.css({
                left: (_fader.width() - _lightbox.outerWidth()) / 2
            });
            else _lightbox.css({
                left: 0
            });
        }
    }

    // show/hide lightbox
    function toggleState(_state) {
        if (!_lightbox) return;
        if (_state) {
            _fader.fadeIn(_fadeSpeed, function () {
                _lightbox.fadeIn(_fadeSpeed);
            });
            _scroll = false;
            positionLightbox();
        } else {
            _lightbox.fadeOut(_fadeSpeed, function () {
                _fader.fadeOut(_fadeSpeed);
                _scroll = false;
            });
        }
    }

    // popup actions
    function initPopupActions(_obj) {
        if (!_obj.get(0).jsInit) {
            _obj.get(0).jsInit = true;
            // close link
            _obj.find(_closeLink).click(function () {
                _lightbox = _obj;
                toggleState(false);
                return false;
            });
        }
    }

    // lightbox openers
    _openers.each(function () {
        var _opener = jQuery(this);
        var _target = _opener.attr('href');

        // popup load type - ajax or static
        if (_opener.hasClass(_ajaxClass)) {
            _opener.click(function () {
                // ajax load
                if (jQuery('div[rel*="' + _target + '"]').length == 0) {
                    jQuery.ajax({
                        url: _target,
                        type: "POST",
                        dataType: "html",
                        success: function (msg) {
                            // append loaded popup
                            _lightbox = jQuery(msg);
                            _lightbox.find('img').load(positionLightbox)
                            _lightbox.attr('rel', _target).hide().css({
                                position: 'absolute',
                                zIndex: (_zIndex + 1),
                                top: -9999,
                                left: -9999
                            });
                            jQuery('body').append(_lightbox);

                            // init js for lightbox
                            initPopupActions(_lightbox);

                            // show lightbox
                            toggleState(true);
                        },
                        error: function (msg) {
                            alert('AJAX error!');
                            return false;
                        }
                    });
                } else {
                    _lightbox = jQuery('div[rel*="' + _target + '"]');
                    toggleState(true);
                }
                return false;
            });
        } else {
            if (jQuery(_target).length) {
                // init actions for popup
                var _popup = jQuery(_target);
                initPopupActions(_popup);
                // open popup
                _opener.click(function () {
                    if (_lightbox) {
                        _lightbox.fadeOut(_fadeSpeed, function () {
                            _lightbox = _popup.hide();
                            toggleState(true);
                        })
                    } else {
                        _lightbox = _popup.hide();
                        toggleState(true);
                    }

                    return false;
                });
            }
        }
    });

    // event handlers
    jQuery(window).resize(positionLightbox);
    jQuery(window).scroll(positionLightbox);
    jQuery(document).keydown(function (e) {
        if (!e) evt = window.event;
        if (e.keyCode == 27) {
            toggleState(false);
        }
    })
    _fader.click(function () {
        if (!_fader.is(':animated')) toggleState(false);
        return false;
    })
}