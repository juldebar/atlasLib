
<%-- 
    Document   : blockResult
    Created on : 19 mars 2013, 15:47:12
    Author     : bonnefont
--%>
<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<s:i18n name="StaticRessource">

    <div class="widget-box" id="<s:property value="workspaceURI" />-resultWidget"  >

     
            <!--          loader    -->
            <div id="<s:property value="workspaceURI"/>-result-loader" class="progress result-progress progress-striped active"  style="display:none" >
                <s:text name="workspace.dataLoading"/>
                <div class="bar" style="width: 80%;"></div>
            </div> 

            <div class="widget-content">
                <s:if test="rowCount > 0">   <!-- if-->
                    <div><span class="result-title" >Source:</span><span><s:property value="sourceName"/></span></div>
                    <div><span class="result-title" >View:</span><span><s:property value="viewName"/></span></div>
                    <div id="<s:property value="workspaceURI"/>-info" class="btn btn-mini"><a><i class=" fa fa-info fa-3x"></i> </a></div>

                    <div><span class="result-title" >Data:</span><span><s:property value="rowCount"/>&nbsp;<s:text name="result.rows"/></span>  </div>


                    <s:if test="forbid">
                        <p><s:text name="result.forbid"/>&nbsp;(max&nbsp;<s:property value="dataForbidLimit"/>&nbsp;<s:text name="result.rows"/>)</p>
                    </s:if>
                    <s:elseif test="warning">
                        <div><span class="result-title" >Download File</span></div>
                        <div ><span><s:text name="result.warning"/>&nbsp;</span></div>
                        <div class="btn-group dataSubsetDownload-button" >

                            <button data-toggle="dropdown" class="btn btn-lg btn-warning dropdown-toggle" title="download" ><i class="fa fa-download"></i></button>

                            <ul class="dropdown-menu">
                                <li><a href="#" id="<s:property value="workspaceURI" />-download">CSV</a></li>
                                    <s:if test="existGeographicalCriterion==true">
                                    <li><a href="#" id="<s:property value="workspaceURI"/>-downloadWithShapeFiles">CSV + ShapeFile</a></li> 
                                    </s:if>
                                <!--                        <li><a href="#">Something else here</a></li>
                                                            <li class="divider"></li>
                                                            <li><a href="#">Separated link</a></li>-->
                            </ul>
                        </div> 
                    </s:elseif>
                    <s:else> 
                        <div><span class="result-title" >Download File</span></div>
                        <div class="btn-group dataSubsetDownload-button">
                            <button data-toggle="dropdown" class="btn btn-lg btn-success dropdown-toggle" title="download" ><i class="fa fa-download"></i></button>
                            <ul class="dropdown-menu">
                                <li><a href="#" id="<s:property value="workspaceURI" />-download">CSV</a></li>
                                    <s:if test="existGeographicalCriterion==true">
                                    <li><a href="#" id="<s:property value="workspaceURI"/>-downloadWithShapeFiles">CSV + ShapeFile</a></li> 
                                    </s:if>
                            </ul>
                        </div> 
                    </s:else>

                </s:if>

            </div>
       
    </div>

    <!--          Modal  -->
    <div id="<s:property value="workspaceURI" />-subsetVisualization" class="white-popup mfp-hide   " >
        <div style=" 
             position:absolute;
             max-width:1500px;
             max-height:1000px;
             width:95%;
             height:90%;
             " id="<s:property value="workspaceURI"/>-WMSmap">
        </div>     
    </div>

</s:i18n>
