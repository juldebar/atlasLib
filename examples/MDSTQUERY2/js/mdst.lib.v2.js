/*
 * 
 * PRINCIPE: 
 * C'est un formulaire de requete sur la vue d'une source (Base de donnée/ projet)
 * Les requètes se font par etapes/en serie sur les critères (champs des bases .)
 * A chaque étapes de selection d'un critère, le selecteur de critere se voit diminué d'un critere, et un bloc de selection sur le champ de critere est affiché.
 * Les critères peuvent être:
 *  - Discret : un ensemble fini d'element doit être selectionné.
 *  - Numeriques :(continu/intervalle de valeur continu) : les 2 bornes de l'intervalle sont à selectionner. 
 *  - Temporel : (continu/intervalle de valeur temporelle) : les 2 bornes de l'intervalle temporel sont à selectionner.
 *  - Geographique :  * 
 * 
 * CONDITION TECHNIQUE d INSTALLATION:
 * jQuery V? (à tester) 
 * OpenLayers V?
 * 
 * + suite de widget.
 * + feuilles CSS associées
 * 
 * Reflexion sur bootstrap : Utilisé ici, mais ne fait il pas le separer, l isoler, l alleger...
 * Et si le site est en version 3.0 alors ?
 * 
 * Comment maintenir le module ?
 * 
 * 
 * 
 * 
 *  
 * APPEL AJAX: MDSTClient local ou distant ( bientôt full REST sur MDSTServer ?)
 * 
 * INITIATION : avec ou sans creation de workspace (si il existe déjà)
 * 
 * WORKSPACE : represente un environnement de requetes / utilisation / visualisation d'une ou plusieurs (vue,source).
 *     l'utilisation est ici de definir un filtre sur une vue d'une source à partir d'un formulaire interactif et d'obtenir un fichier telechargeable 
 * 
 * OPTION:  *    
 *    - id du workspace en cours
 *    - visualisation
 *    - telechargement
 * 
 * VISUALISATION: block de visu de l'etat de la requete et de ce qu'il y a à telecharger.
 * 
 * TELECHARGEMENT : plusieurs formats possibles
 * 
 * Fonctionnement / containtes / evolution / en cours..
 * 
 * BLOCK DE CRITERE SELECTIONNE / SELECTIONNEUR DE CRITERE
 * Il est à prevoir la selection sur plusieurs vues -> identifiant de l'element de DOM constitué par deux elements ciblant le couple (vue,source)
 * La construction des identifiants DOM a été construite avec les URI.
 *  -> Probleme la constitution des URI n'est pas compatible avec le mode de selection de la librairies jQuery
 *  ID des DOM: fonction de conversion specialement pour contourner ce probleme.
 *  Evolution possible: l'ID pourrait être construites côté serveur...
 *  Autre amelioration envisageable: les evenements liés aux blocks sont attribués à la volée et pourraient être detruits à la volée.
 *  Est il si necessaire d'avoir un ID.
 *  
 *  ****Proprietes data des blocks utilisées pour stocker l'URI de vue et l'URI de source. *  
 */

var mdst = {
    defaultOptions: {
        domainName: "http://mdst-macroes.ird.fr", // if it's not local       
        localPath: "/MDSTWebClientNG/MODULES/MDSTQUERY2/",
        workspace: "",
        viewURI: "",
        sourceURI: "",
        onUpdate: function () {
        } //entryPoint deleteCriterionAction-criterionSelectedElementsAction-temporalCriterionSelectedAction-numericalCriterionSelectedAction
        //geographicalCriterionTreatments (
        //2 chemins d utilisation criterionSuccessUpdateAction (indirect) & onUpdateSuccess (ICI)
    }
};

(function ($) {

    $.fn.mdst = function (options) { //
        function init() {
            if (options.workspace === "") {
                options.workspace === "1";

            }
            console.log('domain name : ' + options.domainName);
            $.ajax({
                url: options.domainName + options.localPath + "MDSTQueryInit.action",
                data: {
                    viewURI: options.viewURI,
                    sourceURI: options.sourceURI
                },
                dataType: 'json',
                success: function (data) {
                    options.workspace = data.json.result;
                    //alert(data.json.result);
                    entryPoint();
                },
                error: function (error) {
                },
                beforeSend: function () {
                }
            });

        }
        function entryPoint() {
            //Si il n' y a pas de workspace c'est qu'il faut un instancier un pour l'occasion.

            if (options.workspace === "") {
                init();
            }
            else {
                $.ajax({
                    url: options.domainName + options.localPath + "getViewOptionBlock.action",
                    data: {
                        workspaceURI: options.workspace
                    },
                    dataType: 'html',
                    success: function (result) {
                        $mainDiv.html(result);
                        apply(options.workspace);
                        dataInit(options.workspace);
                        options.onUpdate.call();
                    },
                    error: function (error) {
                    },
                    beforeSend: function () {
                    }
                });
            }
        }

        function dataInit(workspaceURI) {
            $.ajax({
                url: options.domainName + options.localPath + "displayResult.action",
                data: {
                    workspaceURI: workspaceURI
                },
                dataType: 'html',
                success: function (data)
                {
                    sessionDestroyedError(data);
                    var place = "result";
                    $("#" + workspaceURI + "-resultBlock").html(data);
                    ///////////////// EVENEMENTS DOWNLOAD
                    $("#" + workspaceURI + "-download").on("click", function (event) {
                        event.preventDefault();
                        downloadAction(workspaceURI, false, place);
                    });
                    $("#" + workspaceURI + "-downloadWithShapeFiles").on("click", function (event) {
                        event.preventDefault();
                        downloadAction(workspaceURI, true, place);
                    });
                },
                error: function (error) {
                    sessionDestroyedError(error);
                }
            });

        }
        function downloadAction(workspaceURI, isRequestedOGRExport, place) {
            $.ajax({
                url: options.domainName + options.localPath + "requestData.action",
                data: {
                    workspaceURI: workspaceURI,
                    isRequestedOGRExport: isRequestedOGRExport
                },
                dataType: 'json',
                success: function (data) {
                    sessionDestroyedError(data);
                    console.log(data.viewMap.webPath);
                    var url = data.viewMap.webPath;
                    window.location = url;
                },
                error: function (error) {
                    sessionDestroyedError(error);
                },
                beforeSend: function () {
                }
            });
        }
        function apply(workspace) {
            //dataSelectBlock treatments : widgets   
            var listCriteriaContent = $("#" + workspace + "-requestedCriteria-ul");
            listCriteriaContent.find('li').each(function () {
                var current = $(this).attr('criterionType');
                if (current === 'SELECTBOX') {
                    $("#" + workspace + "-unrequestedCriteria-select").change(selectedCriterionAction);
                }
                else {
                    var criterion = $(this).attr('criterionURI');//on pecho le critere
                    var id = workspace + "-" + criterion;
                    ////////////////////////////////////TEMPORAL TREATMENT
                    if (current === 'TEMPORAL') {
                        var startDateValue = findByMdstId("input", id + "-datePickerStart").attr('value');
                        var endDateValue = findByMdstId("input", id + "-datePickerEnd").attr('value');//on pecho les valeurs temporelles
                        //PARTIE PRECEDEMMENT DANS LE BLOC DU CRITERE SPECIFIQUE
                        console.log(startDateValue + "on init");
                        if (startDateValue !== 'undefined' && endDateValue !== 'undefined' && startDateValue !== '' && endDateValue !== '') {
                            temporalCriterionTreatments(workspace, criterion, startDateValue, endDateValue);

                        } else {
                            console.log("null");
                            var response = $('<div/>').addClass('white-popup').append('<div id="error"> SERVER REQUEST ERROR -> NO VALUES <a href="">Please click HERE to signal the BUG</a></div>');
                            $.magnificPopup.open({
                                items: {
                                    src: response, // can be a HTML string, jQuery object, or CSS selector
                                    type: 'inline'
                                }
                            });
                        }
                    }
                    ////////////////////////////////////GEOGRAPHICAL TREATMENT                        
                    if (current === 'GEOGRAPHICAL') {
                        var wktModalInput = findByMdstId("input", id + "-WKT-input");
                        var wkt = wktModalInput.val();
                        if (wkt !== 'undefined' && wkt !== '') {
                            geographicalCriterionTreatments(workspace, criterion, wkt);

                        } else {
                            console.log("null");
                            var response = $('<div/>').addClass('white-popup').append('<div id="error"> SERVER REQUEST ERROR -> NO VALUES <a href="">Please click HERE to signal the BUG</a></div>');
                            $.magnificPopup.open({
                                items: {
                                    src: response, // can be a HTML string, jQuery object, or CSS selector
                                    type: 'inline'
                                }
                            });
                        }
                    }
                    if (current === 'DISCRETE') {

                        var autocompleteSelectionData = [];
                        i = 0;
                        findByMdstIdAsChild("ol", id + "-criterionSelectable-ol", "li").each(function (i, selected) {
                            result = {};
                            result["uri"] = $(selected).attr("uri");
                            result["label"] = $(selected).attr("label");
                            autocompleteSelectionData[i] = result;
                            i++;
                        });
                        discreteCriterionTreatments(workspace, criterion, autocompleteSelectionData);
                    }
                    if (current === 'NUMERICAL') {
                        var minValue = findByMdstId("input", id + "-minValue").attr('value');
                        var maxValue = findByMdstId("input", id + "-maxValue").attr('value');//on pecho les valeurs temporelles
                        //PARTIE PRECEDEMMENT DANS LE BLOC DU CRITERE SPECIFIQUE
                        numericalCriterionTreatments(workspace, criterion, minValue, maxValue);
                    }
                }
            });


            $(".deleteCriterion-button").off("click").on("click", deleteCriterionAction);
            //$manager.deleteCriterionButtonClass
        }
        function selectedCriterionAction(event) {
            console.log("2");
            var criterionURI = $(event.target).find("option:selected").val();
            var workspaceURI = $(event.target).attr("workspaceURI");
            console.log("3");
            $.ajax({
                url: options.domainName + options.localPath + "addCriterion.action",
                data: {
                    criterionURI: criterionURI,
                    workspaceURI: workspaceURI
                },
                dataType: 'json',
                success: function (data)
                {
                    console.log("4");
                    sessionDestroyedError(data);
                    if (data.json.result === "true")
                    {

                        addCriterionAction(workspaceURI, criterionURI);
                    }
                },
                error: function (error) {
                    sessionDestroyedError(error);
                }
                ,
                beforeSend: function () {
                    $("img#blockView-indicator-img").show();
                }
            });
        }
        function addCriterionAction(workspaceURI, criterionURI) {
            $.ajax({
                url: options.domainName + options.localPath + "getBlockRequestedCriteria.action",
                data: {
                    criterionURI: criterionURI,
                    workspaceURI: workspaceURI
                },
                dataType: 'html',
                success: function (data) {
                    sessionDestroyedError(data);
                    var response = $('<div/>').append(data);
                    //var item1= $('li.spi') -----il semble que ça marche sans passer par le data??????
                    var item1 = response.find('li.spi');
                    console.log(item1.attr('criterionType'));
                    var criterionType = item1.attr('criterionType');
                    var id = workspaceURI + "-" + criterionURI;
                    $("img#view-indicator-img").hide();
                    var $last = $("#" + workspaceURI + "-requestedCriteria-ul li");
                    $last.last().remove();
                    var $ul = $("#" + workspaceURI + "-requestedCriteria-ul");
                    $ul.append(data);
                    if (criterionType === 'TEMPORAL') {
                        var startDateValue = findByMdstId("input", id + "-datePickerStart").attr('value');
                        var endDateValue = findByMdstId("input", id + "-datePickerEnd").attr('value');
                        if (startDateValue !== 'undefined' && endDateValue !== 'undefined' && startDateValue !== '' && endDateValue !== '')
                        {
                            console.log("attribut value start" + startDateValue);
                            console.log("attribut value end" + endDateValue);
                            temporalCriterionTreatments(workspaceURI, criterionURI, startDateValue, endDateValue);

                        } else {
                            console.log("null");
                            var response = $('<div/>').addClass('white-popup').append('<div id="error"> SERVER REQUEST ERROR -> NO VALUES <a href="">Please click HERE to signal the BUG</a></div>');
                            $.magnificPopup.open({
                                items: {
                                    src: response, // can be a HTML string, jQuery object, or CSS selector
                                    type: 'inline'
                                }
                            });
                        }
                    }
                    if (criterionType === 'GEOGRAPHICAL') {
                        var wktModalInput = findByMdstId("input", id + "-WKT-input");
                        var wkt = wktModalInput.val();
                        if (wkt !== 'undefined' && wkt !== '') {
                            geographicalCriterionTreatments(workspaceURI, criterionURI, wkt);

                        } else {
                            console.log("null");
                            var response = $('<div/>').addClass('white-popup').append('<div id="error"> SERVER REQUEST ERROR -> NO VALUES <a href="">Please click HERE to signal the BUG</a></div>');
                            $.magnificPopup.open({
                                items: {
                                    src: response, // can be a HTML string, jQuery object, or CSS selector
                                    type: 'inline'
                                }
                            });
                        }
                    }
                    if (criterionType === 'DISCRETE') {
                        var autocompleteSelectionData = [];
                        i = 0;
                        findByMdstIdAsChild("ol", id + "-criterionSelectable-ol", "li").each(function (i, selected) {
                            result = {};
                            result["uri"] = $(selected).attr("uri");
                            result["label"] = $(selected).attr("label");
                            autocompleteSelectionData[i] = result;
                            i++;
                        });
                        discreteCriterionTreatments(workspaceURI, criterionURI, autocompleteSelectionData);
                    }
                    if (criterionType === 'NUMERICAL') {
                        var minValue = findByMdstId("input", id + "-minValue").attr('value');
                        var maxValue = findByMdstId("input", id + "-maxValue").attr('value');
                        numericalCriterionTreatments(workspaceURI, criterionURI, minValue, maxValue);
                    }
                    //$manager.deleteCriterionButtonClass = $(".deleteCriterion-button");
                    $(".deleteCriterion-button").off("click").on("click", deleteCriterionAction);
                    /////// AJAX CALL : on recupere le block de selection des criteres
                    addUnrequestedCriterionAction(workspaceURI, data);
                },
                error: function (error) {
                    sessionDestroyedError(error);
                }
            });
        }
        function addUnrequestedCriterionAction(workspaceURI, data) {
            $.ajax({
                url: options.domainName + options.localPath + "getBlockUnrequestedCriteria.action", //POURQUOI ça ne marche pas en action SIP ?
                data: {
                    workspaceURI: workspaceURI
                },
                dataType: 'html',
                success: function (data) {
                    sessionDestroyedError(data);
                    addUnrequestedCriteriaBlock(workspaceURI, data);
                    var docWidth = $(document).width();
                    $('ul.requestedCriteria-ul').scrollLeft(docWidth);
                    //Desable select
                    disableUnrequestedCriteriaBlock(workspaceURI);
                },
                error: function (error) {
                    sessionDestroyedError(error);
                }
            });
        }
        function deleteCriterionAction(event) {
            event.preventDefault();
            var $currentLi = $(event.target).closest('li').parent().closest('li');
            var workspaceURI = $currentLi.attr("workspaceURI");
            var criterionURI = $currentLi.attr("criterionURI");
            var $requestedCriteriaDiv = $("#" + workspaceURI + "-requestedCriteria-div");
            var isCoverageView = false;
            if ($requestedCriteriaDiv.attr('dataType') === "COVERAGE") {
                isCoverageView = true;
            }
            var place = "requestedCriteria-ul";
            $.ajax({
                url: options.domainName + options.localPath + "deleteCriterion.action",
                data: {
                    workspaceURI: workspaceURI,
                    criterionURI: criterionURI
                },
                dataType: 'json',
                success: function (data) {
                    sessionDestroyedError(data);
                    if (data.json.result === "true") {
                        $.ajax({
                            url: options.domainName + options.localPath + "getBlockUnrequestedCriteria.action",
                            data: {
                                workspaceURI: workspaceURI
                            },
                            dataType: 'html',
                            success: function (data) {
                                sessionDestroyedError(data);
                                $currentLi.nextAll().remove();
                                $currentLi.remove();
                                addUnrequestedCriteriaBlock(workspaceURI, data);
                                var docWidth = $(document).width();
                                $('ul.requestedCriteria-ul').scrollLeft(docWidth);
                                dataInit(options.workspace);
                                onUpdateSuccess(workspaceURI, isCoverageView, place);

                            },
                            error: function (error) {
                                sessionDestroyedError(error);
                            }
                        });
                    }

                },
                error: function (error) {
                    sessionDestroyedError(error);
                },
                beforeSend: function () {
                    showWaitingPopup(workspaceURI + "-" + place);
                }
            });
        }
        function criterionSelectedElementsAction(event) {
            var workspaceURI = $(this).attr("workspaceURI");
            var criterionURI = $(this).attr("criterionURI");
            var place = "requestedCriteria-ul";
            var keepNullValue;
            var $checkbox = findByMdstId("input", workspaceURI + "-" + criterionURI + "-existNullCheckbox");
            event.preventDefault();
            var selectedElementsURI = {};
            selectedElementsURI.elements = [];
            var selectedElements = findByMdstIdAsChild("ol", workspaceURI + "-" + criterionURI + "-criterionSelectable-ol", "li.ui-required");

            var $currentLi = $(event.target).closest('li').parent().closest('li');
            if ($checkbox.hasClass('checked')) {
                keepNullValue = true;
                selectedElements.each(function (i, selected) {
                    var uri = $(selected).attr("uri");
                    selectedElementsURI.elements.push(encodeURIComponent(uri));
                });
                $.ajax({
                    url: options.domainName + options.localPath + "updateDiscreteCriterion.action",
                    data: {
                        workspaceURI: workspaceURI,
                        criterionURI: criterionURI,
                        selectedElementsURI: JSON.stringify(selectedElementsURI),
                        keepNullValue: keepNullValue
                    },
                    dataType: 'json',
                    success: function (data) {
                        sessionDestroyedError(data);
                        if (data.json.result === "true") {
                            criterionSuccessUpdateAction(workspaceURI, $currentLi, place);
                        }
                    },
                    error: function (error) {
                        alert(JSON.stringify(error));
                    },
                    beforeSend: function () {
                        showWaitingPopup(workspaceURI + "-" + place);
                    }
                });

            }
            else {
                keepNullValue = false;
                selectedElements.each(function (i, selected) {
                    var uri = $(selected).attr("uri");
                    selectedElementsURI.elements.push(encodeURIComponent(uri));
                });
                $.ajax({
                    url: options.domainName + options.localPath + "updateDiscreteCriterion.action",
                    data: {
                        workspaceURI: workspaceURI,
                        criterionURI: criterionURI,
                        selectedElementsURI: JSON.stringify(selectedElementsURI),
                        keepNullValue: keepNullValue
                    },
                    dataType: 'json',
                    success: function (data) {
                        sessionDestroyedError(data);
                        if (data.json.result === "true") {
                            criterionSuccessUpdateAction(workspaceURI, $currentLi, place);
                        }
                    },
                    error: function (error) {
                        alert(JSON.stringify(error));
                    },
                    beforeSend: function () {
                        showWaitingPopup(workspaceURI + "-" + place);
                    }
                });
            }
        }
        function temporalCriterionSelectedAction(event) {
            var workspace = $(this).attr("workspaceURI");
            var criterion = $(this).attr("criterionURI");
            var place = "requestedCriteria-ul";
            var id = workspace + "-" + criterion;
            var datePickerStart = findByMdstId("input", id + '-datePickerStart');
            var datePickerEnd = findByMdstId("input", id + '-datePickerEnd');
            var keepNullValue;
            var $checkbox = findByMdstId("input", id + "-existNullCheckbox");

            var oldStartDate = datePickerStart.attr("data-init");
            console.log("oldStartDate" + oldStartDate);
            var newStartDate = datePickerStart.attr("data-new");
            console.log("newStartDate" + newStartDate);
            var oldEndDate = datePickerEnd.attr("data-init");
            console.log("oldEndDate" + oldEndDate);
            var newEndDate = datePickerEnd.attr("data-new");
            console.log("newEndDate" + newEndDate);
            var $currentLi = $(event.target).closest('li').parent().closest('li');
            if ($checkbox.hasClass('checked')) {
                keepNullValue = true;
                if (oldStartDate !== newStartDate || oldEndDate !== newEndDate) {
                    console.log("change");

                    $.ajax({
                        url: options.domainName + options.localPath + "updateTemporalCriterion.action",
                        data: {
                            workspaceURI: workspace,
                            criterionURI: criterion,
                            newISOStartDate: newStartDate,
                            newISOEndDate: newEndDate,
                            keepNullValue: keepNullValue
                        },
                        dataType: 'json',
                        success: function (data) {
                            sessionDestroyedError(data);
                            if (data.json.result === "true")
                            {
                                criterionSuccessUpdateAction(workspace, $currentLi, place);
                            }
                        },
                        error: function (error) {
                            sessionDestroyedError(error);
                        },
                        beforeSend: function () {
                            showWaitingPopup(workspace + "-" + place);
                        }
                    });
                    //on reinitialise la valeur dans l'input
                    datePickerStart.attr("data-init", newStartDate);
                    datePickerEnd.attr("data-init", newEndDate);
                } else {
                    enableUnrequestedCriteriaBlock(workspace);
                }
            }
            else {
                keepNullValue = false;
                $.ajax({
                    url: options.domainName + options.localPath + "updateTemporalCriterion.action",
                    data: {
                        workspaceURI: workspace,
                        criterionURI: criterion,
                        newISOStartDate: newStartDate,
                        newISOEndDate: newEndDate,
                        keepNullValue: keepNullValue
                    },
                    dataType: 'json',
                    success: function (data) {
                        sessionDestroyedError(data);
                        if (data.json.result === "true") {
                            criterionSuccessUpdateAction(workspace, $currentLi, place);
                        }
                    },
                    error: function (error) {
                        sessionDestroyedError(error);
                    },
                    beforeSend: function () {
                        showWaitingPopup(workspace + "-" + place);
                    }
                });
                //on reinitialise la valeur dans l'input
                datePickerStart.attr("data-init", newStartDate);
                datePickerEnd.attr("data-init", newEndDate);

            }

        }
        function numericalCriterionSelectedAction(event) {
            var workspace = $(this).attr("workspaceURI");
            var criterion = $(this).attr("criterionURI");
            var place = "requestedCriteria-ul";
            var id = workspace + "-" + criterion;
            var newMinValue, newMaxValue, minValue, maxValue;
            var minSpinner = findByMdstId("input", id + "-minValue");
            var maxSpinner = findByMdstId("input", id + "-maxValue");
            var keepNullValue;
            var $checkbox = findByMdstId("input", id + "-existNullCheckbox");
            event.preventDefault();
            newMinValue = minSpinner.val();
            newMaxValue = maxSpinner.val();
            minValue = minSpinner.attr("data-init");
            maxValue = maxSpinner.attr("data-init");
            console.log("minValue");
            console.log(minValue);
            console.log("newMinValue");
            console.log(newMinValue);
            console.log("minValue");
            console.log(maxValue);
            console.log("newMinValue");
            console.log(newMaxValue);
            var $currentLi = $(event.target).closest('li').parent().closest('li');
            console.log("$currentLi.html()");
            console.log($currentLi.html());
            if ($checkbox.hasClass('checked')) {
                keepNullValue = true;
                if (newMinValue !== minValue || newMaxValue !== maxValue) {
                    $.ajax({
                        url: options.domainName + options.localPath + "updateNumericalCriterion.action",
                        data: {
                            workspaceURI: workspace,
                            criterionURI: criterion,
                            newMinValue: newMinValue,
                            newMaxValue: newMaxValue,
                            keepNullValue: keepNullValue
                        },
                        dataType: 'json',
                        success: function (data) {
                            sessionDestroyedError(data);
                            if (data.json.result === "true") {
                                criterionSuccessUpdateAction(workspace, $currentLi, place);
                            }
                        },
                        error: function (error) {
                            sessionDestroyedError(error);
                        },
                        beforeSend: function () {
                            showWaitingPopup(workspace + "-" + place);
                        }
                    });
                    //on reinitialise la valeur dans l'input
                    minSpinner.attr("data-init", newMinValue);
                    maxSpinner.attr("data-init", newMaxValue);
                } else {
                    enableUnrequestedCriteriaBlock(workspace);
                }
            }
            else {  //On fait l' update pour les valeurs nulles (plus besoinde tester si on a modifié quelque chose
                keepNullValue = false;
                $.ajax({
                    url: options.domainName + options.localPath + "updateNumericalCriterion.action",
                    data: {
                        workspaceURI: workspace,
                        criterionURI: criterion,
                        newMinValue: newMinValue,
                        newMaxValue: newMaxValue,
                        keepNullValue: keepNullValue
                    },
                    dataType: 'json',
                    success: function (data) {
                        sessionDestroyedError(data);
                        if (data.json.result === "true") {
                            criterionSuccessUpdateAction(workspace, $currentLi, place);
                        }
                    },
                    error: function (error) {
                        sessionDestroyedError(error);
                    },
                    beforeSend: function () {
                        showWaitingPopup(workspace + "-" + place);
                    }
                });
                //on reinitialise la valeur dans l'input
                minSpinner.attr("data-init", newMinValue);
                maxSpinner.attr("data-init", newMaxValue);
            }


        }
        function criterionSuccessUpdateAction(workspace, $currentLi, place) {
            console.log("criterionSuccessUpdateAction");
            var $requestedCriteriaDiv = $("#" + workspace + "-requestedCriteria-div");
            var isCoverageView = false;
            if ($requestedCriteriaDiv.attr('dataType') === "COVERAGE") {
                isCoverageView = true;
            }
            $.ajax({
                url: options.domainName + options.localPath + "getBlockUnrequestedCriteria.action",
                data: {
                    workspaceURI: workspace
                },
                dataType: 'html',
                success: function (data) {
                    sessionDestroyedError(data);
                    $currentLi.nextAll().remove();
                    addUnrequestedCriteriaBlock(workspace, data);
                    var docWidth = $(document).width();
                    $('ul.requestedCriteria-ul').scrollLeft(docWidth);
                    dataInit(options.workspace);
                    onUpdateSuccess(workspace, isCoverageView, place);
                },
                error: function (error) {
                    sessionDestroyedError(error);
                }
            });
        }
        function hideWaitingPopup(place) {

            $("#" + place + "-loader").hide();
            findByMdstId("ul", place).show();
        }
        function showWaitingPopup(place) {
            findByMdstId("ul", place).hide();
            $("#" + place + "-loader").show();
        }
        function addUnrequestedCriteriaBlock(workspace, data) {

            var $ul = $("#" + workspace + "-requestedCriteria-ul");
            var $li = $("<li workspaceURI=" + workspace + " criterionType='SELECTBOX'></li>");
            var $div = $("<div id='" + workspace + "-unrequestedCriteria-div' ></div>"); // util de mettre l id ? peut etre ds les selecteur css à verifier..
            $div = $div.append(data);
            $li = $li.html($div);
            $ul.append($li);
            $("#" + workspace + "-unrequestedCriteria-select").on("change", selectedCriterionAction);
        }
        function discreteCriterionCheckall(id, target) {

            $(".ui-selectee", target).each(function (i, selected) {
                if (!$(selected).hasClass("ui-required")) {
                    $(selected).addClass("ui-required");
                }
                if ($(selected).hasClass("ui-selected")) {
                    $(selected).removeClass("ui-selected");
                }
            });
        }
        function discreteCriterionUncheck(id, target) {

            $(".ui-selectee", target).each(function (i, selected) {
                if ($(selected).hasClass("ui-required")) {
                    $(selected).removeClass("ui-required");
                }
                if (!$(selected).hasClass("ui-selected")) {
                    $(selected).addClass("ui-selected");
                }
            })
        }
        function discreteCriterionTreatments(workspace, criterion, autocompleteSelectionData) {
            ////INITIATION: creation du BLOCKDISCRETECRITERION (specialisation du BLOCKREQUESTEDCRITERION)          
            /////debut declaration VARIABLES
            //VARIABLES JS
            var autocompleteSelectableData = [];
            var id = workspace + "-" + criterion;
            //VARIABLES DOM
            var $local = {
                criterionElementsSelectedButton: findByMdstId("button", "" + id + "-criterionElementsSelected-button"),
                requestCriterionPopupLink: findByMdstIdAsChild("li", id + "-requestedCriterion-li", "a.ui-multiselect-more"),
                requestCriterionCheckallLink: findByMdstIdAsChild("li", id + "-requestedCriterion-li", "a.ui-multiselect-all"),
                requestCriterionUncheckLink: findByMdstIdAsChild("li", id + "-requestedCriterion-li", "a.ui-multiselect-none"),
                elementsList: findByMdstId("ol", id + "-criterionSelectable-ol"),
                popupSelect: findByMdstId("select", id + "-criterionDialog-select"),
                selectionAutocompleteInput: $("input[name='" + id + "-autocompleteSelectionInput']"),
                selectableAutocompleteInput: $("input[name='" + id + "-autocompleteSelectableInput']"),
                selectionAutocompleteInputId: $("input[name='" + id + "-autocompleteSelectionInput-id']"),
                selectableAutocompleteInputId: $("input[name='" + id + "-autocompleteSelectableInput-id']")
            }
            var $checkbox = findByMdstId("input", id + "-existNullCheckbox");
            ////fin declaration VARIABLES
            ///////POPUP POPUP POPUP POPUP POPUP POPUP POPUP POPUP POPUP POPUP POPUP IDOU
            ///////POPUP UI  : WIDGET "MagnificPopup"
            var validateId = compatibilityJQueryIdSelector(findByMdstId("div", workspace + "-" + criterion + "-criterionDialog-div").attr('mdst-id'));
            console.log(validateId);
            findByMdstId("div", workspace + "-" + criterion + "-criterionDialog-div").attr('id', validateId);///probleme de selector pour la magnifique popup!! ..

            $local.requestCriterionPopupLink.on("click", function () {
                $("#" + validateId).modal();
//                $("#" + validateId).on('shown', function() {
//                    console.log("HEY");
//                    $('#viewOption-modal').unbind();
//                    $(this).find('.modal-body').css({
//                        width: 'auto', //probably not needed
//                        height: 'auto', //probably not needed 
//                        'max-height': '100%'
//                    });
//                });
//                $("#" + validateId).on('hidden', function() {
//                    console.log("HO");
////  	$('#viewOption-modal').css('opacity', 1);
//                    $('#viewOption-modal').removeData("modal").modal({});
//                });
            });
            $checkbox.on("click", function () {
                $(this).toggleClass('checked');
                console.log($(this).attr("checked"));
            });
            ///////COMPOSITION POPUP : WIDGET "Multiselect"   
            ///////
            $local.popupSelect.multiSelect({
                selectableHeader: "<div class='custom-header'><div class='alert'><div>Removed elements</div><input mdst-id='" + id + "-autocompleteSelectableInput' name='" + id + "-autocompleteSelectableInput' placeholder= 'search' type='text'/><input type='hidden' mdst-id='" + id + "-autocompleteSelectableInput-id' name='" + id + "-autocompleteSelectableInput-id'/></div> </div>",
                selectionHeader: "<div class='custom-header'><div class='alert'><div>Included elements</div><input mdst-id='" + id + "-autocompleteSelectionInput' name='" + id + "-autocompleteSelectionInput' placeholder= 'search' type='text' /><input type='hidden' mdst-id='" + id + "-autocompleteSelectionInput-id' name='" + id + "-autocompleteSelectionInput-id'/></div></div>",
                selectableFooter: "<div class='custom-footer'><div class='alert'><div>Click to include elements</div><a href='#' mdst-id='" + id + "-select-all' class='btn btn-success '>All include</a></div></div>",
                selectionFooter: "<div class='custom-footer'> <div class='alert'><div>Click to remove elements</div><a href='#' mdst-id='" + id + "-deselect-all' class='btn btn-danger' >All remove</a></div></div>",
                //EVENT: SELECTION
                afterSelect: function (value, text) {
                    //NOTE : pour extraire le label -> pas propre
                    //VAR
                    var label;
                    var uri;
                    //DEBUT de traitement
                    $.each(value, function (key, val) {
                        console.log("SELECTION");
                        $("li", $local.elementsList).each(function (i, selected) {
                            if ($(selected).attr("uri") === val) {
                                $(selected).addClass("ui-required");
                                label = $(selected).attr("label");
                                uri = $(selected).attr("uri");
                            }
                        });
                        //RETRAIT d'une valeur pour la liste d'autocompletion des valeurs selectionnables
                        autocompleteSelectableData = $.grep(autocompleteSelectableData, function (valval) {
                            if (valval.uri !== val) {
                                return valval;
                            }
                        });
                        var result = {};
                        result["uri"] = uri;
                        result["label"] = label;
                        //AJOUT d'une valeur pour la liste d'autocompletion des valeurs selectionnées
                        autocompleteSelectionData.push(result);
                    });
                    //MAJ DES BOITES D AUTOCOMPLETION
                    findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete('option', 'source', autocompleteSelectionData);//MAJ
                    findByMdstId("input", id + "-autocompleteSelectableInput").autocomplete('option', 'source', autocompleteSelectableData);//MAJ

                },
                afterDeselect: function (value, text) {
                    var label;
                    var uri;
                    $.each(value, function (key, val) {
                        console.log("DESELECTION");
                        $("li", $local.elementsList).each(function (i, selected) {
                            if ($(selected).attr("uri") === val) {
                                $(selected).removeClass("ui-required");
                                label = $(selected).attr("label");
                                uri = $(selected).attr("uri");
                            }
                        });
                        autocompleteSelectionData = $.grep(autocompleteSelectionData, function (valval) {
                            if (valval.uri !== val) {
                                return valval;
                            }
                        });
                        var result = {};
                        result["uri"] = uri;
                        result["label"] = label;
                        autocompleteSelectableData.push(result);
                    });
                    findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete('option', 'source', autocompleteSelectionData);
                    findByMdstId("input", id + "-autocompleteSelectableInput").autocomplete('option', 'source', autocompleteSelectableData);
                }
            });
            findByMdstId("a", id + "-select-all").on("click", function () {
                $local.popupSelect.multiSelect('select_all');
                discreteCriterionCheckall(id, $local.elementsList);
                return false;
            });
            findByMdstId("a", id + "-deselect-all").on("click", function () {
                $local.popupSelect.multiSelect('deselect_all');
                discreteCriterionUncheck(id, $local.elementsList);
                return false;
            });

            //////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
            //////////////AUTOCOMPLETE IN POPUP

            findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete({
                minLength: 0,
                source: autocompleteSelectionData,
                focus: function (event, ui) {
                    $("input[name='" + id + "-autocompleteSelectionInput']").val("");//appel avec le name de l'input ->bug IE
                    return false;
                },
                select: function (event, ui) {
                    //appel avec le name de l'input ->bug IE
                    $("input[name='" + id + "-autocompleteSelectionInput-id']").val(ui.item.uri);//appel avec le name de l'input ->bug IE
                    var uri = ui.item.uri;
                    $local.popupSelect.multiSelect('deselect', [uri]);
                    ///retrait de l'element selectionn? de l'autocompleteur
                    var removeItem = uri;
                    autocompleteSelectionData = $.grep(autocompleteSelectionData, function (val) {
                        if (val.uri !== removeItem) {
                            return val;
                        }
                    });
                    findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete('option', 'source', autocompleteSelectionData);
                    ///on deselectionne dans le simple select
                    $("li", $local.elementsList).each(function (i, selected) {
                        if ($(selected).attr("uri") === uri) {
                            $(selected).removeClass("ui-required");
                        }
                    });
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                        .append("<a>" + item.label + "<br>" + item.uri + "</a>")
                        .appendTo(ul);
            };
            findByMdstId("input", id + "-autocompleteSelectableInput").autocomplete({
                minLength: 0,
                source: autocompleteSelectableData,
                focus: function (event, ui) {
                    $("input[name='" + id + "-autocompleteSelectableInput']").val("");//appel avec le name de l'input ->bug IE
                    return false;
                },
                select: function (event, ui) {
                    $("input[name='" + id + "-autocompleteSelectableInput-id']").val(ui.item.uri);//appel avec le name de l'input ->bug IE
                    var uri = ui.item.uri;
                    //on identifie l'element dans le select comme selectionn?
                    $local.popupSelect.multiSelect('select', [uri]);
                    //on enleve l'element de l'autocompleteur
                    var removeItem = uri;
                    autocompleteSelectableData = $.grep(autocompleteSelectableData, function (val) {
                        if (val.uri !== removeItem) {
                            return val;
                        }
                    });
                    //on met ? jour la boite de selection originale
                    $("li", $local.elementsList).each(function (i, selected) {
                        if ($(selected).attr("uri") === uri) {
                            $(selected).addClass("ui-required");
                        }
                    });
                    return false;
                }
            }).data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                        .append("<a>" + item.label + "<br>" + item.uri + "</a>")
                        .appendTo(ul);
            };

            ///////SELECTABLE SELECTABLE SELECTABLE SELECTABLE SELECTABLE BUBBLE
            ////// CE PLUGGIN JQUERYUI est pourri et l'utilisation est detournée et partielle (Les objets qui semblent selectionnés sont en fait ceux qui ne 
            //le sont pas
            // CAr Le triGG select n' existe pas 
            // Solution: http://stackoverflow.com/questions/3140017/how-to-programmatically-select-selectables-with-jquery-ui
            $local.elementsList.bind("mousedown", function (e) {
                e.metaKey = true;
            }).selectable({
                cancel: "a,.cancel",
                //EVENT: SELECTION
                stop: function (event) {

                    $(".ui-selectee", this).each(function (i, selectee) {

                        if ($(selectee).hasClass("ui-selected")) {
                            $(selectee).removeClass("ui-required");
                        } else {
                            $(selectee).addClass("ui-required");
                        }
                    });
                },
                create: function (event, ui) {
                    //UPDATE
                    $local.criterionElementsSelectedButton.button().on("click", criterionSelectedElementsAction);
                    var docWidth = $(document).width();
                    $('ul.requestedCriteria-ul').scrollLeft(docWidth);
                },
                selected: function (event, ui) {

                    var label;
                    var uri;
                    label = $(ui.selected).attr("label");
                    uri = $(ui.selected).attr("uri");
                    var result = {};
                    result["uri"] = uri;
                    result["label"] = label;
                    //RETRAIT d'une valeur pour la liste d'autocompletion des valeurs selectionnables
                    autocompleteSelectionData = $.grep(autocompleteSelectionData, function (val) {
                        if (val.uri !== uri) {
                            return val;
                        }
                    });
                    //AJOUT d'une valeur pour la liste d'autocompletion des valeurs selectionnées
                    autocompleteSelectableData.push(result);
                    findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete('option', 'source', autocompleteSelectionData);
                    findByMdstId("input", id + "-autocompleteSelectableInput").autocomplete('option', 'source', autocompleteSelectableData);
                    $local.popupSelect.multiSelect('deselect', result);
                },
                unselected: function (event, ui) {
                    var label;
                    var uri;
                    label = $(ui.unselected).attr("label");
                    uri = $(ui.unselected).attr("uri");
                    var result = {};
                    result["uri"] = uri;
                    result["label"] = label;
                    //RETRAIT d'une valeur pour la liste d'autocompletion des valeurs selectionnables
                    autocompleteSelectableData = $.grep(autocompleteSelectableData, function (val) {
                        if (val.uri !== uri) {
                            return val;
                        }
                    });
                    //AJOUT d'une valeur pour la liste d'autocompletion des valeurs selectionnées
                    autocompleteSelectionData.push(result);
                    findByMdstId("input", id + "-autocompleteSelectionInput").autocomplete('option', 'source', autocompleteSelectionData);
                    findByMdstId("input", id + "-autocompleteSelectableInput").autocomplete('option', 'source', autocompleteSelectableData);
                    $local.popupSelect.multiSelect('select', result);
                }
            });
            $local.requestCriterionCheckallLink.on("click", function (event) {
                console.log("tata");
                discreteCriterionCheckall(id, $local.elementsList);
                $local.popupSelect.multiSelect('select_all');
            });
            $local.requestCriterionUncheckLink.on("click", function (event) {
                discreteCriterionUncheck(id, $local.elementsList);
                $local.popupSelect.multiSelect('deselect_all');
            });
        }
        function temporalCriterionTreatments(workspace, criterion, startDateValue, endDateValue) {

            var id = workspace + "-" + criterion;
            var startDate = new Date(parseInt(startDateValue));
            var endDate = new Date(parseInt(endDateValue));
            var isoStartDate = startDate.toISOString();
            var isoEndDate = endDate.toISOString();
            var newISOStartDate;
            var newISOEndDate;
            var timePickerFullFormatStartDate = DateToFormatPickerConverter(startDate);
            var timePickerFullFormatEndDate = DateToFormatPickerConverter(endDate);
            var datePickerStart = findByMdstId("input", id + '-datePickerStart');
            var datePickerEnd = findByMdstId("input", id + '-datePickerEnd');
            var criterionElementsSelectedButton = findByMdstId("button", id + "-criterionElementsSelected-button");

            datePickerStart.val(timePickerFullFormatStartDate);
            datePickerStart.datetimepicker({
                format: "dd MM yyyy - hh:ii",
                startDate: timePickerFullFormatStartDate,
                endDate: timePickerFullFormatEndDate,
                viewSelect: "decade"
            }).on('changeDate', function (ev) {
                // newStartDate= ev.date.valueOf(); 
                newISOStartDate = ev.date.toISOString();
                datePickerStart.attr("data-new", newISOStartDate);
            });
            datePickerEnd.val(timePickerFullFormatEndDate);
            datePickerEnd.datetimepicker({
                format: "dd MM yyyy - hh:ii",
                startDate: timePickerFullFormatStartDate,
                endDate: timePickerFullFormatEndDate,
                viewSelect: "decade"
            }).on('changeDate', function (ev) {// newStartDate= ev.date.valueOf(); 
                newISOEndDate = ev.date.toISOString();
                datePickerEnd.attr("data-new", newISOEndDate);
            });
            datePickerStart.attr("data-init", isoStartDate);
            datePickerStart.attr("data-new", isoStartDate);
            datePickerEnd.attr("data-init", isoEndDate);
            datePickerEnd.attr("data-new", isoEndDate);

            // Pour pouvoir envoyer la nouvelle date et la comparer à l'ancienne
            // lors du click "update" les valeurs sont stockées dans les attributs "data-new" et "data-init" de l'input 
            criterionElementsSelectedButton.button().on("click",
                    temporalCriterionSelectedAction);
        }
        function numericalCriterionTreatments(workspace, criterion, minValue, maxValue) {

            var id = workspace + "-" + criterion;
            var minSpinner = findByMdstId("input", id + "-minValue");
            var maxSpinner = findByMdstId("input", id + "-maxValue");
            var criterionElementsSelectedButton = findByMdstId("button", id + "-criterionElementsSelected-button");
            minSpinner.keyup(function () {
                if (this.value !== this.value.replace(/[^0-9\.]/g, '')) {
                    console.log("change");
                    this.value === this.value.replace(/[^0-9\.]/g, '');
                }
            });
            maxSpinner.keyup(function () {
                if (this.value !== this.value.replace(/[^0-9\.]/g, '')) {
                    this.value = this.value.replace(/[^0-9\.]/g, '');
                }
            });
            minSpinner.attr("data-init", minValue);
            maxSpinner.attr("data-init", maxValue);
            criterionElementsSelectedButton.button().on("click",
                    numericalCriterionSelectedAction);
        }
        function geographicalCriterionTreatments(workspace, criterion, wkt) {
            ////////////////////VARIABLES/ ///////////////////////////////////////////////////////////////////////////////////////   
            var place = "requestedCriteria-ul"; //the place where to show the waiting popup      
            var id = workspace + "-" + criterion;
            var reportEvent;
            var criterionElementsSelectedButton = findByMdstId("button", id + "-criterionElementsSelected-button");
            var modalGeographicalUpdate = findByMdstId("span", id + "-geographicalUpdate");
            var modalButton = findByMdstIdAsChild("li", id + "-requestedCriterion-li", "a.ui-multiselect-more");
            var $currentLi = findByMdstId("li", id + "-requestedCriterion-li");
            var modalDiv = findByMdstId("div", id + "-criterionDialog-div");
            var WKTinput = findByMdstId("input", id + "-WKT-input");
            var initialWKT = wkt;
            OpenLayers.Lang.setCode("fr");
            var blockMapID = workspace + "-block";
            var modalMapID = workspace + "-modal";
            var keepNullValue;
            var $checkbox = findByMdstId("input", id + "-existNullCheckbox");
            /////////////////////INITIALISATION OF WIDGETS 
            ///////////////////CREATE small MAP

            var ol_wms = new OpenLayers.Layer.WMS(//  WMS layer
                    "OpenLayers WMS",
                    "http://vmap0.tiles.osgeo.org/wms/vmap0", {
                        layers: "basic"
                    });

            var wms_demis_topo = new OpenLayers.Layer.WMS("&#160;Demis topo",
                    "http://www2.demis.nl/wms/wms.asp", {wms: 'WorldMap', layers: 'Topography', exceptions: 'inimage', format: 'image/gif', srs: 'epsg:4326', transparent: 'true', service: 'wms', version: '1.1.1'},
            {tileSize: new OpenLayers.Size(256, 256), buffer: 1});

            var mapDomElement = findByMdstId("div", id + "-map").get(0); //Creating the map witout id we are calling the DOM element to apply the widget OpenLayers
            window[blockMapID] = new OpenLayers.Map(mapDomElement, {});
            var boundingBoxLayer = new OpenLayers.Layer.Vector("boundingBoxLayer");//localisation des resultats
            var wktReader = new OpenLayers.Format.WKT();
            var boundingBoxfeatures = wktReader.read(wkt);
            boundingBoxLayer.addFeatures(boundingBoxfeatures);
            window[blockMapID].addLayers([ol_wms, wms_demis_topo, boundingBoxLayer]);
            window[blockMapID].zoomToExtent(boundingBoxLayer.getDataExtent());
            ////////////////////////////////////////////////CREATE modal MAP
            /////////////////////////////////////

            ////// NOTE: si on selectionne une façon de choisir mais qu'on fait rien la valeur restera celle qui avait ete selectionnée avant
            ///          la fonction toggleControl est discutable....
            //
            var modalOl_wms = new OpenLayers.Layer.WMS(//a WMS layer
                    "OpenLayers WMS",
                    "http://vmap0.tiles.osgeo.org/wms/vmap0", {
                        layers: "basic"
                    });
            var out = initialWKT;
            var drawControls;
            var modalGraticuleCtl = new OpenLayers.Control.Graticule({//creating the graticule
                numPoints: 2,
                labelled: true,
                labelSymbolizer: {
                    fontSize: "10px"
                }
            });

            //Creating the ModalMAP And some Basic Controls
            mapDomElement = findByMdstId("div", id + "-dialog-map").get(0); // Dom element
            window[modalMapID] = new OpenLayers.Map(mapDomElement, {
                controls: [
                    modalGraticuleCtl,
                    new OpenLayers.Control.LayerSwitcher({
                        'div': OpenLayers.Util.getElement('layerswitcher')}),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.Navigation()]
            });

            //LAYERS 
            //
            ////////////////////////////////////////////////////// LAYER0:
            // only to see the all data's zone    
            var modalBoundingBoxLayer = new OpenLayers.Layer.Vector("Zone de couvrement des données", {
                'displayInLayerSwitcher': false
            });                                                      //(think to do: internationalisation des titres)
            var modalWKTReader = new OpenLayers.Format.WKT();
            var modalBoundingBoxfeatures = modalWKTReader.read(wkt); // read the actual value of the select   
            modalBoundingBoxLayer.addFeatures(modalBoundingBoxfeatures);
            ////////////////////////////////////////////////////// LAYER1:
            // First methode to do a query: Editable layer from the all data 's zone: reduce to do a selection 

            var styleMap = new OpenLayers.StyleMap({//Style to modifycontol workaround
                strokeColor: '#ff0000',
                fillColor: "transparent",
                strokeWidth: 1, // Comment next line out, and handlers will not appear
                pointRadius: 6
            });

            var modalBoundingBoxEditableLayer = new OpenLayers.Layer.Vector("editable", {
                styleMap: styleMap,
                'displayInLayerSwitcher': false
            });
            var modalWKTEditableReader = new OpenLayers.Format.WKT();
            var modalBoundingBoxEditablefeatures = modalWKTEditableReader.read(wkt); // read the actual value of the select   
            modalBoundingBoxEditableLayer.addFeatures(modalBoundingBoxEditablefeatures);

            /////SUBSCRIBE EVENTS
            modalBoundingBoxEditableLayer.events.on({
                featuremodified: featureModified  //save the wkt value
            });

            function featureModified(event) {
                out = modalWKTEditableReader.write(event.feature);
                if (out !== initialWKT) {
                    findByMdstId("input", id + "-criterion-dialog-wkt-input").val(out);
                    WKTinput.val(out);
                    boundingBoxLayer.removeAllFeatures();   //refresh le block
                    wktReader = new OpenLayers.Format.WKT();
                    boundingBoxLayer.addFeatures(wktReader.read(out));
                }
            }
            ;
            //////////////////////////////////////////////////////LAYER2
            //Second method to select a zone : Draw some Box layer to select zones  

            var boxLayer = new OpenLayers.Layer.Vector("Nouvelle selection", {
                styleMap: styleMap,
                'displayInLayerSwitcher': false,
                visibility: false
            }
            );

            var formats = {
                wkt: new OpenLayers.Format.WKT(),
                geojson: new OpenLayers.Format.GeoJSON(),
                georss: new OpenLayers.Format.GeoRSS(),
                gml: new OpenLayers.Format.GML(),
                kml: new OpenLayers.Format.KML()
            };
            var type = "wkt";
            var theParser = formats[type];
            ///////////CONTROLS
            drawControls = {
                editable: new OpenLayers.Control.ModifyFeature(modalBoundingBoxEditableLayer), // resize, drow, rotate
                box: new OpenLayers.Control.DrawFeature(boxLayer,
                        OpenLayers.Handler.RegularPolygon, {
                            handlerOptions: {
                                sides: 4,
                                irregular: true
                            }
                        }),
                modify: new OpenLayers.Control.ModifyFeature(boxLayer, {
                    deferDelete: true,
                    eventListeners: {
                        'beforefeaturedeleted': reportEvent,
                        'featuredeleted': reportEvent}
                })
            };
            var myControls = [drawControls["box"]];
            myControls[0].displayClass = 'olControlSelectFeature';
            var editingToolbar = new OpenLayers.Control.Panel({
                displayClass: 'olControlEditingToolbar'});
            editingToolbar.addControls(myControls);
            function toggleControl(element) {
                for (key in drawControls) {
                    var control = drawControls[key];
                    if (element.val() === key && element.is(':checked')) {
                        control.activate();
                        if (key === "editable") {
                            modalBoundingBoxEditableLayer.setVisibility(true);
                            editingToolbar.deactivate();
                        }
                        if (key === "box") {
                            boxLayer.setVisibility(true);
                        }
                    } else {
                        control.deactivate();
                        if (key === "editable") {
                            modalBoundingBoxEditableLayer.setVisibility(false);
                            editingToolbar.activate();
                        }
                        if (key === "box") {
                            boxLayer.setVisibility(false);
                        }
                    }
                }
            }
            // Functions to change the behavior of modify control
            function updateModifyControl() {
                drawControls.modify.mode |= OpenLayers.Control.ModifyFeature.DELETE;
                drawControls.modify.mode |= OpenLayers.Control.ModifyFeature.DRAG;
            }
            for (var key in drawControls) {
                window[modalMapID].addControl(drawControls[key]);
            }
            window[modalMapID].addControl(editingToolbar);

            //            $("#resizeToggle").on("click", function(){    ///////MALADROIT de verifier les checkbox pour activer les controles
            //                UTIL.VIEW.findByMdstId("div", id+"-criterion-dialog-wkt-div").hide();    
            //                $("#checkbox").hide();
            //                toggleControl( $(this));
            //            });
            $("#boxToggle").on("click", function () {
                findByMdstId("div", id + "-criterion-dialog-wkt-div").hide();
                $("#checkbox").show();
                toggleControl($(this));
            });

            $("#wktToggle").on("click", function () {    ///////MALADROIT de verifier les checkbox pour activer les controles
                $("#checkbox").hide();
                findByMdstId("div", id + "-criterion-dialog-wkt-div").show();
            });

            boxLayer.events.register('featureadded', boxLayer, findcoords);
            boxLayer.events.register('beforefeatureadded', boxLayer, deleteOld);
            boxLayer.events.register('featuremodified', boxLayer, findcoords);
            function deleteOld(event) {
                if (boxLayer.features.length > 0) {
                    boxLayer.removeAllFeatures();
                }
                drawControls["box"].deactivate();
                drawControls["modify"].activate();
            }
            function findcoords(event) {
                out = theParser.write(event.feature);
                console.log('ID:' + out);
                if (out !== initialWKT) {
                    console.log("change");
                    findByMdstId("input", id + "-criterion-dialog-wkt-input").val(out);
                    WKTinput.val(out);
                    boundingBoxLayer.removeAllFeatures();   //refresh le block
                    wktReader = new OpenLayers.Format.WKT();
                    boundingBoxLayer.addFeatures(wktReader.read(out));
                }
            }

            wms_demis_topo = new OpenLayers.Layer.WMS("&#160;Demis topo",
                    "http://www2.demis.nl/wms/wms.asp",
                    {wms: 'WorldMap', layers: 'Topography', exceptions: 'inimage', format: 'image/gif', srs: 'epsg:4326', transparent: 'true', service: 'wms', version: '1.1.1'},
            {tileSize: new OpenLayers.Size(256, 256), buffer: 1});

            var wms_demis_bathy = new OpenLayers.Layer.WMS("&#160;Demis bathy",
                    "http://www2.demis.nl/wms/wms.asp",
                    {wms: 'WorldMap', layers: 'Bathymetry', exceptions: 'inimage', format: 'image/gif', srs: 'epsg:4326', transparent: 'true', service: 'wms', version: '1.1.1'},
            {tileSize: new OpenLayers.Size(256, 256), buffer: 1});
            //Add the Layer to the ModalMap
            window[modalMapID].addLayers([modalOl_wms, wms_demis_bathy, wms_demis_topo, modalBoundingBoxLayer, modalBoundingBoxEditableLayer, boxLayer]);
            window[modalMapID].zoomToExtent(modalBoundingBoxLayer.getDataExtent());
            drawControls["editable"].activate();
            editingToolbar.deactivate();
            updateModifyControl();

            ///////POPUP UI !! probleme de selector pour la magnifique popup!! ..
            var validateId = compatibilityJQueryIdSelector(modalDiv.attr('mdst-id'));
            console.log(validateId);
            modalDiv.attr('id', validateId);
            $("#" + validateId).modal("hide").on('shown.bs.modal', function (event) {
                var $this = $(this);
                console.log("HEY");
//                $this.find('.modal-body').css({
//                    'height': 'auto', //probably not needed 
//                    'max-height': '100%'                  
//                });
                window[modalMapID].zoomToExtent(modalBoundingBoxLayer.getDataExtent());
                window[modalMapID].updateSize();
                modalGeographicalUpdate.button().on("click", function (event) {
                    onModalUpdate(event);
                    $this.modal('hide');
                });
            });
            modalButton.on("click", function () {
                $("#" + validateId).modal("show");

            });
            // Fix: la Map s'affiche en % si elle est en position absolute, mais alors elle n'a pas d' hauteur: pour les elements dessous, calcul du margin-top..'
            window[modalMapID].events.register('updatesize', null, function (evt) {
                //var newHeight = UTIL.VIEW.findByMdstId("div", id+"-dialog-map").height();
                console.log("update");
//                var newHeight = $('.olMap').height();
//                console.log("height of olMap:");
//                console.log(newHeight);
//                $('#bibouille').css('margin-top', newHeight + 20);
            });

            // petit travail sur l'input..
            // on click of "X", delete input field value and hide "X"
            findByMdstId("span", id + "-x").on("click", function () {
                findByMdstId("input", id + "-criterion-dialog-wkt-input").val("");
            });
            //////////////EVENTS////////////////////////////////////////////////////////////////////////////      
            // UPDATE 

            function onModalUpdate(event) {
                event.preventDefault();
                console.log("onModalUpdateEvent");
                console.log(initialWKT);
                console.log("out:");
                console.log(out);
                if ($checkbox.hasClass('checked')) {
                    keepNullValue = true;
                    if (out !== initialWKT) {
                        $.ajax({
                            url: options.domainName + options.localPath + "updateGeographicalCriterion.action",
                            data: {
                                workspaceURI: workspace,
                                criterionURI: criterion,
                                WKT: out,
                                SRID: "4326",
                                keepNullValue: keepNullValue
                            },
                            dataType: 'json',
                            success: function (data) {
                                sessionDestroyedError(data);
                                if (data.json.result === "true") {

                                    modalBoundingBoxLayer.removeAllFeatures();   //refresh le block
                                    modalWKTReader = new OpenLayers.Format.WKT();
                                    modalBoundingBoxLayer.addFeatures(modalWKTReader.read(out));
                                    criterionSuccessUpdateAction(workspace, $currentLi, place);
                                }
                            },
                            error: function (error) {
                                sessionDestroyedError(error);
                            },
                            beforeSend: function () {
                                showWaitingPopup(workspace + "-" + place);
                            }
                        });
                    }
                    else {
                        enableUnrequestedCriteriaBlock(workspace);
                    }
                } else {
                    keepNullValue = false;
                    $.ajax({
                        url: options.domainName + options.localPath + "updateGeographicalCriterion.action",
                        data: {
                            workspaceURI: workspace,
                            criterionURI: criterion,
                            WKT: out,
                            SRID: "4326",
                            keepNullValue: keepNullValue
                        },
                        dataType: 'json',
                        success: function (data) {
                            sessionDestroyedError(data);
                            if (data.json.result === "true") {
                                console.log("change");
                                modalBoundingBoxLayer.removeAllFeatures();   //refresh le block
                                modalWKTReader = new OpenLayers.Format.WKT();
                                modalBoundingBoxLayer.addFeatures(modalWKTReader.read(out));
                                criterionSuccessUpdateAction(workspace, $currentLi, place);
                            }
                        },
                        error: function (error) {
                            sessionDestroyedError(error);
                        },
                        beforeSend: function () {
                            showWaitingPopup(workspace + "-" + place);
                        }
                    });
                }
            }
            criterionElementsSelectedButton.button().on("click", function (event) {
                event.preventDefault();
                console.log(initialWKT);
                console.log(out);
                var $currentLi = $(event.target).closest('li').parent().closest('li');
                if ($checkbox.hasClass('checked')) {
                    keepNullValue = true;
                    if (out !== initialWKT) {
                        $.ajax({
                            url: options.domainName + options.localPath + "updateGeographicalCriterion.action",
                            data: {
                                workspaceURI: workspace,
                                criterionURI: criterion,
                                WKT: out,
                                SRID: "4326",
                                keepNullValue: keepNullValue
                            },
                            dataType: 'json',
                            success: function (data) {
                                sessionDestroyedError(data);
                                if (data.json.result === "true") {
                                    modalBoundingBoxLayer.removeAllFeatures();   //refresh le block
                                    modalWKTReader = new OpenLayers.Format.WKT();
                                    modalBoundingBoxLayer.addFeatures(modalWKTReader.read(out));
                                    criterionSuccessUpdateAction(workspace, $currentLi, place);
                                }
                            },
                            error: function (error) {
                                sessionDestroyedError(error);
                            },
                            beforeSend: function () {
                                showWaitingPopup(workspace + "-" + place);
                            }
                        });
                    }
                    else {
                        enableUnrequestedCriteriaBlock(workspace);
                    }
                } else {
                    keepNullValue = false;
                    $.ajax({
                        url: options.domainName + options.localPath + "updateGeographicalCriterion.action",
                        data: {
                            workspaceURI: workspace,
                            criterionURI: criterion,
                            WKT: out,
                            SRID: "4326",
                            keepNullValue: keepNullValue
                        },
                        dataType: 'json',
                        success: function (data) {
                            sessionDestroyedError(data);
                            if (data.json.result === "true") {
                                console.log("change");
                                modalBoundingBoxLayer.removeAllFeatures();   //refresh le block
                                modalWKTReader = new OpenLayers.Format.WKT();
                                modalBoundingBoxLayer.addFeatures(modalWKTReader.read(out));
                                criterionSuccessUpdateAction(workspace, $currentLi, place);
                            }
                        },
                        error: function (error) {
                            sessionDestroyedError(error);
                        },
                        beforeSend: function () {
                            showWaitingPopup(workspace + "-" + place);
                        }
                    });
                }
                modalButton.magnificPopup('close');
            });

            ///////////////////////////////////////////////////////////////////////////
            var resultWidget = $("#" + workspace + "-resultWidget");
            if (resultWidget.attr("isWMS")) {
                var custom_layer;
                $.ajax({
                    url: options.domainName + options.localPath + "requestOGC.action",
                    type: "get",
                    async: false,
                    data: {
                        workspaceURI: workspace
                    },
                    success: function (data) {
                        sessionDestroyedError(data);
                        WMS_layer_name = data.json.result[0].layerName;
                        WMS_url = data.json.result[0].urlWS;
                        CQL_filter = data.json.result[0].filter;
                        custom_layer = new OpenLayers.Layer.WMS(
                                "WMS",
                                WMS_url, {
                                    layers: WMS_layer_name,
                                    format: 'image/png',
                                    transparent: "true"
                                }, {
                            isBaseLayer: false
                        });
                        if (CQL_filter !== null) {
                            custom_layer.mergeNewParams({
                                'cql_filter': CQL_filter
                            });
                        }
                        window[modalMapID].addLayers([custom_layer]);
                        custom_layer.setVisibility(false);

                    },
                    error: function (error) {
                        sessionDestroyedError(error);
                    }
                });
            }
            //UTIL
            // To report draw modify and delete events

            if (window.console && window.console.log) {
                reportEvent = function (event) {
                    console.log(event.type,
                            event.feature ? event.feature.id : event.components);
                };
            } else {
                reportEvent = function () {
                };
            }
        }
        function onUpdateSuccess(workspaceURI, isCoverageView, place) {
            hideWaitingPopup(workspaceURI + "-" + place);
            //ENABLE BLOCK SELECT
            enableUnrequestedCriteriaBlock(workspaceURI);
            dataInit(options.workspace);
            options.onUpdate.call();
        }
        function DateToFormatPickerConverter(date) {
            //                  TYPE: 1-> YEAR
            //                        2-> MONTH
            //                        3 ->DAY
            //                        4-> HOUR
            var month = date.getMonth() + 1;
            console.log(month);
            var dateConverted = date.getFullYear() + "-" + month + "-" + date.getDate()
                    + " " + date.getHours() + ":" + date.getMinutes();
            return dateConverted;
        }
        function findByMdstId(type, mdstId) {
            var selector = type + "[mdst-id='" + mdstId + "']";
            return $(selector);
        }
        function findByMdstIdAsChild(type, mdstId, chain) {
            var selector = type + "[mdst-id='" + mdstId + "'] " + chain;
            return $(selector);
        }
        function enableUnrequestedCriteriaBlock(workspaceURI) {
            var enableText = $("#" + workspaceURI + "-unrequestedCriteria-select").attr('titleForEnable');
            var id = "select[id=" + workspaceURI + "-unrequestedCriteria-select] option:selected";
            $(id).each(function () {
                $(this).text(enableText);
            });
            $("#" + workspaceURI + "-unrequestedCriteria-select").prop("disabled", false).attr('title', enableText);

        }
        function disableUnrequestedCriteriaBlock(workspaceURI) {
            var desableText = $("#" + workspaceURI + "-unrequestedCriteria-select").attr('titleForDesable');
            var id = "select[id=" + workspaceURI + "-unrequestedCriteria-select] option:selected";
            $(id).each(function () {
                $(this).text(desableText);
            });
            $("#" + workspaceURI + "-unrequestedCriteria-select").prop("disabled", "disabled").attr('title', desableText);
        }
        function compatibilityJQueryIdSelector(myid) {
            return "" + myid.replace(/(:|\.|\[|\]|\/)/g, "");
        }
        function sessionDestroyedError(data) {
            var response;
            if (data.responseText) {
                data = data.responseText;
            }

            if (data === "false") {
                response = $('<div/>').addClass('white-popup').append('<div id="error"> Maybe your session has expired or you meet a bug !!<a href="index.jsp">Please click HERE to go to restart</a></div>');
                $.magnificPopup.open({
                    items: {
                        src: response, // can be a HTML string, jQuery object, or CSS selector
                        type: 'inline'
                    }
                });
            }
            else {
                console.log("HTML struts response ");
                response = $('<div/>').addClass("white-popup").append(data);
                var $exist = response.find('div#error');
                if ($exist.length) {
                    $.magnificPopup.open({
                        items: {
                            src: response, // can be a HTML string, jQuery object, or CSS selector
                            type: 'inline'
                        }
                    });
                }
            }
        }
        // set options
        var options = $.extend(mdst.defaultOptions, options), //This way if 0 arguments are passed it will use the defaults but any argument (option) passed in will override our default.
                $mainDiv = $(this);
        // create html content
        if (options.workspace !== "") {
        }
        $mainDiv.empty();
        entryPoint();
        this.reload = function () {
            entryPoint();
        };
        return this;
    };
})(jQuery);

