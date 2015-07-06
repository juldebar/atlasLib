<html>
    <head>
        <title>MDST</title> 

        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.0/themes/base/jquery-ui.css" />
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

        <link rel="stylesheet" type="text/css" href="css/MDSTQuery.css">
        <link rel="stylesheet" type="text/css" href="css/openLayers.css">
        <link rel="stylesheet" type="text/css" href="css/multi-select.css">
        <link rel="stylesheet" type="text/css" href="css/datetimepicker.css">
        <link rel="stylesheet" type="text/css" href="css/datepicker.css">
        <link rel="stylesheet" type="text/css" href="css/magnific-popup.css"> 
        <!--<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">-->
    </head>
    <body>
        <div id="content" class="content">
            <div id="workspaces-div" class="container-marge">  
                <div class="container-fluid">
                    <div id="toto"></div>
                </div>
            </div>
        </div>        
        <script type="text/javascript" src="xdomain.min.js"   slave="http://mdst-macroes.ird.fr/tmp/proxy.html" debug="false"></script> 
        <script type="text/javascript" src='http://openlayers.org/api/OpenLayers.js'></script> 
        <!--    jQuery & jQuery UI-->
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
        <!--    bootstrap  ( à customiser pour alleger) -->
      <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <!--    WIDGETS-->
        <script type="text/javascript" src="js/bootstrap-datepicker.js"></script>
        <script type="text/javascript" src="js/bootstrap-datetimepicker.min.js"></script>
        <script type="text/javascript" src="js/jquery.multi-select.js"></script>
        <script type="text/javascript" src="js/OpenLayersModifyFeature-tools.js"></script><!--  lié a la version d openlayers ..-->
        <script type="text/javascript" src="js/jquery.magnific-popup.js"></script> 
        <script type="text/javascript" src="js/bootstrapx-clickover.js"></script> 

        <!--    APPLICATION-->     
        <script type="text/javascript" src="js/mdst.lib.v2.js"></script>
        
        <script type="text/javascript">
            var $manager = {
                             
                deleteCriterionButtonClass: $(".deleteCriterion-button"),
                blockUnrequestedCriteriaSelectId: $("select[id$='unrequestedCriteria-select']"),
                
            };
            var opt = {
                
                workspace: "",
                viewURI: "http://www.ecoscope.org/ontologies/resources/dbSardaraTunaAtlasI1I2",
                sourceURI: "http://www.ecoscope.org/ontologies/resources/dbSardaraTunaAtlas",
                onUpdate: function() {
                }
            };
            $("#toto").mdst(opt);
        </script>

    </body>