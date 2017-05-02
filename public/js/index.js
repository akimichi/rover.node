$( function() {
  var server = io("http://rover.local:5000");

  server.on('connect', function(data){
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function( event, ui ) {
        server.emit('slider', JSON.stringify({'value': ui.value}));
        $( "#amount" ).val( ui.value );
      }
    });
  });
  $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
} );
