function updateEntries() {
    Request.GET('api/entry?order=date', function(response) {
        if (response) {
            if (response.status == 401) {
                window.location.replace('login.html')
                return
            }
            for (x of response.entries) {
                if (x.amt < 0)
                    x.amt = -(x.amt)
            }
            console.log(response.entries)
            entriesHTML = Handlebars.templates['entries']({
                'entries': response.entries
            })
            $('#activities').html(entriesHTML)
        }
    })
}

$(document).ready(function () {
    updateEntries()
})

