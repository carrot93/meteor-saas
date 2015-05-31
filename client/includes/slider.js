
Template.slider.onRendered(function() { 
    
    function savings(data){
        // save 50% 
            return Math.round( ( ( (50/100)*data) * 100) / 100);
    }
    
    if (!this.$('#slider').data('uiSlider')) {
     $( "#slider" ).slider({
                value: 100,
                min: 25,
                max: 1000,
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.value );
        $( "#amountSaved" ).val( "$" + savings(ui.value) );
      }
    });
        
    $( "#amount" ).val( "$" + $( "#slider" ).slider( "value" ) );
    $( "#amountSaved" ).val( "$" + savings($( "#slider" ).slider( "value" )) );

    }
});

/* Template.slider.helpers({
  "sliderVal":  function() { 
      Template.instance().$('#slider').data('uiSlider').value(slider.slide);
      return slider.slide; 
  }
});*/