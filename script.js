$(window).load(function () {
    $("#navCategorie").css("display", 'block');
    $('#menu').css('display', 'block');
    $('#mutedButton').css('display', 'block');
    $('#titleTop').css('display', 'block');
     $('#keyboard').css("display", 'none');
});

jQuery(document).ready(function ($) {
    
    $(function(){ $(".tile").hover(function(){ 
            $(this).addClass("selecionado"); }); 
        $(".tile").mouseout(function(){ $(this).removeClass("selecionado"); }); });

    document.onmousewheel = function (e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    };
    $('#mutedButton').css('display', 'block');
    $('.GeneralElement').css("display", 'block');
//    $('#loader').fadeOut(500, function () {
//        $('.GeneralElement').fadeIn(1000, function () {
//            $('#keyboard').fadeIn(500);
//        });
//        $('#titleTop').css('display', 'block');
//
//
//        $('#menu').fadeIn();
//
//
//
//        $("body").find("#loader").fadeOut();
//        $('#loader').css("display", 'none');
//        $("#arrow_down").show();
//    });




    /*****************************************************/
    /***********d�but de la navigation par touche************/
    /*****************************************************/
    //key left
    /*****permet de bloquer le scroll******/


    $(document).keydown(function (e) {
        if (e.keyCode === 37) {

            previous();
            return false;
        }
    });
    //key right
    $(document).keydown(function (e) {
        if (e.keyCode === 38) {
            manual = 0;
            up(manual);
            return false;
        }
    });
    //key up
    $(document).keydown(function (e) {
        if (e.keyCode === 39) {
//            if (currentFormationCategorie != nbrFormationCategorie){
            next();
            return false;
        }
    });
    //key down
    $(document).keydown(function (e) {
        if (e.keyCode === 40) {
            manual = 0;
            down(manual);
            return false;
        }
    });



    /**********************************************************/
    /***********initialisation page****************************/
    /*********************************************************/
    var page1title = "I. Accueil";
    var page2title = "II. Initialisation";
    var page3title = "III. Exemples MDST";
    var page4title = "IV. responsive view";
    var page5title = "V. sparql Connector";
    var page6title = "VI. coin des devs";
//    var page6title = "VI. follow me on github";
    


    var currentPage = 1;
    var nextPage = 2;
    var previousPage = 1;
    var manual = 0;


    //var nombrecatpage2 = 2;

    $("#navCategorie").hide();
    //$("#arrow_up").hide();

    if (currentPage === 1) {
        $("#titleTop").html(page1title);
        $("#titleTop").hide();
        $("#titleTop").fadeIn();
        //$("#navCategorie").hide();
        $("#arrow_up").hide();
    }
    /*****************************************************/
    /***********page suivante*****************************/
    /*****************************************************/
    $('#arrow_down').click(function () {
        manual = 0;
        down(manual);
    });

    //navigation menu

    $('#home').click(function () {

        $('html, body').animate({
            scrollTop: $("#page1").offset().top
        }, 'slow');
        currentPage = 1;
        manual = 1;
        down(manual);
    });
    $('#presentation').click(function () {
        $('html, body').animate({
            scrollTop: $("#page2").offset().top
        }, 'slow');
        currentPage = 2;
        manual = 1;
        down(manual);
    });
    $('#mdst').click(function () {
        $('html, body').animate({
            scrollTop: $("#page3").offset().top
        }, 'slow');
        currentPage = 3;
        manual = 1;
        down(manual);
    });
    $('#sparqlconnector').click(function () {
        $('html, body').animate({
            scrollTop: $("#page4").offset().top
        }, 'slow');
        currentPage = 4;
        manual = 1;
        down(manual);
    });
    $('#responsive').click(function () {
        $('html, body').animate({
            scrollTop: $("#page5").offset().top
        }, 'slow');
        currentPage = 5;
        manual = 1;
        down(manual);
    });
    $('#uml').click(function () {
        $('html, body').animate({
            scrollTop: $("#page6").offset().top
        }, 'slow');
        currentPage = 6;
        manual = 1;
        down(manual);
    });
    function down(manual) {
        if (currentPage !== 6) {
            if (manual == 0) {
                currentPage++;
                var the_id = $("#page" + currentPage);
                $('html, body').animate({
                    scrollTop: $(the_id).offset().top
                }, 'slow');
            }

            if (currentPage === 2) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page2title);

                $("#contenu2").fadeIn();
            }
            if (currentPage === 1) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page1title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 3) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page3title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 4) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page4title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 5) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page5title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 6) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page6title);
                //$("#titleTop").fadeIn();
            }
        }
        console.log(currentPage);
        if (currentPage === 6 || currentPage === 4 || currentPage === 1) {
            //alert('lol');
            $("#navCategorie").hide();
            //$("#arrow_up").hide();
            //$("#arrow_down").hide();
            //$("#arrow_next").hide();
        } else {
            $("#navCategorie").show();
            //$("#arrow_up").show();
        }


        if (currentPage === 6) {
            //$("#navCategorie").hide();
            $("#arrow_up").show();
        }
        if (currentPage === 1) {
            $("#navCategorie").hide();
            $("#arrow_up").hide();
        }
        else {
            $("#arrow_up").show();
            $("#arrow_down").show();
        }
        if (currentPage === 6) {
            $("#arrow_down").hide();
        } else
            $("#arrow_down").show();

        return false;
    }
    /*******************************************************/
    /***********page pr�c�dente*****************************/
    /*******************************************************/
    $('#arrow_up').click(function () {
        up();
    });

    function up(manual) {
        if (currentPage != 1) {
            if (manual == 0)
                ;
            {
                currentPage--;
                var the_id = $("#page" + currentPage);
                $('html, body').animate({
                    scrollTop: $(the_id).offset().top
                }, 'slow');
            }
            if (currentPage === 1) {
                $("#arrow_up").hide();
                $("#navCategorie").hide();
            } else {
                $("#navCategorie").show();
                $("#arrow_up").show();
            }

            $("#titleTop").fadeOut();
            if (currentPage === 2) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page2title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 1) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page1title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 3) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page3title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 4) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page4title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 5) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page5title);
                //$("#titleTop").fadeIn();
            }
            if (currentPage === 6) {
                $("#titleTop").fadeOut(500, function () {
                    $("#titleTop").fadeIn();
                });
                $("#titleTop").hide();
                $("#titleTop").html(page6title);
                // $("#titleTop").fadeIn();
            }
        }
        if (currentPage === 6 || currentPage === 4 || currentPage === 1) {
            //alert('lol');
            $("#navCategorie").hide();
            //$("#arrow_up").hide();
            //$("#arrow_down").hide();
            //$("#arrow_next").hide();
        } else {
            $("#navCategorie").show();
            //$("#arrow_up").show();
        }

        if (currentPage === 1) {
            $("#navCategorie").hide();
            $("#arrow_up").hide();
        }
        if (currentPage === 6) {
            //$("#navCategorie").hide();
            $("#arrow_up").show();
            $("#arrow_down").hide();
        }
        if (currentPage === 6) {
            $("#arrow_down").hide();
        } else
            $("#arrow_down").show();
        console.log(currentPage);
        return false;
    }
    $('#arrow_down').hover(function () {
        $('#arrow_down').animate({
            bottom: '8%'
        }, 250);
    }, function () {
        $('#arrow_down').animate({
            bottom: '9%'
        }, 250);
        //$('#arrow_down').css('bottom', '7%');
        //$('#arrow_down').css('width','10%');
    });

    $('#arrow_up').hover(function () {

        $('#arrow_up').animate({
            bottom: '16%',
            top: '13%'
        }, 250);
    }, function () {
        $('#arrow_up').animate({
            bottom: '16%',
            top: '14%'
        }, 250);
//        $('#arrow_up').css('bottom', '15%');
//        $('#arrow_up').css('top', '12%');
        //$('#arrow_down').css('width','10%');
    });
    $('#arrow_next').hover(function () {
        $('#arrow_next').animate({
            right: '-1%'
        }, 250);
    }, function () {
        $('#arrow_next').animate({
            right: '0%'
        }, 250);
        //$('#arrow_next').css('right', '0');
        //$('#arrow_down').css('width','10%');
    });

    $('#arrow_previous').hover(function () {

        $('#arrow_previous').animate({
            bottom: '16%',
            left: '-1%'
        }, 250);
    }, function () {
        $('#arrow_previous').animate({
            bottom: '16%',
            left: '0%'
        }, 250);

//        $('#arrow_previous').css('bottom', '15%');
//        $('#arrow_previous').css('left', '0%');
        //$('#arrow_down').css('width','10%');
    });









    /*****************************************************************************/
    /**************************Initialisation cat�gories**************************/
    /*****************************************************************************/
    var currentFormationCategorie = 1;
    var nbrFormationCategorie = 6;

    var currentAboutMe = 1;
    var nbrcurrentAboutMe = 2;

    var currentExperienceCategorie = 1;
    var nbrExperienceCategorie = 8;
    if (currentFormationCategorie === 1) {
        // $('#arrow_previous').hide();
    }


    /************************************************************************************/
    /**************************next Cat�gories***************************************/
    /************************************************************************************/
    $('#arrow_next').click(function () {

        next();

    });



    /*********************************/
    /*******next formation*************/
    /*********************************/
    function next() {

        //si la cat�gorie est �gal au nombre de cat�gories
        if (currentFormationCategorie === nbrFormationCategorie) {
            //nbrFormationCategorie = nbrFormationCategorie;
            //$('#arrow_next').hide();
        }
        if (currentFormationCategorie === 1) {
            // nbrFormationCategorie = nbrFormationCategorie;
            // $('#arrow_previous').hide();
        }

        //on cache les �l�ments de navigation
        // $('#arrow_next').show();
        //$('#arrow_previous').show();

        if (currentPage === 2) {
            currentFormationCategorie++;

            if (currentFormationCategorie === nbrFormationCategorie + 1) {
                currentFormationCategorie = 1;
            }
            if (currentFormationCategorie === 1) {
                $("#contenu2").fadeOut(500, function () {
                    //$('#contenu2').html("<div id='loader'></div>");
                    $("#contenu2").load("formation/formation1.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });


            }
            if (currentFormationCategorie === 2) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation2.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    // $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentFormationCategorie === 3) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation3.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    // $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentFormationCategorie === 4) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation4.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    // $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentFormationCategorie === 5) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation5.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    // $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentFormationCategorie === 6) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation6.html");
                    //$( "#contenu2" ).html(formation_page2);
                    $("#contenu2").fadeIn(1500);
                    // $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }

        }


        /*********************************/
        /*******next page pro*************/
        /*********************************/
        if (currentPage === 3) {
            // $('#arrow_next').show();
            //$('#arrow_previous').show();
            currentExperienceCategorie++;
            console.log("test" + currentExperienceCategorie);

            if (currentExperienceCategorie === 1) {
                // $('#arrow_previous').hide();
            }

            if (currentExperienceCategorie === nbrExperienceCategorie) {
                //$('#arrow_next').hide();
            }

            if (currentExperienceCategorie === nbrExperienceCategorie + 1) {
                currentExperienceCategorie = 1;
            }
            if (currentExperienceCategorie === 1) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience1.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 2) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience2.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 3) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience3.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 4) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience4.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 5) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience5.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 6) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience6.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 7) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience7.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentExperienceCategorie === 8) {
                $("#contenu3").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu3").load("experience/experience8.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
        }
        if (currentPage === 5) {
            //$('#arrow_next').show();
            //$('#arrow_previous').show();
            currentAboutMe++;
            if (currentAboutMe === nbrcurrentAboutMe + 1) {
                currentAboutMe = 1;
            }
            console.log("test" + currentAboutMe);

            if (currentAboutMe === 1) {
                //$('#arrow_previous').hide();
            }

            if (currentAboutMe === nbrcurrentAboutMe) {
                // $('#arrow_next').hide();
            }

            if (currentAboutMe === 1) {
                $("#contenu5").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu5").load("aboutme/aboutme1.html");
                    $("#contenu5").hide();
                    $("#contenu5").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
            if (currentAboutMe === 2) {
                $("#contenu5").fadeOut(500, function () {
                    // $("#contenu3").html(pro_page2);
                    $("#contenu5").load("aboutme/aboutme2.html");
                    $("#contenu5").hide();
                    $("#contenu5").fadeIn(1500);
                    $("#divcategoriePoint").find("div").eq(1).addClass('active');
                });
            }
        }

    }




    /***********************************************************************/
    /**************************pr�vious Cat�gories**************************/
    /**********************************************************************/
    $('#arrow_previous').click(function () {
        previous();

    });

    function previous() {
        //alert("done");
        //$(".categoriePoint").removeClass('active');
        //$('#arrow_previous').show();
        // $('#arrow_next').show();

        console.log("cat�gorie :" + currentFormationCategorie);


        /*********************************/
        /*******previous formation*********/
        /*********************************/
        if (currentPage === 2) {
            currentFormationCategorie--;
            if (currentFormationCategorie === nbrFormationCategorie) {
                //nbrFormationCategorie = nbrFormationCategorie;
                // $('#arrow_next').hide();
            }
            if (currentFormationCategorie === 1) {
                // nbrFormationCategorie = nbrFormationCategorie;
                //$('#arrow_previous').hide();
            }

            if (currentFormationCategorie === 0) {
                currentFormationCategorie = nbrFormationCategorie;
            }


            if (currentFormationCategorie === 2) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation2.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }
            if (currentFormationCategorie === 1) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation1.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }
            if (currentFormationCategorie === 3) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation3.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }
            if (currentFormationCategorie === 4) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation4.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }
            if (currentFormationCategorie === 5) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation5.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }
            if (currentFormationCategorie === 6) {
                $("#contenu2").fadeOut(500, function () {
                    $("#contenu2").load("formation/formation6.html");
                    //$( "#contenu2" ).html(formation_page1);
                    //$( "#contenu2" ).hide();
                    $("#contenu2").fadeIn(1500);
                    //$("#divcategoriePoint").find("div").eq(0).addClass('active');
                });
            }


            if (currentFormationCategorie === 1) {
                //currentFormationCategorie = 1;
                // $('#arrow_previous').hide();
            }
        }

        /*********************************/
        /*******previous page pro*********/
        /*********************************/
        if (currentPage === 3) {
            currentExperienceCategorie--;
            if (currentExperienceCategorie === 0) {
                currentExperienceCategorie = nbrExperienceCategorie;
            }
            if (currentExperienceCategorie === 9) {
                currentExperienceCategorie = 1;
            }
            if (currentExperienceCategorie === nbrExperienceCategorie) {
                //nbrFormationCategorie = nbrFormationCategorie;
                // $('#arrow_next').hide();
            }
            if (currentExperienceCategorie === 1) {
                // nbrFormationCategorie = nbrFormationCategorie;
                // $('#arrow_previous').hide();
            }


            console.log("currentProCategorie :" + currentExperienceCategorie);
            if (currentExperienceCategorie === 3) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience3.html");
                    //$("#contenu3").html(pro_page1);
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 2) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience2.html");
                    //$("#contenu3").html(pro_page1);
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 1) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience1.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 4) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience4.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 5) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience5.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 6) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience6.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 7) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience7.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
            if (currentExperienceCategorie === 8) {
                $("#contenu3").fadeOut(500, function () {
                    $("#contenu3").load("experience/experience8.html");
                    $("#contenu3").hide();
                    $("#contenu3").fadeIn(1500);
                });
            }
        }
        if (currentPage === 5) {
            currentAboutMe--;
            if (currentAboutMe === 0) {
                currentAboutMe = nbrcurrentAboutMe;
            }
            if (currentAboutMe === nbrcurrentAboutMe) {
                //nbrFormationCategorie = nbrFormationCategorie;
                // $('#arrow_next').hide();
            }
            if (currentAboutMe === 1) {
                // nbrFormationCategorie = nbrFormationCategorie;
                // $('#arrow_previous').hide();
            }


            console.log("currentProCategorie :" + currentExperienceCategorie);
            if (currentAboutMe === 1) {
                $("#contenu5").fadeOut(500, function () {
                    $("#contenu5").load("aboutme/aboutme1.html");
                    //$("#contenu3").html(pro_page1);
                    $("#contenu5").hide();
                    $("#contenu5").fadeIn(1500);
                });
            }
            if (currentAboutMe === 2) {
                $("#contenu5").fadeOut(500, function () {
                    $("#contenu5").load("aboutme/aboutme2.html");
                    //$("#contenu3").html(pro_page1);
                    $("#contenu5").hide();
                    $("#contenu5").fadeIn(1500);
                });
            }
        }

    }







    /**************************************************************************/
    /******************g�n�ration de citation**********************************/
    /**************************************************************************/
//    var compteur = 1;
//    var citation1 = "''Nous attendons toujours, pour nous exécuter, l'instant où nous sommes forcés par les circonstances.''";
//    var citation2 = "''Créer, aussi, c'est donner une forme à son destin.''";
//    var citation3 = "''Toutes les morales sont fondées sur l'idée qu'un acte a des conséquences qui le légitiment ou l'oblitèrent.''";
//
//    setInterval(function () {
//        if (compteur === 1) {
//            $("#citation p").fadeOut(900, function () {
//                $("#citation p").html(citation1);
//                $("#citation p").fadeIn(900);
//            });
//        }
//
//        if (compteur === 2) {
//            $("#citation p").fadeOut(900, function () {
//                $("#citation p").html(citation2);
//                $("#citation p").fadeIn(900);
//            });
//        }
//
//        if (compteur === 3) {
//            $("#citation p").fadeOut(900, function () {
//                $("#citation p").html(citation3);
//                $("#citation p").fadeIn(900);
//                compteur = 1;
//            });
//        }
//        compteur++;
//        // alert("Message to alert every 5 seconds");
//    }, 10000);
});
 