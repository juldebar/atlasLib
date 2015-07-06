<!--    DESCRIPTION GENERALE (french): Ce block est inclu dans le blockRequestedCriteria.jsp . Il est renvoy� quand le critere qui a et� selectionn� est de type temporal.
-  block de selection d'une date de debut (ou )et de selection d'une heure de debut en fonction de l'intervalle de temps donn� par la requete
-                                   fin                                        fin
+ equivalent en popup pour une recherche plus confortable
  DESCRIPTION DETAILLEE DE LA POPUP (voir GetTemporalCriterion.java):  -->

<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:i18n name="i18nResources">
    <div class="ui-multiselect widget-content geo ">
        <div mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-map" style="margin: 0px auto;width:158px;height:160px; position: relative; float: right; " ></div>
        <form>
            <input  type="hidden" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-WKT-input" style="height:10px;" value="<s:property value="criterionGeographical.getConvexHullWKT()"/>"/>
        </form>
    </div>


    <div class=" ui-helper-clearfix widget-footer ">
        <ul class="ui-helper-reset">           
            <li  class="pull-right">
             <button type="button" class="update btn btn-danger" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionElementsSelected-button" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">OK</button>
         </li>
        </ul>
    </div>            

    <!--          Modal 
    <div mdst-id="<s:property value="workspaceURI" />-<s:property value="criterionURI"/>-criterion-dialog-div" class="white-popup mfp-hide" >

        <div id="panel"></div>
        <div mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-dialog-map"  style=" 
             position:absolute;
             max-width:1500px;
             max-height:1000px;
             width:95%;
             height:70%;
             ">
        </div>
        <div id="bibouille">   
        </div>
        <div id="info"  >
            <fieldset>
                <ul id="controlToggle" style="list-style: none;">
                    <li> <h3>Other ways:</h3></li>
                    <li>
                        <div class="alert alert-info">
                            <label class="radio" >
                                <input type="radio" name="type" value="box" id="boxToggle" />
                                Create a SELECT BOX.
                            </label>

                            <div id="checkbox"  style="display:none;">
                                <label class="checkbox"  >
                                    Snap tolerance value
                                    <input type="text" id="mySnapTolerance" name="snapTolerance" key="map.snapTolerance" />

                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="alert alert-info">
                            <label class="radio" >
                                <input type="radio" name="type" id="wktToggle" />
                                Enter a new WKT value
                            </label>

                            <div mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-div" style=" display:none;">
                                <form  class="checkbox"   >
                                    <input type="text" class="field" name="field" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-input" value="" />
                                    <div class="delete" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-input-delete">
                                        <span mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-x" class="x">x</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </li>
                </ul>
                <span class="btn btn-large btn-primary pull-right" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-geographicalUpdate" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">Update</span>
            </fieldset>
        </div> 
    </div>
            -->

    <div class="modal hide fade bg-info" mdst-id="<s:property value="workspaceURI" />-<s:property value="criterionURI"/>-criterionDialog-div" >

        <div class="modal-dialog">

            <div class="modal-content  bg-info">
               <div class="modal-header btn-info">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div  class="modal-body bg-info">
                    
                    <div id="panel"></div>
                    <div mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-dialog-map"  style=" 
                         position:absolute;
                         max-width:1500px;
                         max-height:1000px;
                         width:95%;
                         height:70%;
                         ">
                    </div>
                    <div id="bibouille">   
                    </div>
                    <div class="info" style=" 
                        margin-top:70%;
                         " >
                        <fieldset>
                            <ul id="controlToggle" style="list-style: none;">
                              
                                <li>
                                    <div class="alert alert-info">
                                        <label class="radio" >
                                            <input type="radio" name="type" value="box" id="boxToggle" />
                                            Create a SELECT BOX.
                                        </label>

                                        <div id="checkbox"  style="display:none;">
                                            <label class="checkbox"  >
                                                Snap tolerance value
                                                <input type="text" id="mySnapTolerance" name="snapTolerance" key="map.snapTolerance" />

                                            </label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="alert alert-info">
                                        <label class="radio" >
                                            <input type="radio" name="type" id="wktToggle" />
                                            Enter a new WKT value
                                        </label>

                                        <div mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-div" style=" display:none;">
                                            <form  class="checkbox"   >
                                                <input type="text" class="field" name="field" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-input" value="" />
                                                <div class="delete" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterion-dialog-wkt-input-delete">
                                                    <span mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-x" class="x">x</span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <span class="btn btn-large btn-primary pull-right" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-geographicalUpdate" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">Update</span>
                        </fieldset>
                    </div> 

                </div>
               
            </div>
        </div>

    </div>


</s:i18n>
