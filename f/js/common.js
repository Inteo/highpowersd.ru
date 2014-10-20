(function(window, document, $) {

  var isInputSupported = 'placeholder' in document.createElement('input'),
    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
    prototype = $.fn,
    valHooks = $.valHooks,
    hooks,
    placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
          'focus.placeholder': clearPlaceholder,
          'blur.placeholder': setPlaceholder
        })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);
        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);
        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != document.activeElement) {
            // We can’t use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    isInputSupported || (valHooks.input = hooks);
    isTextareaSupported || (valHooks.textarea = hooks);

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don’t get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {},
      rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this,
      $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == document.activeElement && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement,
      input = this,
      $input = $(input),
      $origInput = $input,
      id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({
              'type': 'text'
            });
          } catch (e) {
            $replacement = $('<input>').attr($.extend(args(this), {
              'type': 'text'
            }));
          }
          $replacement
            .removeAttr('name')
            .data({
              'placeholder-password': true,
              'placeholder-id': id
            })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
              'placeholder-textinput': $replacement,
              'placeholder-id': id
            })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

}(this, document, jQuery));
$(function() {
  $('#slides').slidesjs({
    width: 1280,
    autoHeight: true,
    play: {
      auto: true,
      interval: 4000,
      swap: true
    }
  });
});
$(function() {
  $('#offer').slidesjs2({
    width: 1180,
    autoHeight: true,
    navigation: false
  });
});
/*FORMA*/
$(function() {
  $(".b-contacts__callback a").on("click", function() {
    $("#popup-credit").show();
    return false;
  });

  $(".cancelComment").on("click", function() {
    $("#popup-credit").hide();
    return false;
  });
});

/*FORMA END*/

/*FORMA2*/
$(function() {
  $("#toggler2").on("click", function() {


    $("#popup-credit").show();
  })
  $(".cancelComment").on("click", function() {
    $("#popup-credit").hide();
  })
})
/*FORMA2 END*/
$(window).resize(function(){
  equalheight(".b-goods");
});
$(document).ready(function() {
  equalheight(".b-goods");
  $('input, textarea').placeholder();
  $(".b-sort__select").selectpicker({
    style: "b-select-input"
  });
  $(".b-filter__select_1").selectpicker({
    style: "b-select-input"
  });
  $(".b-filter__select_2").selectpicker({
    style: "b-select-input"
  });
  $(".b-filter__select_3").selectpicker({
    style: "b-select-input"
  });
  $(".b-slider-range__holder").slider({
    range: true,
    min: 1000000,
    max: 20000000,
    values: [3000000, 10000000],
    create: function(event, ui) {
      $(this).parent(".b-slider-range").find(".b-slider-range__input_1").val(3000000);
      $(this).parent(".b-slider-range").find(".b-slider-range__input_2").val(10000000);
    },
    slide: function(event, ui) {
      $(this).parent(".b-slider-range").find(".b-slider-range__input_1").val(ui.values[0]);
      $(this).parent(".b-slider-range").find(".b-slider-range__input_2").val(ui.values[1]);
    },
    step: 500000
  });
});

$(function() {
  $(".b-slider-range__input").keyup(function() {
    $(this).val(parseInt($(this).val()));
    var input = 0;
    if ($(this).hasClass("b-slider-range__input_1")) {
      input = 0;
    } else if ($(this).hasClass("b-slider-range__input_2")) {
      input = 1;
    }
    if (parseInt($(".b-slider-range__input_2").val()) < parseInt($(".b-slider-range__input_1").val())) {
      var val = parseInt($(this).parent(".b-slider-range").find(".b-slider-range__holder").slider("values", 0));
      //console.log(val);
      $(this).parent(".b-slider-range").find(".b-slider-range__holder").slider("values", 1, val);
    } else {
      $(this).parent(".b-slider-range").find(".b-slider-range__holder").slider("values", input, $(this).val());
    }
  });
  $(".b-switcher__btn").click(function() {
     $(this).parent().children(".b-switcher__btn").removeClass("b-switcher__btn_active");
     $(this).addClass("b-switcher__btn_active");
     $(this).parent().children(".b-switcher__block").removeClass("b-switcher__block_active");
     $(this).parent().parent().children(".b-switcher__block").removeClass("b-switcher__block_active");
     var theClass = $(this).attr("class");
     var theClasses = theClass.match(/\w+|"[^"]+"/g);
     var str = theClasses.join(' ');
     var num = parseInt(str.replace(/\D+/g, ""));
     var cls = ".b-switcher__block_" + num;
     $(this).parent().children(cls).addClass("b-switcher__block_active");
     $(this).parent().parent().children(cls).addClass("b-switcher__block_active");
     return false;
   });
  $(".b-region__show-btn").click(function() {
    if($(this).parent(".b-region__show").hasClass("b-region__show_active")) {
      $(this).parent(".b-region__show").removeClass("b-region__show_active");
    }
    else {
      $(this).parent(".b-region__show").addClass("b-region__show_active");
    }
  });
  $(".slidesjs-pagination2-item").click(function(){
    setTimeout(function(){
      equalheight(".b-goods");
    }, 500);
  });
});
equalheight = function(container){

var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0,
    total_height = 0;
  $(container).each(function() {
    if($(this).is(":visible") && !$(this).parent().hasClass("b-goods-enum_list")) {
      $el = $(this);
      $($el).height('auto')
      topPostion = $el.position().top;
      if (currentRowStart != topPostion) {
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      }else {
        rowDivs.push($el);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
      }
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
     
    }
  });
  /*$(container).each(function() {
     $(this).find(".b-goods__description").height($(this).height() - $(this).find(".b-goods__picture ").outerHeight() - ($(this).find(".b-goods__description").outerHeight() - $(this).find(".b-goods__description").height()));
  });*/
  if($el) {
    $el.parent().parent().parent(".slidesjs-container2").height($el.parent().height());
  }
}
