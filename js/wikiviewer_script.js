
$(document).ready(function(){
  
  //event handler: keypress
  $("#searchbox").on("keypress", function(e){
    if (e.keyCode === 13){
      
      var keyword = $("#searchbox").val();
      
      $("#main").empty();
      getWiki(keyword);
  
      return false; //確保此表單不會再做其他事情，例如提交自己使得網頁刷新跳掉
   
    } //end if
  }); //end event handler: keypress
  
  
   //event handler: scroll
     $(window).on("scroll", function() {
        if($(this).scrollTop() >= 200) {
            $("#top").fadeIn();    
        } else {
            $("#top").fadeOut();
        }
    });//event handler: scroll

  
    //event handler: click  
    $("#top").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: 0},500);
    }); //event handler: click    
  
}); // end document ready


// get API data and append to div#main
 function getWiki (keyword){
   var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + keyword;
   
   // create html content
   function createMsg(){
      var msgcont = 'Sorry, no results found for "' + keyword + '".<br>Maybe you could...<br><ul><li>Try different keywords</li><li>Try fewer keywords</li></ul>';
     
      return msgcont;
    } // end createMsg()
   
   // create html content
   function createArticle(){
     var $articlediv = $('<div class="wikipagebox"><a class="article" target="_blank"><p class="title"></p><p class="text"></p></a></div>');// 用$將html內容轉變成jquery object而非只是string，才能在後面使用.find()
     
     return $articlediv;
   } // end createArticle()
   
   
   $.getJSON(url, function(json){
     
     // situation: no results
     if (json[1].length == 0) {
       var msg = createMsg();
       $("#main").html(msg).css("color", "#333333");
       
      } else {
     
      for (var i=0; i<json[1].length; i++){
       var $article = createArticle();
       var webpage, title, text, $webpage, $title, $text;
       
        // get contents
        webpage = json[3][i]; 
        title = json[1][i];
        text = json[2][i];
        
        // prepare to append contents to $article
        $("#main").append($article); 
        $webpage = $article.find(".article");
        $title = $article.find(".title");
        $text = $article.find(".text");   
        
        // situation: no content to show (empty string)
        if (text == "") {
          $webpage.attr("href", webpage);
          $title.html(title);
          $text.html(title + " may refer to:");
              
        } else {
          $webpage.attr("href", webpage);
          $title.html(title);
          $text.html(text);
            
        }// end if(text == "") 
        
      }// end for loop
          
    }// end if(json[1] == []) 
     
  });// end getJSON
}//end getWiki();
