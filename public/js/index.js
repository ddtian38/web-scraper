$(function(){
    //initializing modals for materialize
   
    $(".view-btn").on("click", function(e){
        let commentSection = $(this).parents(".row").find(".comments-section").eq(0)
        commentSection.empty();
        commentSection.toggle();
  
        $.ajax({
            url: "/article/"+$(this).data("id")+"/comments",
            type: "GET",
            success: function(res){
                console.log(res)
                commentSection.prepend($("<h4> Comments </h4>"))
                if(res.length > 0){
                    for(let i = 0; i < res.length; i++){
                        commentSection.append(`
                            <div class="card horizontal">
                            <div class="card-image">
                                <img src="https://www.yourbusinessfreedom.com.au/wp-content/uploads/2017/02/unknown-profile-1.jpg">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                <span class="card-title activator grey-text text-darken-4 username">${res[i].user}</span>
                                <p class="comments">${res[i].content}</p>
                              </div>
                              <div class="card-action">
                                <a class="waves-effect waves-dark  btn-small remove-btn" data-id="${res[i]._id}">Remove Comment</a>
                              </div>
                          </div>                       
                        `)
                    }
                }else{
                    commentSection.append($("<p> No Comments added yet! </p>"))
                }     
            }
        })
    })

    $(".comment-btn").on("click", function(e){
        let id = $(this).data("id")
        $("#comment-submit").attr("data-id", id);
    })

    //comment modal
    $("#comment-submit").on("click", function(e){
        console.log($(`.comments-section[data-id = \"${$("#comment-submit").attr("data-id")}\"`).css("display"))


        $.ajax({
            url: "/api/comments", 
            type: "POST",
            data: {
                    id: $("#comment-submit").attr("data-id"), 
                    user: $("#user_name").val().trim(),
                    comment: $("textarea").val().trim()
                },
            success: function(res){
                let commentSection = $(`.comments-section[data-id = \"${$("#comment-submit").attr("data-id")}\"`)
                if(commentSection.css("display") !== "none"){

                    if(commentSection.find("p")){
                        commentSection.find("p").remove();
                    }
                    
                    commentSection.append(`
                        <div class="card horizontal">
                        <div class="card-image">
                            <img src="https://www.yourbusinessfreedom.com.au/wp-content/uploads/2017/02/unknown-profile-1.jpg">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4 username">${res.user}</span>
                            <p class="comments">${res.content}</p>
                          </div>
                          <div class="card-action">
                            <a class="waves-effect waves-dark  btn-small remove-btn" data-id="${res._id}">Remove Comment</a>
                          </div>
                      </div> 
                    `) 
                }
                $("#user_name").val("")
                $("textarea").val("")
                $("#comment-submit").attr("data-id", "");
            }
         })
 
    })
 
    $(".comments-section").on("click", ".remove-btn", function(e){
        console.log($(this).data("id"))
        let commentId = $(this).data("id");
        console.log($(this).parents(".card"))
        $(this).parents(".card").remove();

        $.ajax({
            url: "/api/comments/"+commentId, 
            type: "DELETE",
            success: function(res){

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








