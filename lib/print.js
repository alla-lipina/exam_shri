var PRINT = (function(){

  init = function init ()
  {
    $('.b-timetable_print').live('click',function(){
      print_lectures()
    })
  }

  print_lectures = function (){
    
  }

  return {
  init : init
  }
}()
)