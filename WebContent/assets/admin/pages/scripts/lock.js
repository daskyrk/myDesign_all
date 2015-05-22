/**
 * Created by 骏 on 2015/5/22.
 */
$(function () {
    //将form转为AJAX提交
    $('#submit').click(function () {
        var password = '123';
        var $password = $("#password").val();
        var valid = validate($("#password"));
        if ($password != password) {
            $("#tip").text("密码不正确");
            $("#password").css({"border": "2px solid red"});
            valid = false;
        }
        return valid;
    });
    $("#password").css({"border": "2px solid transparent"});
    $("#password").keyup(function () {
        validate($(this));
    });
    function validate(_this) {
        if (_this.val() == "") {
            _this.css({"border": "2px solid red"});//addClass("formRequired");
            return false;
        } else {
            _this.css({"border": "2px solid transparent"});//removeClass("formRequired");
            return true;
        }
    }
})