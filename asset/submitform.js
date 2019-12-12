function submitform() {
    var URL = window.location.href;
    console.log(URL);
    console.log(URL + '/add');

    /*
   $ajax({
        url: URL + '/add',
        type: 'PUT',
        data: $('#info').serialize(),
        success: function (result) {
           alert("update success!");
           window.history.back(-1);
        }
    });
*/

}