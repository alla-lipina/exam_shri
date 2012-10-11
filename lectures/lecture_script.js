
var LECTURES = (function () {
  var initLectures = function initLectures() {
      $(".b-timetable_button-add").click( function() { createLecture(); } );
      initLectures = null; // we’re essentially getting rid of the function that we’re running
      },

      openLectures = function openLectures() {
          
        initLectures && initLectures();
        for (var i = 0; i < localStorage.length; i++) {
        showTimetable(JSON.parse(localStorage.getItem(localStorage.key(i))));

        }
      },

      showDay = function showDay(data) {
        $(".b-timetable_day").live('click',function(e) {
         lectures = $(e.target).children('.lectures').map(function(elem)
          {
           return JSON.parse(localStorage.getItem("lecture-" + $(this).attr('id')));
          });
            template = Handlebars.compile( $('#show-day').html());
            $('div.b-timetable').append( template({lectures : lectures}));
        });
        //show thatDay in special area...
      },

      showTimetable = function showTimetable(data) {
       return $("."+ data.date).append('<div class="lectures"' + ' id="' + data.id +'">' + data.time + " " + data.theme + '<span class="edit"> edit</span></div>');
      },

      /*showLecture = function showLecture(data) {
        $(".b-timetable_day").click(function(e) {

            var thatDay = $(e.target).attr("." + data.date);
            alert(thatDay);

            createLecture(JSON.parse(localStorage.getItem("lecture-" + thatId)));
            editLecture = null;
            showTimetable(JSON.parse(localStorage.getItem(localStorage.key(data)))); //data внусри это ссылка на нужный ид
          });
      }*/

      createLecture = function createLecture(data) {
      data = data || { id : +new Date(), date : "15-09", time : "19:00", theme : "your theme", thesis : "thesis", presenter : "who speak", presentation : "link"}

      /*return  $(".b-lecture_day").html( data.date )
              .find(".b-lecture_time").html( data.time )
              .find(".b-lecture_theme").html( data.theme )
              .find(".b-lecture_thesis").html( data.thesis )
              .find(".b-lecture_presenter").html( data.presenter )
              .find(".b-lecture_presentation").html( data.presentation )
              .find(".b-lecture_f-status").click( function () { saveLecture(); } )
              .find(".b-lecture_f-close").click( function () { deleteLecture($(this).parents(".b-lecture").attr("id")); } ),*/
      return $("<div />", { 
      "class" : "b-lecture",
      'id' : data.id
       })
      .prepend($("<div />", { 
        html : "exit",
        "class" : "exit",
        click : exitLecture
      }))
      .append($("<div />", { 
        html : data.date, 
        contentEditable : true, 
        "class" : "b-lecture_day", 
        keypress : markUnsaved
      }))
      .append($("<div />", { 
        html : data.time, 
        contentEditable : true, 
        "class" : "b-lecture_time", 
        keypress : markUnsaved
      }))
      .append($("<div />", { 
        html : data.theme, 
        contentEditable : true, 
        "class" : "b-lecture_theme", 
        keypress : markUnsaved
      }))
      .append($("<div />", { 
        html : data.thesis, 
        contentEditable : true, 
        "class" : "b-lecture_thesis", 
        keypress : markUnsaved
      }))
      .append($("<div />", { 
        html : data.presenter, 
        contentEditable : true, 
        "class" : "b-lecture_presenter", 
        keypress : markUnsaved
      }))
      .append($("<div />", { 
        html : data.presentation, 
        contentEditable : true, 
        "class" : "b-lecture_presentation", 
        keypress : markUnsaved
      }))
      .append($("<div />", { "class" : "b-lecture_footer"} )
        .append($("<span />", { 
          "class" : "b-lecture_f-status", 
          click : saveLecture 
        }))
        .append($("<span />", { 
          "class" : "b-lecture_f-close", 
          text : "trash", 
          click : function () { deleteLecture($(this).parents(".b-lecture").attr("id")); }
        }))
      )
    .appendTo('.b-timetable');
  },

      exitLecture = function exitLecture() {
        $(this).parent().hide();
      }

      deleteLecture = function deleteLecture(id) {
        localStorage.removeItem("lecture-" + id);
        $("#" + id).fadeOut(200, function () { $(this).remove(); });
      },

      saveLecture = function saveLecture() {
        var that = $(this),
            lecture = (that.hasClass("b-lecture_f-status") || that.hasClass("b-lecture_theme")) ? that.parents('div.b-lecture'): that, // не понимаю до конца строчку
            obj = {
              id   : lecture.attr("id"),
              date : lecture.children(".b-lecture_day").html(), //задавать значение дате
              time : lecture.children(".b-lecture_time").html(),
              theme: lecture.children(".b-lecture_theme").html(),
              thesis: lecture.children(".b-lecture_thesis").html(),
              presenter    : lecture.children(".b-lecture_presenter").html(),
              presentation : lecture.children(".b-lecture_presentation").html(),
            }
        localStorage.setItem("lecture-" + obj.id, JSON.stringify(obj));
        lecture.find(".b-lecture_f-status").text("saved");
        that.parents('div.b-lecture').fadeOut('slow');
        $("."+ obj.date).append('<div class="lectures"' + ' id="' + data.id +'">' + data.time + " " + data.theme + '<span class="edit"> edit</span></div>');
      },

      markUnsaved = function markUnsaved() {
        var that = $(this); 
        that.parents("div.b-lecture").find(".b-lecture_f-status").text("unsaved");
      },

      editLecture = function editLecture() {
        $(".edit").click(function(e) {
          var thatId = $(e.target).parent().attr('id');
          createLecture(JSON.parse(localStorage.getItem("lecture-" + thatId)));
          editLecture = null;
            /*showTimetable(JSON.parse(localStorage.getItem(localStorage.key(data)))); //data внусри это ссылка на нужный ид*/
        });
      }

  return {
    open   : openLectures,
    init   : initLectures,
    "new"  : createLecture,
    remove : deleteLecture,
    show   : showTimetable,
    edit   : editLecture,
    showD  : showDay
  };
}());


    <script type="text/x-handlebars-template" id="show-day">
     {{#each lectures}}
     <div>
         {{this.theme}}
     </div>
     {{/each}} 
    </script>

    

    <script id="lecture-template" type="text/x-handlebars-template">
      <div class="b-lecture">
        <div class="b-lecture_day" contenteditable="true">{{date}}</div>
        <div class="b-lecture_time" contenteditable="true">{{time}}</div>
        <div class="b-lecture_theme" contenteditable="true">{{theme}}</div>
        <div class="b-lecture_thesis" contenteditable="true">{{thesis}}</div>
        <div class="b-lecture_presenter" contenteditable="true">{{presenter}}</div>
        <div class="b-lecture_presentation" contenteditable="true">{{presentation}}</div>
        <div class="b-lecture_footer">
          <div class="b-lecture_f-status"></div>
          <div class="b-lecture_f-close">trash</div>
        </div>
      </div>
    </script>
