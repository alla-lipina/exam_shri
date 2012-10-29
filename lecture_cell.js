//organizes calendar's cell interaction
var CELL_MANAGER = (function(){

  var skip_lectures_before = function (start_item, time){
    while (start_item.next() && start_item.next().attr('data-time') < time){
      start_item = start_item.next();
    }
    return start_item
  },

  remove_lecture =  function(data){
    old_day_cell = $('#' + data.id).parents('.b-timetable_day');
    $("#" + data.id).remove();
    if (old_day_cell.find('.lectures').length == 0){
      old_day_cell.removeClass('work-day')
    }
  },

  return {
    update : function(data) {
      remove_lecture(data)
      day_cell = $('.'+data.date)
      compiled_template = Handlebars.compile($("#lecture-thumb-template").html());
      target_lecture = skip_lectures_before(day_cell.find('span.caption'), data.time)
      target_lecture.after(compiled_template(data));
      day_cell.addClass('work-day')
      day_cell.closest('.scroll-pane').jScrollPane();
    },
    remove : function(data) {
      remove_lecture(data);
      day_cell.closest('.scroll-pane').jScrollPane();
    },
    clear : function(){
      $('.b-timetable_day').find('.lectures').remove();
      $('.b-timetable_day').removeClass('work-day')
    }
  }
})();