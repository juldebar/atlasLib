
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!--<p id="feedback">
    <span>You've selected:</span> <span id="select-result">none</span>.
</p>-->
<s:i18n name="i18nResources">

    <div class="ui-multiselect widget-content otherSize">

        <ol mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionSelectable-ol"  >

            <!--   Changer criterionSelectableOlId   en     criterionElementsSelectableOlId-->
            <s:iterator value="elements" var="elementVar"> 
                <li uri="<s:property value="#elementVar.element.URI"/>" label="<s:property value="#elementVar.element.label.get(#request.locale)"/>" class="ui-widget-content <s:if test="#elementVar.required==true" >ui-required</s:if>">
                    <s:property value="#elementVar.element.label.get(#request.locale)"/>
                </li>
            </s:iterator>  
        </ol>

    </div>
    <div class=" ui-helper-clearfix widget-footer otherSize">
        <ul class="ui-helper-reset">
            <li  class="pull-left"><a class="ui-multiselect-all" href="#"><span class="glyphicon glyphicon-ok"></span><span> check</span></a></li>
            <li  class="pull-left"><a class="ui-multiselect-none" href="#"><span class=" glyphicon glyphicon-remove-circle"></span><span> uncheck</span></a></li>
            <li  class="pull-right">
                <button type="button" class="update btn btn-danger" mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionElementsSelected-button" workspaceURI="<s:property value="workspaceURI"/>" criterionURI="<s:property value="criterionURI"/>">OK</button>
            </li>
        </ul>
    </div>

    <!--          Modal  -->
<!--    <div mdst-id="<s:property value="workspaceURI" />-<s:property value="criterionURI"/>-criterionDialog-div" class="white-popup mfp-hide" >

        <div class="popup-content">
            <select mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionDialog-select" multiple="multiple">
    <s:iterator value="elements" var="elementVar"> 
        <option value="<s:property value="#elementVar.element.URI"/>" <s:if test="#elementVar.required==true" >selected</s:if>>
        <s:property value="#elementVar.element.label.get(#request.locale)"/>
    </option> 
    </s:iterator>  
</select>
</div>

</div>-->


    
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" mdst-id="<s:property value="workspaceURI" />-<s:property value="criterionURI"/>-criterionDialog-div">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div  class="modal-body bg-info">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <select mdst-id="<s:property value="workspaceURI"/>-<s:property value="criterionURI"/>-criterionDialog-select" multiple="multiple">
                        <s:iterator value="elements" var="elementVar"> 
                            <option value="<s:property value="#elementVar.element.URI"/>" <s:if test="#elementVar.required==true" >selected</s:if>>
                                <s:property value="#elementVar.element.label.get(#request.locale)"/>
                            </option> 
                        </s:iterator>  
                    </select>

                </div>
            </div>
        </div>
    </div>




</s:i18n>
