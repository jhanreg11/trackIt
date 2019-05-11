var Request = new Request()
Handlebars.partials = Handlebars.templates

//HELPER FUNCTIONS
function entryBtnClick (type) {
  console.log(type+' btn clicked.')
  item_id = $('#'+type+'-select').val()
  units = $('#'+type+'-units').val()
  price = $('#'+type+'-amt').val()
  if (!item_id || !units) {
    alert ('Please fill out the item and units')
    return
  }
  if (isNaN(item_id) || isNaN(units)) {
    alert("Please enter only numbers")
    return
  }
  if (price) {
    if (isNaN(price)) {
      alert("Please enter only number")
      return
    }
    if (price < 0 && type == 'sale') {
      alert("Incorrect amount for entry type")
      return
    }
    if (price > 0 && type=='purch')
      price = -price
    data = {'item_id': item_id, 'units': parseInt(units), 'price': parseFloat(price), 'type': type}
  }
  else {
    data = {'item_id': parseInt(item_id), 'units': parseInt(units), 'type': type}
  }
  console.log(data)
  Request.POST(data, 'api/entry', function (response) {
    console.log("Post completed")
    if (response.status == 401) {
      window.location.replace('login.html')
      return
    }
    if (response.success == true) {
      alert('New entry created!')
      updateEntries()
      updateTotals(getPer('#dropbtn'))
      clearFields('.'+type+'-form')
    }
  })
}

function clearFields(e) {
  console.log(e)
  console.log($(e).find('input').val())
  $(e).find('input').val("")
}

function updateEntries() {
  $('#activites-iframe').attr('src', $("#activites-iframe").attr('src'))
}


//Changes e.html to dropbtn.html and vice versa
function changeSum(e) {
  console.log("I made it")
  title = $(e).html() + '▾'
  $(e).html($('#dropbtn').html().substring(0, $('#dropbtn').html().length-1))
  $('#dropbtn').html(title)
}

function getPer(element) {
  p = $(element).html()
  if (p == 'This Week')
    return 7
  else if (p == 'This Quarter')
    return 90
  else if (p == 'This Month')
    return 30
  else
    return 365
}

function updateItems() {
  Request.GET('api/item', function (response) {
    if (response) {
      if (response.status == 401) {
        window.location.replace('login.html')
        return
      }
      itemsHTML = Handlebars.templates['items']({
        'items': response.items
      })
      $('#purch-select').html(itemsHTML)
      $('#sale-select').html(itemsHTML)
    }
  })
}

function updateTotals (per) {
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

$(document).ready(function() {

  //LOG OUT
  $('#log-out').click(function () {
    Request.GET('api/sign-out', function (response) {
        window.location.replace('login.html')
    })

  })
  //END LOG OUT

  //FORM SUBMISSION
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
    if (itemName.length > 12) {
      alert('That name is too long. There is a 12 character limit')
      return
    }
    if (isNaN(price)) {
      alert("Please enter a number for price")
      return
    }
    Request.POST({'name': itemName, 'price': parseFloat(price)}, 'api/item', function(result) {
      if (result.status == 401) {
        window.location.replace('login.html')
        return
      }
      if (result.success) {
        alert("New item created!")
        updateItems()
        clearFields('.item-form')
      }
      else
        alert("Oops! Something went wrong please try again")
    })
  })
  //END FORM SUBMISSION

  //TOTALS SECTION
  $('#dropbtn').click(function() {
    if ($('.dropdown-content').hasClass('active')) {
      $('.dropdown-content').removeClass('active')
    } else {
      $('.dropdown-content').addClass('active')
    }
  })

  $('.dropdown-choice').each(function () {
    $(this).click(function() {
        updateTotals(getPer(this))
        changeSum(this)
    })
  })
  //END TOTALS SECTION

  //HANDLEBARS LOAD IN
  updateItems()
  updateTotals(30)
  //END HANDLEBARS
})
