var Request = new Request()
Handlebars.partials = Handlebars.templates
function changeSum(e) {
  console.log("I made it")
  title = $(e).html() + '▾'
  $(e).html($('#dropbtn').html().substring(0, $('#dropbtn').html().length-1))
  $('#dropbtn').html(title)
}

$(document).ready(function() {

  //FORM SUBMISSION
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

  $('#sale-btn').click(function () {
    item = $('#sale-item').val()
    units = $('#sale-units').val()
    amt = $('#sale-amt').val()

    if (!items && !units) {
      alert('Please fill out at least the item and units field for the sale form.')
      return
    }

    if (amt < 0 || units < 0) {
      alert('You entered a negative number. Did you mean to fill out the purchase form?')
      return
    }
    if (price) {
      Request.POST({'item_id': item, 'units': units}, '/api/entry', function (result) {
        if (result.success) {
          alert('New sale created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    } else {
      Request.POST({'item_id': item, 'units': units, 'price': amt}, '/api/emtry', function (result) {
        if (result.success) {
          alert('New sale created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    }
  })

  $('#purch-btn').click(function () {
    item = $('#purch-item').val()
    units = $('#purch-units').val()
    amt = $('#purch-amt').val()

    if (!items && !units) {
      alert('Please fill out at least the item and units field for the sale form.')
      return
    }

    if (amt < 0 || units < 0) {
      alert('You entered a negative number. Did you mean to fill out the sale form?')
      return
    }
    if (price) {
      Request.POST({'item_id': item, 'units': units}, 'api/entry', function (result) {
        if (result.success) {
          alert('New purchase created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    } else {
      Request.POST({'item_id': item, 'units': units, 'price': amt}, 'api/entry', function (result) {
        if (result.success) {
          alert('New purchase created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    }
  })

  $('#item-btn').click(function() {
    itemName = $('#item-name').val()
    price = $('#item-price').val()

    if (!itemName || !price) {
      alert("Please fill out all fields to create a new item.")
      return
    }
    Request.POST({'name': itemName, 'price': price}, 'api/item', function(result) {
      if (result.success)
        alert("New item created!")
      else
        alert("Oops! Something went wrong please try again")
    })
  })

  //END FORM SUBMISSION

  //HANDLEBARS LOAD IN

  Request.GET('api/entry', function(response) {
    if (response) {
      entriesHTML = Handlebars.templates['entries']({
        'entries': response.entries,
      })
      $('#activities').html(entriesHTML)
    }
  })

  //Request.GET('api/item', function (response) {
    //if (response) {
      //itemsHTML = Handlebars.templates
   // }
  //})
  //END HANDLEBARS
})
