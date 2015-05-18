<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>文件上传</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
  <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
  <script type="text/javascript" src="js/fineuploader-4.4.min.js"></script>
   <link rel="stylesheet" href="css/fineuploader-4.4.min.css"/>
</head>


<body style="font-size: 12px;">

	<!-- Fine Uploader DOM Element
====================================================================== -->
	<div id="thumbnail-fine-uploader"></div>

	<!-- Fine Uploader template
====================================================================== -->
	<script type="text/template" id="qq-simple-thumbnails-template">
  <div class="qq-uploader-selector qq-uploader ">
    <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>
      <span>将文件拖拽至此</span>
    </div>
    <div class="qq-upload-button-selector qq-upload-button">
      <div>文件上传</div>
    </div>
    <span class="qq-drop-processing-selector qq-drop-processing">
      <span>Processing dropped files...</span>
      <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
    </span>
    <ul class="qq-upload-list-selector qq-upload-list">
      <li>
        <div class="qq-progress-bar-container-selector">
          <div class="qq-progress-bar-selector qq-progress-bar"></div>
        </div>
        <span class="qq-upload-spinner-selector qq-upload-spinner"></span>
        <img class="qq-thumbnail-selector" qq-max-size="100" qq-server-scale>
        <span class="qq-edit-filename-icon-selector qq-edit-filename-icon"></span>
        <span class="qq-upload-file-selector qq-upload-file"></span>
        <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">
        <span class="qq-upload-size-selector qq-upload-size"></span>
        <a class="qq-upload-cancel-selector qq-upload-cancel" href="#">Cancel</a>
        <a class="qq-upload-retry-selector qq-upload-retry" href="#">继续上传</a>
        <a class="qq-upload-delete-selector qq-upload-delete" href="#">Delete</a>
        <span class="qq-upload-status-text-selector qq-upload-status-text"></span>
      </li>
    </ul>
  </div>

</script>

	<script>
		function createUploader() {
			var thumbnailuploader = new qq.FineUploader({
				element : document.getElementById('thumbnail-fine-uploader'),
				template : "qq-simple-thumbnails-template",
				request : {
					endpoint : 'UploadReceiver'
				},
				callbacks : {
					onComplete : function(id, fileName, responseJSON) {
						//alert(responseJSON.success);
						
					},
					onSubmit : function(id, fileName) {
						//alert("uploading");
					}
				}
			});
		}

		window.onload = createUploader;
	</script>
	长
</body>
</html>
