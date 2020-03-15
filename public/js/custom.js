$(document).ready(function() {
    $('.delete-recipe').on('click', function() {
        const id = $(this).data('id');
        const url = '/delete/' + id;
        if(confirm('Confirm deletion?')) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: (result) => {
                    console.log('Deleting Recipe...');
                    window.location.href='/';
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }
    });

    $('.edit-recipe').one('click', function() {
        $('#edit-modal-name').val($(this).data('name'));
        $('#edit-modal-ingredients').val($(this).data('ingredients'));
        $('#edit-modal-directions').val($(this).data('directions'));
        $('#edit-modal').attr('action', '/edit/' + $(this).data('id'));
    });
});