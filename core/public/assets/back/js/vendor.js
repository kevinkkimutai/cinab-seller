(function($) {
    "use strict"; // Start of use strict

    $(document).on('change','#withdraw_method',function(){
        let method = $(this).val();
        
        if(method == ''){
            $('.email-field-view').addClass('d-none');
            $('.bank-view-info').addClass('d-none');
        }else if(method == 'bank'){
            $('.email-field-view').addClass('d-none');
            $('.bank-view-info').removeClass('d-none');
        }
        else{
            $('.email-field-view').removeClass('d-none');
            $('.bank-view-info').addClass('d-none');
        }
    });





})(jQuery); // End of use strict
