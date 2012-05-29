$(function(){
  function showJson(url, element){
    $.get(url).success(function(data){
      $(element).text(JSON.stringify(data));
    }).error(function(xhr, status, error){
      $(element).text('API call failed: ' + error);
    });
  }

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
})  
