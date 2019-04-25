$(document).ready(function(){
    //initializing modals for materialize
    $('.modal').modal();

    $(document).on("click", "#scrape-btn", (e) => {
        e.preventDefault();
        $.ajax({
            url: "/scrape",
            type: "GET",
            success: function(res){
                console.log(res)
                window.location.reload();
            }       
        })
    })
    
    $(document).on("click", "#clear-btn", (e) => {
        e.preventDefault();
        $.ajax({
            url: "/api/articles",
            type: "DELETE",
            success: function(res){
                console.log(res)
                window.location.reload()
            }
        })
    })



  
  });








