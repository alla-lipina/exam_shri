var GRID = (function()
{
  week = function (start_date) {
    result = []
    for (i=0; i < 7; i++){
      result.push(
        {
          "class" : $.datepicker.formatDate('dd-mm', start_date),
           caption : $.datepicker.formatDate('dd/mm', start_date)
       });
       start_date.setDate(start_date.getDate() +1);
    };
        return result;
  };

  init = function (template){
      var context = 
          {
            weeks: ['Wel come', '1 неделя', '2 неделя', '3 неделя', '4 неделя', 'Экза мен'].map(function(caption, loop){
              start_date = new Date(2012,8,10)
              start_date.setDate((new Date(2012, 8, 10)).getDate() + 7 * loop)
            return {
              week: caption, 
              days: week(start_date)
            };
            })
          }
      compiled_template = Handlebars.compile(template.html());
      template.after($(compiled_template(context)));
  }

  return {
    init : init
  }
}()
)