/* Plugin puts first letter to uppercase
 ex. $('#title').firstLetterUppercase();
 needs jQuery
 */

(function($){
    $.fn.firstLetterUppercase = function(){
        var txt = this.text();
        var text = txt.charAt(0).toUpperCase() + txt.slice(1);
        this.text(text);
    }
})(jQuery);
