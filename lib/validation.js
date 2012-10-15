VALIDATION = (function(){  
  return {
    init : function(){
      $('#edit-lecture-form').validate({ 
        errorPlacement: $.datepicker.errorPlacement, 
        rules: { 
            validDefaultDatepicker: { 
                required: true, 
                dpDate: true 
            }, 
            validBeforeDatepicker: { 
                dpCompareDate: ['before', '#validAfterDatepicker'] 
            }, 
            validAfterDatepicker: { 
                dpCompareDate: {after: '#validBeforeDatepicker'} 
            }, 
            validTodayDatepicker: { 
                dpCompareDate: 'ne today' 
            }, 
            validSpecificDatepicker: { 
                dpCompareDate: 'notBefore 01/01/2012' 
            } 
        }, 
        messages: { 
            validFormatDatepicker: 'Please enter a valid date (yyyy-mm-dd)', 
            validRangeDatepicker: 'Please enter a valid date range', 
            validMultiDatepicker: 'Please enter at most three valid dates', 
            validAfterDatepicker: 'Please enter a date after the previous value' 
        }});
        }
  }
}())