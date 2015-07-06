<%-- 
    Document   : viewOptionBlock
    Created on : 16 juin 2014, 16:19:46
    Author     : julien
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<s:i18n name="StaticRessource">

    <div class="row " id="MDSTContainer" >        
        <div class="col-md-8">
            <div class="container-fluid">
                <div class="row">

                    <div id="<s:property value="workspace.URI"/>-requestedCriteria-ul-loader" class="progress" style="display:none ; margin: 0 0 10px 12px ;">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                            <span class="sr-only">40% Complete (success)</span>
                        </div>
                    </div>
                    <ul id="<s:property value="workspace.URI"/>-requestedCriteria-ul" class="requestedCriteria-ul " style="background-color: #f7f7f7 !important;">

                        <s:iterator value="requestedCriteriaList" var="requestedCriterionVar"> 
                            <s:action name="getBlockRequestedCriteriaActionCall" executeResult="true">
                                <s:param name="workspaceURI" value="workspaceURI"/>
                                <s:param name="criterionURI" value="#requestedCriterionVar.URI"/>
                            </s:action>
                        </s:iterator>  
                        <li class="spi" criterionType="SELECTBOX">         
                            <div id="<s:property value="workspace.URI"/>-unrequestedCriteria-div" > 
                                <s:if test="unrequestedCriteriaList.size()>0" >
                                    <select id="<s:property value="workspace.URI"/>-unrequestedCriteria-select" class="criteria-select btn-primary " workspaceURI="<s:property value="workspace.URI"/>" titleForDesable="Validez le choix précédent pour continuer." titleForEnable="<s:text name="newCriteriaAdd"/>" title="<s:text name="newCriteriaAdd"/>">
                                        <option value='' disabled selected style='display:none;'><s:text name="newCriteriaAdd"/></option>
                                        <s:iterator value="unrequestedCriteriaList" var="unrequestedCriterionVar">    
                                            <option value="<s:property value="#unrequestedCriterionVar.URI"/>">  <s:property value="#unrequestedCriterionVar.label.get(#request.locale)"/> </option>
                                        </s:iterator> 
                                    </select>
                                </s:if>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-md-2" id="resultContainer">
            <div class="container-fluid result-container">
                <div class="row">   
                    <div id="<s:property value="workspace.URI"/>-resultBlock" class="result-block" >
                        <s:action name="displayResult" executeResult="true" />   
                    </div>
                </div>
            </div>
        </div>

    </div>

</s:i18n>


