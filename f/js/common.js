$(function() {
      $('#slides').slidesjs({
        width: 1280,
        height: 480,
        play: {
           
          auto: true,
          interval: 4000,
          swap: true
        }
      });
    });
 
$(function() {
      $('#offer').slidesjs2({
        width: 1180,
        height: 740,
        navigation: false
      });
    });
 
/*FORMA*/
$(function(){
  $(".b-contacts__callback a").on("click", function(){
  $("#popup-credit").show();
  return false;
 });

 $(".cancelComment").on("click", function(){
  $("#popup-credit").hide();
  return false;
 });
});

/*FORMA END*/


/*FORMA2*/
$(function(){
  $("#toggler2").on("click", function(){

  
  $("#popup-credit").show();
 })
 
 
 
 $(".cancelComment").on("click", function(){


  $("#popup-credit").hide();
 })
})
/*FORMA2 END*/


 
