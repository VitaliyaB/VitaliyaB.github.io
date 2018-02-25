$(document).ready(function(){

    $(function (){
        $("#toTop").hide();

        $(window).scroll(function (){
            if ($(this).scrollTop() > 200){
                $("#toTop").fadeIn();
            } else{
                $("#toTop").fadeOut();
            }
        });

        $("#toTop").click(function (){
            $("body,html").animate({
                scrollTop:0
            }, 800);
            return false;
        });
    });
});