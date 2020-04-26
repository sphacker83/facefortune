function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
		var fileInfo = input.files[0];
		
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('.image-title-wrap').hide();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').fadeIn(3000);
            $('.image-title').html(fileInfo.name);
        };
        //reader.readAsDataURL(fileInfo);

        EXIF.getData(fileInfo, () => {
            const orientation = EXIF.getTag(fileInfo, 'Orientation');
            // $('#orient').html("Orient : " + orientation);
			// console.log(fileInfo);

			var image = document.getElementById("face");
			
            switch (orientation) {
                // @details 이미지 회전값이 0인경우 ( 정방향 )
                case 1:
                    image.style.transform = 'rotate( 0deg )';
                    break;

                // @details 이미지 회전값이 180 기운 경우
                case 3:
                    image.style.transform = 'rotate( 180deg )';
                    break;

                // @details 이미지 회전값이 270 기운 경우 ( 왼쪽으로 90 기운 경우 )
                case 6:
                    image.style.transform = 'rotate( 90deg )';
                    break;

                // @details 이미지 회전값이 90 기운 경우
                case 8:
                    image.style.transform = 'rotate( 270deg )';
                    break;
            }
        });

        if (fileInfo) {
            // @details readAsDataURL( )을 통해 파일의 URL을 읽어온다.
            reader.readAsDataURL(fileInfo);
        }

        init().then(function() {
            predict();
            $('#loading').hide();
            $('.image-title-wrap').fadeIn(500);
        });
    } else {
        removeUpload();
    }
}