var LECTURES = (function () {

    init = function init ()
    {
      $('.b-timetable_button-add').click(function(){
        edit()
      });
      $('#edit-lecture-form .submit').click(function() {
        save()
      });
      $('.b-timetable_day').click(function() {
        show()
      });
      init = null;
    }

    load = function load () {
       for (var i = 0; i < localStorage.length; i++) {
          render_lecture_thumb(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }

    render_lecture_thumb = function (data) {
      compiled_template = Handlebars.compile($("#lecture-thumb-template").html());
      $("."+ data.date).append(compiled_template(data));
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
      $('#edit-lecture-form form').children('input').each(function()
      {
        $(this).val(data[$(this).attr('name')]);
      })
      $('#edit-lecture-form').show()
    }

    save = function save() {
      result = {}
       $('#edit-lecture-form form').children('input').each(function()
       {
          result[$(this).attr('name')] = $(this).val();
       })
      localStorage.setItem("lecture-" + result.id, JSON.stringify(result));
      render_lecture_thumb(result)
    }

    show = function show() {
      alert('show')
      lectures = $(this).children('.lectures').map(function(elem)
        {
           return JSON.parse(localStorage.getItem("lecture-" + $(this).attr('id')));
        });
        template = Handlebars.compile($('#day-template').html());
        $('div.b-timetable').append( template({lectures : lectures}));
        });
    }

  return {
    load: load,
    init: init
  }
}()
)