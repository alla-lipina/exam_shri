
var LECTURES = (function () {
  var initLectures = function initLectures() {
    $("<div />", { 
      text : "Creat event +", 
      "class" : "add-lecture",
      click : function () { createLecture(); }
    }).prependTo(".b-timetable");
    initLectures = null;
  },

  openLectures = function openLectures() {
    initLectures && initLectures();
    for (var i = 0; i < localStorage.length; i++) {
      showTimetable(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  },

  showTimetable = function showTimetable(data) {
    return $("."+ data.date).append('<span class="lectures">' + data.time + " " + data.theme + '</span>');
  },

  createLecture = function createLecture(data) {
    data = { id : +new Date(), date : "15-09", time : "19:00", theme : "your theme", thesis : "thesis", presenter : "who speak", presentation : "link"}

    return $("<div />", { 
      "class" : "b-lecture",
      'id' : data.id
       })
      .prepend($("<div />", { 
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

  deleteLecture = function deleteLecture(id) {
    localStorage.removeItem("lecture-" + id);
    $("#" + id).fadeOut(200, function () { $(this).remove(); });
  },

  saveLecture = function saveLecture() {
    var that = $(this),
        lecture = (that.hasClass("b-lecture_f-status") || that.hasClass("b-lecture_theme")) ? that.parents('div.b-lecture'): that,
        obj = {
          id   : lecture.attr("id"),
          date : lecture.children(".b-lecture_day").html(),
          time : lecture.children(".b-lecture_time").html(),
          theme: lecture.children(".b-lecture_theme").html(),
          thesis: lecture.children(".b-lecture_thesis").html(),
          presenter    : lecture.children(".b-lecture_presenter").html(),
          presentation : lecture.children(".b-lecture_presentation").html(),
        }
    localStorage.setItem("lecture-" + obj.id, JSON.stringify(obj));
    lecture.find(".b-lecture_f-status").text("saved");
    that.parents('div.b-lecture').fadeOut('slow');
    $("."+ obj.date).append(obj.theme);
  },

  markUnsaved = function markUnsaved() {
    var that = $(this), 
        lecture = that.hasClass("b-lecture_theme") ? that.parents("div.b-lecture") : that;
    lecture.find(".b-lecture_f-status").text("unsaved");
  }

  return {
    open   : openLectures,
    init   : initLectures,
    "new"  : createLecture,
    remove : deleteLecture,
    show   : showTimetable,
  };
}());
