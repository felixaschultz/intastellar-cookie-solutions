
jQuery(document).ready(function ($) {
    var mediaUploader;

    $('#intastellarCustomIconButton').click(function (e) {
        e.preventDefault();
        if (mediaUploader) {
            mediaUploader.open();
            return;
        }
        mediaUploader = wp.media.frames.file_frame = wp.media({
            title: 'Choose Logo',
            button: {
                text: 'Choose Logo'
            },
            multiple: false
        });
        mediaUploader.on('select', function () {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            $('#intastellarCustomIcon_id').val(attachment.url);
            $('#intastellarCustomIconPreview').attr('src', attachment.url);
        });
        mediaUploader.open();
    });
});
