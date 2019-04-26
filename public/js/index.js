$(function(){
    //initializing modals for materialize
   
    $(".view-btn").on("click", function(e){
        // console.log()
        // $(".comments-section").toggle()
        $(this).parents(".row").find(".comments-section").eq(0).toggle()
  
  
        $.ajax({
            url: "/article/"+$(this).data("id")+"/comments",
            type: "GET",
            success: function(res){
                if(!(res === "No comments")){
                    
                }
                
            }
        })
    })

    $(".comment-btn").on("click", function(e){
        let id = $(this).data("id")
        $("#comment-submit").attr("data-id", id);
    })


    $("#comment-submit").on("click", function(e){

        console.log({id: $("#comment-submit").attr("data-id"), 
                user: $("#user_name").val().trim(),

                 comment: $("textarea").val().trim()})

        $.ajax({
            url: "/api/comments", 
            type: "POST",
            data: {
                    id: $("#comment-submit").attr("data-id"), 
                    user: $("#user_name").val().trim(),
                    comment: $("textarea").val().trim()
                },
            success: function(res){
                $("textarea").val("")
                $("#comment-submit").attr("data-id", "");
                console.log(res)
            }
         })
 
    })

 

    $(document).on("click", "#scrape-btn", function(e){
        $.ajax({
            url: "/scrape",
            type: "GET",
            success: function(res){
                console.log(res)
                window.location.reload();
            }       
        })
    })
    
    $(document).on("click", "#clear-btn", function(e){
        $.ajax({
            url: "/api/articles",
            type: "DELETE",
            success: function(res){
                console.log(res)
                window.location.reload()
            }
        })
    })

    $('.modal').modal();


  
  });








