$( function() {
  var server = io("http://rover.local:5000");

  server.on('connect', function(data){
    server.on('shot', function(data){
      $("#image").attr('src', 'data:image/jpg;base64,' + data.buffer );
    });
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
    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
  });

} );
