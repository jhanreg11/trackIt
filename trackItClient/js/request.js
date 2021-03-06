Request = function() {
    var that = Object.create(Request.prototype);
    //Production base url
    var BASE_URL = 'http://35.225.100.251/trackIt/api/'
    //Local dev base url
    //var BASE_URL = 'http://127.0.0.1:8080/api/'

    that.POST = function(req, path, completion) {
        $.ajax(BASE_URL + path, {
            data: JSON.stringify(req),
            type:'POST',
            contentType: 'application/json',
            success: function(res) {
                completion(res)
            },
            error: function() {
                console.log("POST Failed")
            }
        })
    };

    that.GET = function(path, completion) {
        var url = BASE_URL + path;
        $.get(BASE_URL + path, function(res) {
                completion(res)
            })
            .fail(function(error) {
                console.log(error)
                completion(error)
            })
    };

    that.PUT = function(path, completion) {
        var url = BASE_URL + path;
        $.ajax({
            url: url,
            type: 'PUT',
            success: completion,
            error: function(xhr){
                Request.PUT(path, completion)
            }
        });
    };

    that.DELETE = function(path, completion) {
        var url = BASE_URL + path;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: completion,
        });
    };


    Object.freeze(that);
    return that;
};


