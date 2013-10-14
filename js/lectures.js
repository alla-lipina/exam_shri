var LECTURES = (function () {


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
      }

    load = function () {
       for (var i = 0; i < localStorage.length; i++) {
          CELL_MANAGER.update(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }

    edit = function (data) {
      data = data || 
      { 
        id : +new Date(), 
        date : "15-09", 
        time : "19:00", 
        theme : "your theme", 
        thesis : "thesis", 
        presenter : "who speak", 
        presentation : "link"
      }
      $('#edit-lecture-form form').children('.field').each(function()
      {
        $(this).val(data[$(this).attr('name')]);
      })
      $('#edit-lecture-form').show()
    }

    update = function (button) {
      lecture = JSON.parse(localStorage.getItem("lecture-" + $(button).attr('data-lecture-id')));
      $('div.view-day').hide().children().remove();
      edit(lecture);
    }

    save = function () {
      result = {}
       $('#edit-lecture-form form .field').each(function()
       {
          result[$(this).attr('name')] = $(this).val();
       })
      localStorage.setItem("lecture-" + result.id, JSON.stringify(result));
      CELL_MANAGER.update(result)
    }

    show = function (day) {

      lectures = $(day).find('.lectures').map(function(elem) {
           return JSON.parse(localStorage.getItem("lecture-" + $(this).attr('id')));
        });
      the_day = lectures[0].date;
      template = Handlebars.compile($('#day-template').html());
      $('div.view-day').append(template({lectures : lectures, day : the_day}));
      $('div.view-day').show();
      $('div.view-day .scroll-pane').jScrollPane();
    }

    delete_lecture = function (elem) {
      id = elem.attr('data-lecture-id');
      localStorage.removeItem("lecture-" + id);
      elem.parent().remove();
      $('.view-day').hide().children().remove()
      CELL_MANAGER.remove({id : id})
    }

    delete_all = function() {
        localStorage.clear();
        CELL_MANAGER.clear();
    }

    export_lectures = function (data){
      content = []
      for (var i = 0; i < localStorage.length; i++){
        content.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
      uriContent = "data:application/octet-stream," + JSON.stringify(content);
      newWindow=window.open(uriContent, 'neuesDokument');
    }

    import_lectures = function () {
        $('#import-form').show()
    }

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
    }

  return {
    load: load,
    init: init,
    sample_json: '{"id":"1381760717990","date":"15-09","time":"13:00","theme":"Общийциклразработки","thesis":"Общийциклразработкипроекта","presenter":"МихаилТрошев","presentation":"http://yadi.sk/d/VDsJ4ZUBiq6u"},{"id":"1381765059713","date":"15-09","time":"14:00","theme":"TaskTracker,Wiki","thesis":"Нужновсезаписыватьсвики.","presenter":"СергейБережной","presentation":"http://yadi.sk/d/D5xTwoIciq6c"},{"id":"1381765155089","date":"15-09","time":"15:00","theme":"wiki","thesis":"Лекция«Wiki»(СергейБережной)\nПрезентация:\n","presenter":"СергейБережной","presentation":"http://yadi.sk/d/7F9PuECdiq6G"},{"id":"1381765309814","date":"18-09","time":"20:00","theme":"КоманднаястрокаUnix","thesis":"thesis","presenter":"ВикторАшик","presentation":"link"},{"id":"1381765331623","date":"18-09","time":"19:00","theme":"Редакторыкода","thesis":"","presenter":"ВячеславОлиянчук","presentation":"link"},{"id":"1381765366704","date":"20-09","time":"20:00","theme":"Браузеры","thesis":"thesis","presenter":"ГеоргийМостоловица","presentation":"link"},{"id":"1381765399082","date":"20-09","time":"20:00","theme":"Системыконтроляверсий\t","thesis":"СергейСергеев","presenter":"СергейСергеев","presentation":"link"},{"id":"1381765438796","date":"22-09","time":"12:00","theme":"Тестирование\t","thesis":"thesis","presenter":"МаринаШирочкина","presentation":"link"},{"id":"1381765463306","date":"22-09","time":"13:00","theme":"Развертываниеверстки","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765483751","date":"22-09","time":"19:00","theme":"HTTP-протокол","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765499449","date":"24-09","time":"19:00","theme":"XSLT(факультативная)","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765517364","date":"25-09","time":"19:00","theme":"Механизмработыбраузера","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765534211","date":"25-09","time":"20:00","theme":"Кешированиенаклиентеисервере","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765586505","date":"27-09","time":"19:00","theme":"JS.Базовыезнания","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765719542","date":"10-10","time":"19:00","theme":"Транспорт.AJAX","thesis":"thesis","presenter":"whospeak","presentation":"link"},{"id":"1381765738532","date":"18-10","time":"19:00","theme":"jQuery","thesis":"thesis","presenter":"whospeak","presentation":"link"}'
  }
}()
)