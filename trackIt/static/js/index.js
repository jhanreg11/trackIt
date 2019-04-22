function changeSum(e) {
  console.log("I made it")
  title = $(e).html() + '▾'
  $(e).html($('#dropbtn').html().substring(0, $('#dropbtn').html().length-1))
  $('#dropbtn').html(title)
}

$(document).ready(function() {
  $('#dropbtn').click(function() {
    if ($('.dropdown-content').hasClass('active')) {
      $('.dropdown-content').removeClass('active')
    } else {
      $('.dropdown-content').addClass('active')
    }
  })

  $('.dropdown-choice').each(function () {
    $(this).click(changeSum(this))
  })
})
