request = new Request()

$(document).ready(function() {
    $('#register-btn').click(function () {
        username = $('#register-username').val()
        password = $('#register-password').val()
        conf = $('#register-conf').val()
        if (!username || !password || !conf) {
            alert('Please fill out all fields.')
            return
        }
        else if (password != conf) {
            alert("Password and Password confirmation must match")
            return
        }
        else {
            user = {'username': username, 'password': password}
            request.POST(user, 'api/sign-up', function(result) {
                if (result.success == true) {
                    alert("**WARNING**\nThis is an for-fun project. Any data entered on here is subject to loss.")
                    window.location.replace('index.html')
                }
                else {
                    alert('Sorry that username or password is taken.')
                }
            })
        }
    })
})