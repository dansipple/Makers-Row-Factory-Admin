$(document).ready(function() {

// Make both sides of the layout be the height of the window
function setupLayout(){
  $("#map").css('height', $(window).innerHeight() - $(".navbar").outerHeight());
  $("#factories").css('max-height', $("#map").height() - $("#factories-head").outerHeight());
} 
$(window).load(setupLayout);
$(window).resize(setupLayout);
// End Layout Setup

function initialize() {
  var mapProp = {
    center: new google.maps.LatLng(0,0),
    zoom:0,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"),mapProp);
  var latlngbounds = new google.maps.LatLngBounds();



// Call Api to get all factories and append to ul#factories
  $.ajax({
      url: "/api/factory",
      type: 'GET',
      success: function(factories){
        $.each(factories.factories, function( i, val ){
          $('#factories').append('<li data-id="'+val.id+'"><div class="row"><div class="col-sm-9"><h2>'+val.name+'</h2></div><div class="col-sm-3"><a href="mailto:'+val.email+'" class="contact-email btn-block">Send Email</a></div></div><div class="row"><div class="col-sm-12"><h3>'+val.address+'</h3></div></div><div class="row"><div class="col-sm-10"><ul class="tags" data-id="'+val.id+'"></ul></div><div class="col-sm-2 action-btns"><a class="btn-edit-factory" data-id="'+val.id+'"><i class="fa fa-pencil"></i></a><a class="btn-delete-factory" data-id="'+val.id+'"><i class="fa fa-times"></i></a></div></div></li></div></div></li>');
          if(val.tags){
            $.each(val.tags, function(n, tag){
              $("ul.tags[data-id='" + val.id +"']").append('<li>'+tag.name+'</li>')
            });
          }
          // Add Google Map Markers
          var latLng = new google.maps.LatLng(val.lat, val.long);
          var marker = new google.maps.Marker({
                position: latLng,
                title: val.name,
                map: map,
            });
          latlngbounds.extend(latLng);
        });
      }
  });
// End Get all Factories

// Called When Add Factory Form is Submitted
  $('#add-factory').on('submit', function(){
    $.ajax({
        url: "/api/factory",
        type: 'POST',
        data: $("#add-factory").serializeArray(),
        success: function(newFactory){
          $('#newFactory').modal('hide');
          $(':input','#add-factory').not(':button, :submit, :reset, :hidden').val('');
          $('#factories').append('<li data-id="'+newFactory.factory.id+'"><div class="row"><div class="col-sm-9"><h2>'+newFactory.factory.name+'</h2></div><div class="col-sm-3"><a href="mailto:'+newFactory.factory.email+'" class="contact-email btn-block">Send Email</a></div></div><div class="row"><div class="col-sm-12"><h3>'+newFactory.factory.address+'</h3></div></div><div class="row"><div class="col-sm-10"><ul class="tags" data-id="'+newFactory.factory.id+'"></ul></div><div class="col-sm-2 action-btns"><a class="btn-edit-factory" data-id="'+newFactory.factory.id+'"><i class="fa fa-pencil"></i></a><a class="btn-delete-factory" data-id="'+newFactory.factory.id+'"><i class="fa fa-times"></i></a></div></div></li></div></div></li>');
          if(newFactory.factory.tags){
            $.each(newFactory.factory.tags, function(n, tag){
              $("ul.tags[data-id='"+newFactory.factory.id+"']").append('<li>'+tag.name+'</li>')
            });
          }
        },
    });
    return false;
  });
// End Add Factory Form Submit

// Runs When Edit Factory Form is Submitted
  $('#edit-factory').on('submit', function(){
    var factory_id = $(this).data('id')
    $.ajax({
        url: "/api/factory/"+factory_id,
        type: 'PUT',
        data: $("#edit-factory").serializeArray(),
        success: function(newFactory){
          $('#editFactory').modal('hide');
          $(':input','#add-factory').not(':button, :submit, :reset, :hidden').val('');
          $("#factories li[data-id='"+factory_id+"']").html('<div class="row"><div class="col-sm-9"><h2>'+newFactory.factory.name+'</h2></div><div class="col-sm-3"><a href="mailto:'+newFactory.factory.email+'" class="contact-email btn-block">Send Email</a></div></div><div class="row"><div class="col-sm-12"><h3>'+newFactory.factory.address+'</h3></div></div><div class="row"><div class="col-sm-10"><ul class="tags" data-id="'+newFactory.factory.id+'"></ul></div><div class="col-sm-2 action-btns"><a class="btn-edit-factory" data-id="'+newFactory.factory.id+'"><i class="fa fa-pencil"></i></a><a class="btn-delete-factory" data-id="'+newFactory.factory.id+'"><i class="fa fa-times"></i></a></div></div></li></div></div>');
            if(newFactory.factory.tags){
              $.each(newFactory.factory.tags, function(n, tag){
                $("ul.tags[data-id='"+newFactory.factory.id+"']").append('<li>'+tag.name+'</li>')
              });
          }
        },
    });
    return false;
  });
// End Edit Factory Form Submit

// Deletes Factory when corresponding .btn-delete-factory is clicked
  $('#factories').on( 'click', '.btn-delete-factory', function(){
    var factory_id = $(this).data('id');
    $.ajax({
        url: "/api/factory/"+factory_id,
        type: 'DELETE',
        success: function(){
          $("#factories li[data-id='"+factory_id+"']").remove();
        }
    });
  });
// End Delete Factory


// Shows and gets input information for Edit Factory Form
  $('#factories').on( 'click', '.btn-edit-factory', function(){
    var factory_id = $(this).data('id');
    $.ajax({
        url: "/api/factory/"+factory_id,
        type: 'GET',
        success: function(factory){
          $("#edit-factory").data('id', factory_id);
          $("#edit-factory #factory-name").val(factory.factory.name);
          $("#edit-factory #email-address").val(factory.factory.email);
          $("#edit-factory #street-address").val(factory.factory.address);
          var tags = [];
          $.each(factory.factory.tags, function(i,val){
            tags.push(val.name);
          });
          $("#edit-factory #factory-tags").val(tags.join(", "));
          $("#editFactory").modal('show');
        }
    });
  });
// End Edit Factory Form Show

  // Fit Google Map bounds to markers
  map.fitBounds(latlngbounds);
}
google.maps.event.addDomListener(window, 'load', initialize);
});