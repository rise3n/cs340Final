function loginValidate() {
    var Groups = document.getElementById("categories");
    var group = Groups.options[Groups.selectedIndex].value;
    var id = document.getElementById("id").value;
    var pwd = document.getElementById("password").value;

    if (group == "Employee") {
        $.get({
            url: '/Employee/' + id + '/' + pwd,
            success: function (result) {
                window.location.href = '/Employee/' + id + '/' + pwd;
            }
        })
    }
    else if (group == "Manager") {
        $.get({
            url: '/Manager/' + id + '/' + pwd,
            success: function (result) {
                window.location.href = '/Manager/' + id + '/' + pwd;
            }
        })
    }
    else if (group == "Chef") {
        $.get({
            url: '/Chef/' + id + '/' + pwd,
            success: function (result) {
                window.location.href = '/Chef/'+ id + '/' + pwd;   
            }
        })
    }
    else {
        console.log("please choose a worker group\n");

    }
}

function Logout() {
    console.log("hello this is logout\n");
    $.get({
        url:'/',
        success: function (result) {
            window.location.href = '/';
        }
    })
}

function registerValidate() {
    var id = document.getElementById("id");
    var pwd = document.getElementById("password");
    var flag = true;

    if (id.value == null) {
        alert("id number can't be null\n");
        flag = false;
    }
    if (id.value < 0) {
        alert("id number can't be negative\n");
        flag = false;
    }
    if (typeof (pwd.value) != number && pwd.value != null) {
        alert("password should only be numbers\n");
        flag = false;
    }
    if (pwd.value == null) {
        alert("password can't be null");
        flag = false;
    }
    return flag;

}

function checkValidate() {
    var temp = document.getElementById("regid");
    if (temp.value == null) {
        alert("you must enter a number");
        return false;
    }
    if (typeof (temp.value) != number) {
        alert("you must enter a number");
        return false;
    }
}

function getlowest() {
    var URL = window.location.href;
    $.get({
        url: URL+'/lowest',
        success: function (result) {
            window.location.href = URL + '/lowest';
        }
    })

}

function schedulecheck() {
    var slot = document.getElementById("timeslot");
    var button = document.getElementById("schedule_button");
    if (slot.value != "morning" && slot.value != "noon" && slot.value != "afternoon") {
        alert("please enter morning, noon or afternoon");
        return false;

    }
}

window.onload = function () {
    var button = document.getElementById("register_button");

    button.onclick = function (e) {
        if (registerValidate() == false) 
            e.preventDefault();        
    }
        
}
