var LECTURES = (function () {
    var view_day = $('div.view-day'),

    init = function ()
    {
      $('.b-timetable_button-add').click(function(){
        edit()
      });
      $('#edit-lecture-form .submit').click(function() {
        save()
      });
      $('.b-timetable_day.work-day .jspPane').live('click',function() {
        show(this);
      });
      $('div.b-day-lecture_delete').live('click', function() {
        delete_lecture($(this));
      });
      $('.b-day-lecture_button').live('click', function() {
        update(this)
      });
      $('.b-day-lecture_img-cancel').live('click', function() {
        $(this).parents('.b-popup_overlay').hide().children().remove()
      })
      $('.b-popup_img-cancel').live('click', function() {
        $(this).parents('.b-popup_overlay').hide()
      })
      $('.b-timetable_delete-all').click(function(){
      if (confirm("Вы уверены, что хотите удалить все записи?")){
        delete_all();
      }
      })
      $('.b-timetable_button-export').click(function(){
        export_lectures();
      })
      $('.b-timetable_button-import').click(function(){
        import_lectures();
      })
      // this.code_mirror = CodeMirror.fromTextArea($("textarea[name=json]")[0], 
      // {
      //   mode: {name: "javascript", json: true}
      // });
      $('.b-popup_import .b-popup_save').click(function(){
        submit_import_lectures();
      })
        init = null; //we dont want to be called more than once
      },

    load = function () {
       for (var i = 0; i < localStorage.length; i++) {
          CELL_MANAGER.update(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    },

    edit = function (data) {
      data = data || 
      { 
        id : +new Date(), 
        date : "15-09", 
        time : "19:00", 
        theme : "тема лекции", 
        thesis : "тезисы", 
        presenter : "докладчик", 
        presentation : "ссылка"
      }
      $('#edit-lecture-form form').children('.field').each(function()
      {
        $(this).val(data[$(this).attr('name')]);
      })
      $('#edit-lecture-form').show()
    },

    update = function (button) {
      lecture = JSON.parse(localStorage.getItem("lecture-" + $(button).attr('data-lecture-id')));
      view_day.hide().children().remove();
      edit(lecture);
    },

    save = function () {
      result = {}
       $('#edit-lecture-form form .field').each(function()
       {
          result[$(this).attr('name')] = $(this).val();
       })
      localStorage.setItem("lecture-" + result.id, JSON.stringify(result));
      CELL_MANAGER.update(result)
    },

    show = function show (day) {

      lectures = $(day).find('.lectures').map(function(elem) {
           return JSON.parse(localStorage.getItem("lecture-" + $(this).attr('id')));
        });
      the_day = lectures[0].date;
      template = Handlebars.compile($('#day-template').html());
      view_day.append(template({lectures : lectures, day : the_day}));
      view_day.show();
      view_day.children('.scroll-pane').jScrollPane();
    },

    delete_lecture = function (elem) {
      id = elem.attr('data-lecture-id');
      localStorage.removeItem("lecture-" + id);
      elem.parent().remove();
      view_day.hide().children().remove()
      CELL_MANAGER.remove({id : id})
    },

    delete_all = function() {
        localStorage.clear();
        CELL_MANAGER.clear();
    },

    export_lectures = function (data){
      content = []
      for (var i = 0; i < localStorage.length; i++){
        content.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
      uriContent = "data:application/octet-stream," + JSON.stringify(content);
      newWindow=window.open(uriContent, 'neuesDokument');
    },

    import_lectures = function () {
        $('#import-form').show()
    },

    submit_import_lectures = function(code_mirror){
      try
      {
        json = $('.b-popup_import textarea[name=json]').val()
        delete_all()
        obj = JSON.parse(json)
        $(obj).each(function(lecture){
          localStorage.setItem("lecture-" + this.id, JSON.stringify(this));
        })
        load()
        $('.b-popup_overlay').fadeOut(500)
      }
      catch (e){
        alert('Не удалось обработать JSON')
      }
    };

  return {
    load: load,
    init: init,
    sample_json: '{"id":"1350236472371","date":"07-09","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350236500811","date":"13-10","time":"19:00","theme":"your theme","thesis":"thesisvvvasdfsadfas","presenter":"who speak","presentation":"link"}{"id":"1350236536554","date":"28-09","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350238412422","date":"15-092323","time":"15:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350238550191","date":"11-11112341234123409","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350239042167","date":"15-09222","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350239052719","date":"09-08","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}{"id":"1350239107856","date":"04-09","time":"19:00","theme":"your theme","thesis":"thesis","presenter":"who speak","presentation":"link"}'
  }
}());


