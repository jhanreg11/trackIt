request = new Request()
$(document).ready(function () {
    $('#login-btn').click(function() {
        username = $('#login-username').val()
        password = $('#login-password').val()
        console.log(username)
        console.log(password)
        if (username) {
            if (password) {
                acc = {'username': username, 'password': password}
                request.POST(acc, 'api/sign-in', function(result) {
                    if (result.success == true) {
                        alert("**WARNING**\nThis is an for-fun project. Any data entered on here is subject to loss.")
                        window.location.replace('index.html')
                    }
                    else {
                        alert("Sorry something seems wrong with your username or password.")
                    }
                })
            }
        }

    })
})
