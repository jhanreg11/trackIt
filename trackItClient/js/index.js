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
  entryBtnClick = function (type) {
    console.log(type+' btn clicked.')
    item_id = $('#'+type+'-select').val()
    units = $('#'+type+'-units').val()
    price = $('#'+type+'-amt').val()
    if (!item_id || !units) {
      alert ('Please fill out the item and units')
      return
    }
    if (price) {
      if (price < 0 && type == 'sale') {
        alert("Incorrect amount for entry type")
        return
      }
      if (price > 0 && type=='sale')
        price = -price
      data = {'item_id': item_id, 'units': int(units), 'price': double(price)}
    }
    else {
      data = {'item_id': item_id, 'units': units}
    }
    console.log(data)
    Request.POST(data, 'api/entry', function (response) {
      console.log("Post completed")
      if (response == true) {
        alert('New entry created!')
        updateEntries()
        updateTotals()
      }
    })
  }

  $('#sale-btn').click(function() {
    entryBtnClick('sale')
  })

  $('#purch-btn').click(function () {
    entryBtnClick('purch')
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
  //updateItems()
  updateTotals(30)
  //END HANDLEBARS
})
