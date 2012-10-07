var LECTURES = (function () {
  var initLectures = function initLectures() {
    $("<div />", { 
      text : "Creat event +", 
      "class" : "add-lecture",
      click : function () { createLecture(); }
    }).prependTo(".b-timetable");
    initLectures = null;
  },

      showTimetable = function showTimetable(data) {},
      openLectures = function openLectures(data) {},
      createLecture = function createLecture(data) {},
      deleteLecture = function deleteLecture(id) {},
      saveLecture = function saveLecture() {},
      markUnsaved = function markUnsaved() {}

  return {
    open   : openLectures,
    init   : initLectures,
    "new"  : createLecture,
    remove : deleteLecture,
    show   : showTimetable,
  };
}());
