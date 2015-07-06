<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<li mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-requestedCriterion-li" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>" criterionType="<s:property value="criterionType"/>" class="spi">
    <div  class="criterion-div widget-box">
        <div class="widget-title ui-helper-clearfix">
            <ul class="ui-helper-reset">  
                <li class="pull-left">  <div class ="requestedCriteriaName"><i><s:property value="criterion.label.get(#request.locale)"/></i></div></li>
                <li class="pull-right" ><a class="marge deleteCriterion-button" href="#"> <span class="glyphicon glyphicon-remove"></span></a></li>
                <li class="pull-right"><a class="ui-multiselect-more marge" href="#" ><span class="glyphicon glyphicon-search"></span></a></li>
                
            </ul>  
            <span class="chevron"></span>
        </div>
        <s:action name="getBlockCriterion" executeResult="true">
            <s:param name="workspaceURI" value="workspaceURI"/>
            <s:param name="criterionURI" value="criterionURI"/>
        </s:action>   
        <ul class="ui-helper-reset">  
            <li class="pull-left" <s:if test="!criterion.existNullValue"> style="visibility: hidden;"
                </s:if> rel="tooltip" title="include Null value"><label class="checkbox">
                    <input type="checkbox" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-existNullCheckbox" 
                           class="checked" checked="checked"> Null</label></li>
        </ul> 
    </div>
</li>


