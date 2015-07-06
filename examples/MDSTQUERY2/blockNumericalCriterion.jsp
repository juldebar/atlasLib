<!--    DESCRIPTION GENERALE (french): Ce block est inclu dans le blockRequestedCriteria.jsp . Il est renvoy� quand le critere qui a et� selectionn� est de type temporal.
-  block de selection d'une date de debut (ou )et de selection d'une heure de debut en fonction de l'intervalle de temps donn� par la requete
-                                   fin                                        fin
+ equivalent en popup pour une recherche plus confortable
  DESCRIPTION DETAILLEE DE LA POPUP (voir GetTemporalCriterion.java):
 
     </div>-->
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:i18n name="i18nResources">
    <div class="ui-multiselect widget-content ">
        <p>Start</p>
        <div class="input-append">
            <input mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-minValue" type="text" data-init="" value="<s:property value="criterionNumerical.min" />" class="input-small " >

        </div>

        <p>End</p>
        <div class="input-append">
            <input mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-maxValue" type="text" data-init="" value="<s:property value="criterionNumerical.max"/>" class=" input-small " >

        </div>
    </div>
    <div class=" widget-footer ui-helper-clearfix ">
        <ul class="ui-helper-reset">           
            <li  class="pull-right">
       <button type="button" class="update btn btn-danger" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionElementsSelected-button" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">OK</button>
            </li>
        </ul>
    </div>            

    <!--          Modal  -->
    <div mdst-id="<s:property value="workspaceURI" />-<s:property value="criterionURI"/>-criterionDialog-div" class="white-popup mfp-hide" >

     
        <div class="popup-content">
           
            <div class="alert alert-info">
                <strong>Notice</strong>: Explications , mode d'emploi, etc...
                <a href="#" data-dismiss="alert" class="close">x</a>
            </div>
        </div>
    </div> 

</s:i18n>