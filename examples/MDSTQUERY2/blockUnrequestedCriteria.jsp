
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:i18n name="StaticRessource">
    <s:if test="unrequestedCriteriaList.size()>0" >

        
        <select id="<s:property value="workspace.URI"/>-unrequestedCriteria-select" class="criteria-select btn-primary " workspaceURI="<s:property value="workspace.URI"/>" titleForDesable="Validez le choix précédent." titleForEnable="<s:text name="newCriteriaAdd"/>" title="<s:text name="newCriteriaAdd"/>">
            <option value='' disabled selected style='display:none;'><s:text name="newCriteriaAdd"/></option>
            <s:iterator value="unrequestedCriteriaList" var="unrequestedCriterionVar">    
                <option value="<s:property value="#unrequestedCriterionVar.URI"/>">  <s:property value="#unrequestedCriterionVar.label.get(#request.locale)"/> </option>
            </s:iterator> 
        </select>

    </s:if>
</s:i18n>
