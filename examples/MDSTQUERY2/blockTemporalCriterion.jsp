<!--    DESCRIPTION GENERALE (french): Ce block est inclu dans le blockRequestedCriteria.jsp . Il est renvoy� quand le critere qui a et� selectionn� est de type temporal.
-  block de selection d'une date de debut (ou )et de selection d'une heure de debut en fonction de l'intervalle de temps donn� par la requete
-                                   fin                                        fin
+ equivalent en popup pour une recherche plus confortable
  DESCRIPTION DETAILLEE DE LA POPUP (voir GetTemporalCriterion.java):
  Lorsque l'intervalle de temps est <3 jours les pas sont des heures. pas de supplement
                                    <6 mois les pas sont des jours
     </div>-->

<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:i18n name="i18nResources">
    <div class="ui-multiselect widget-content otherSize">
        <p>Start</p>
        <div class="input-append ">
            <input mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-datePickerStart" type="text" data-new="" data-init=""  value="<s:property value="criterionTemporal.startDate.getTime()" />" class="start input-small form_datetime1" readonly="readonly" >

        </div>

        <p>End</p>
        <div class="input-append time-input">
            <input mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-datePickerEnd" type="text" data-new="" data-init=""  value="<s:property value="criterionTemporal.endDate.getTime()"/>" class="end input-small form_datetime1" readonly="readonly" >

        </div>
    </div>
    <div class=" widget-footer ui-helper-clearfix otherSize">
        <ul class="ui-helper-reset">           
            <li  class="pull-right">
      <button type="button" class="update btn btn-danger" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionElementsSelected-button" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">OK</button>
             </li>
        </ul>
    </div>     

</s:i18n>