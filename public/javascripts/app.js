$(function(){
  function showJson(url, element){
    $.get(url).success(function(data){
      $(element).text(JSON.stringify(data));
    }).error(function(xhr, status, error){
      $(element).text('API call failed: ' + error);
    });
  }

  function showHelp(helpContent){
    $('.help-sidebar').hide();
    if(helpContent){
      $(helpContent).show();
    }
  }
  showHelp($('#help').val());
  
  $('#test_index_api').click(function(){
    var url = $(this).attr('data-url');
    showJson(url, '#index_json_output');
  });

  $('#test_show_api').click(function(){
    var url = $(this).attr('data-url');
    var id = $('#show_api_id').val();
    url = url.replace(':id', id);
    showJson(url, '#show_json_output')
  });

  $('.add_attribute_btn').click(function(event){
    var row = $('.attribute_row_template').clone()
      .removeClass('attribute_row_template')
      .removeClass('hidden')
      .addClass('attribute_row')
      .show();
    var count = $('.attribute_rows tr.attribute_row').size();
    $(row).html($(row).html().replace(/\:number/g, count))
    $('.attribute_rows').append(row);
    event.preventDefault();
  });

  $('.remove_attribute_btn').live('click', function(event){
    console.log('here');
    console.log(this);
    $(this).closest('tr').remove();
    event.preventDefault();
  });

  // $('a[data-toggle=modal]').click(function(){
  //   var target = $(this).attr('data-target');
  //   var url = $(this).attr('href');
  //   $(target).load(url);
  // });

  $(document).keydown(function(event){
    if(!$(document.activeElement).is('input')){
      var keyCode = event.which;
      if(keyCode == "c".charCodeAt(0) || keyCode == "C".charCodeAt(0)){
        $('.open-css-cheatsheet').trigger('click');
      } else if(keyCode == "x".charCodeAt(0) || keyCode == "X".charCodeAt(0)){
        $('.open-xpath-cheatsheet').trigger('click');
      }
    }
  });

  var spinner;
  $.ajaxSetup({
    beforeSend: function() {
      spinner =  new Spinner().spin(document.getElementById('app-content'));
    },
    complete: function(){
      spinner.stop();
    }
  });

})  
