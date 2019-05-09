var Request = new Request()
Handlebars.partials = Handlebars.templates


$(document).ready(function() {

  //LOG OUT
  $('#log-out').click(function () {
    Request.GET('api/sign-out', function (response) {
        window.location.replace('login.html')
    })

  })

  //FORM SUBMISSION
  $('#sale-btn').click(function () {
    console.log("sale btn clicked")
    item = $('#sale-item').val()
    units = $('#sale-units').val()
    amt = $('#sale-amt').val()

    if (!item && !units) {
      alert('Please fill out at least the item and units field for the sale form.')
      return
    }

    if (amt < 0 || units < 0) {
      alert('You entered a negative number. Did you mean to fill out the purchase form?')
      return
    }
    if (amt) {
      Request.POST({'item_id': item, 'units': units}, 'api/entry', function (result) {
        if (result.success) {
          alert('New sale created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    } else {
      Request.POST({'item_id': item, 'units': units, 'price': amt}, 'api/entry', function (result) {
        if (result.success) {
          alert('New sale created!')
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    }
  })

  $('#purch-btn').click(function () {
    console.log('purch btn clicked')
    item = $('#purch-item').val()
    units = $('#purch-units').val()
    amt = $('#purch-amt').val()

    if (!item && !units) {
      alert('Please fill out at least the item and units field for the sale form.')
      return
    }

    if (amt < 0 || units < 0) {
      alert('You entered a negative number. Did you mean to fill out the sale form?')
      return
    }
    if (amt) {
      console.log('price is present')
      Request.POST({'item_id': 1, 'units': units}, 'api/entry', function (result) {
        if (result.success == true) {
          alert('New purchase created!')
          //updateEntries()
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    } else {
      console.log("About to Post")
      Request.POST({'item_id': item, 'units': units, 'price': amt}, 'api/entry', function (result) {
        if (result.success == true) {
          alert('New purchase created!')
          //updateEntries()
        } else {
          alert('Oops! Something went wrong please try again')
        }
      })
    }
  })

  $('#item-btn').click(function() {
    console.log("Item btn clicked")
    itemName = $('#item-name').val()
    price = $('#item-price').val()

    if (!itemName || !price) {
      alert("Please fill out all fields to create a new item.")
      return
    }
    Request.POST({'name': itemName, 'price': price}, 'api/item', function(result) {
      if (result.success) {
        alert("New item created!")
        updateItems()
      }
      else
        alert("Oops! Something went wrong please try again")
    })
  })

  //END FORM SUBMISSION

  //TOTALS SECTION

  //Changes e.html to dropbtn.html and vice versa
  function changeSum(e) {
    console.log("I made it")
    title = $(e).html() + '▾'
    $(e).html($('#dropbtn').html().substring(0, $('#dropbtn').html().length-1))
    $('#dropbtn').html(title)
  }

  $('#dropbtn').click(function() {
    if ($('.dropdown-content').hasClass('active')) {
      $('.dropdown-content').removeClass('active')
    } else {
      $('.dropdown-content').addClass('active')
    }
  })

  $('.dropdown-choice').each(function () {
    $(this).click(function() {
      p = $(this).html()
      if (p == 'This Week') {
        updateTotals(7)
        changeSum(this)
      }
      else if (p == 'This Quarter') {
        updateTotals(90)
        changeSum(this)
      }
      else if (p == 'This Month') {
        updateTotals(30)
        changeSum(this)
      }
      else {
        updateTotals(365)
        changeSum(this)
      }
    })
  })

  //END TOTALS SECTION

  //HANDLEBARS LOAD IN

  updateEntries = function() {
    Request.GET('api/entry', function(response) {
      if (response) {
        console.log(response.entries)
        entriesHTML = Handlebars.templates['entries']({
          'entries': response.entries
        })
        $('#activities').html(entriesHTML)
      }
    })
  }

  updateItems = function() {
    Request.GET('api/item', function (response) {
      if (response) {
        itemsHTML = Handlebars.templates['items']({
          'items': response.items
        })
        $('#purch-select').html(itemsHTML)
        $('#sale-select').html(itemsHTML)
      }
    })
  }
  updateTotals = function(per) {
    Request.GET('api/totals?per='+per, function(response) {
      if (response) {
          console.log(response.totals)
        totalsHTML = Handlebars.templates['totals']({
          'totals': response.totals
        })
        $('#totals').html(totalsHTML)
      }
    })
  }

  updateEntries()
  updateItems()
  updateTotals(30)
  //END HANDLEBARS
})
