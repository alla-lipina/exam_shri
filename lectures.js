var LECTURES = (function () {

    init = function init ()
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
        delete_all();
      })
      $('.b-timetable_button-export').click(function(){
        export_lectures();
      })
      $('.b-timetable_button-import').click(function(){
        import_lectures();
      })
      init = null;
    }

    load = function load () {
       for (var i = 0; i < localStorage.length; i++) {
          CELL_MANAGER.update(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }


    edit = function edit(data) {
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
    
    update = function update(button) {
      lecture = JSON.parse(localStorage.getItem("lecture-" + $(button).attr('data-lecture-id')));
      $('div.view-day').hide().children().remove();
      edit(lecture);
    }

    save = function save() {
      result = {}
       $('#edit-lecture-form form .field').each(function()
       {
          result[$(this).attr('name')] = $(this).val();
       })
      localStorage.setItem("lecture-" + result.id, JSON.stringify(result));
      CELL_MANAGER.update(result)
    }

    show = function show(day) {
      lectures = $(day).find('.lectures').map(function(elem)
        {
           return JSON.parse(localStorage.getItem("lecture-" + $(this).attr('id')));
        });
      template = Handlebars.compile($('#day-template').html());
      $('div.view-day').append(template({lectures : lectures}));
      $('div.view-day').show()
      $('div.view-day .scroll-pane').jScrollPane();
    }

    delete_lecture = function delete_lecture(elem) {
      id = elem.attr('data-lecture-id');
      localStorage.removeItem("lecture-" + id);
      elem.parent().remove();
      $('.view-day').hide().children().remove()
      CELL_MANAGER.remove({id : id})
    }

    delete_all = function() {
      if (confirm("Вы уверены, что хотите удалить все записи?")){
        localStorage.clear();
        CELL_MANAGER.clear();
      }
    }


    export_lectures = function export_lectures(data){
      content = ""
      for (var i = 0; i < localStorage.length; i++){
        content += localStorage.getItem(localStorage.key(i));
      }
      uriContent = "data:application/octet-stream," + encodeURIComponent(content);
      newWindow=window.open(uriContent, 'neuesDokument');
    }
    import_lectures = function import_lectures() {
      alert('sdf')
        $('#import-form').show()

    }


  return {
    load: load,
    init: init
  }
}()
)