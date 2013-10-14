var PRINT = (function(){

  init = function init ()
  {
    $('.b-timetable_print').live('click',function(){
      $(".b-timetable").hide();
      print_lectures()
    })
  }

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
}()
)