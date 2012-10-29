var PRINT = (function(){

  var init = function init ()
  {
    $('.b-timetable_print').live('click',function(){
      $(".b-timetable").hide();
      print_lectures()
    });
    $('.b-print__back').live('click', function(){
      $(".b-timetable").show();
    })
  },

  print_lectures = function (){
    context = []
      for (var i = 0; i < localStorage.length; i++){
        context.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    template = Handlebars.compile($('#print-template').html());
    $('body').append(template( {context : context} ));
  }

  return {
  init : init
  }
}());