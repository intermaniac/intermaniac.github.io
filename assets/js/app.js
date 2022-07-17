
var page_size=5;
var preview_template = '<div class="col-lg-12">'+
'                  <div class="blog-post">'+
'                    <div class="blog-thumb d-none">'+
'                      <img src="assets/images/blog-post-01.jpg" alt="">'+
'                    </div>'+
'                    <div class="down-content">'+
'                      <span>Lifestyle</span>'+
'                      <a href="pages/__url__"><h4>__title__</h4></a>'+
'                      <ul class="post-info">'+
'                        <li><a href="#">Admin</a></li>'+
'                        <li><a href="#">__date__</a></li>'+
'                      </ul>'+
'                      <p>__desc__</p>'+
'                      <div class="post-options">'+
'                        <div class="row">'+
'                          <div class="col-6">'+
'                            <ul class="post-tags">'+
'                              <li><i class="fa fa-tags"></i></li>'+
'                              <li><a href="#">Beauty</a>,</li>'+
'                              <li><a href="#">Nature</a></li>'+
'                            </ul>'+
'                          </div>'+
'                          <div class="col-6">'+
'                            <ul class="post-share">'+
'                              <li><i class="fa fa-share-alt"></i></li>'+
'                              <li><a href="#">Facebook</a>,</li>'+
'                              <li><a href="#"> Twitter</a></li>'+
'                            </ul>'+
'                          </div>'+
'                        </div>'+
'                      </div>'+
'                    </div>'+
'                  </div>'+
'                </div>';

var post_list_template = '<div class="col-lg-6 post-list-elem">'+
'                  <div class="blog-post">'+
'                    <div class="blog-thumb d-none">'+
'                      <img src="assets/images/blog-thumb-06.jpg" alt="">'+
'                    </div>'+
'                    <div class="down-content">'+
'                      <span>Lifestyle</span>'+
'                      <a href="pages/__url__"><h4>__title__</h4></a>'+
'                      <ul class="post-info">'+
'                        <li><a href="#">Admin</a></li>'+
'                        <li><a href="#">__date__</a></li>'+
'                      </ul>'+
'                      <p>__desc__</p>'+
'                      <div class="post-options">'+
'                        <div class="row">'+
'                          <div class="col-lg-12">'+
'                            <ul class="post-tags">'+
'                              <li><i class="fa fa-tags"></i></li>'+
'                              <li><a href="#">Best Templates</a>,</li>'+
'                              <li><a href="#">TemplateMo</a></li>'+
'                            </ul>'+
'                          </div>'+
'                        </div>'+
'                      </div>'+
'                    </div>'+
'                  </div>'+
'                </div>';

var load_data = function(limit, from) {

	$.ajax({
		url : "meta-config.json",
		success : function(result) {

			
			
			var pages = result.pages;
			console.log(result.pages);
			var count=0;
			var is_preview = true;
			if($('#post-list').length>0){
				limit=page_size;
				is_preview = false;
				$('#post-list .post-list-elem').remove();
			}
			var page_num=1;
			if(from == undefined || from==0){
				from = 0;
			}else{
				page_num=from;
				from=(from+page_size)-1;
			}
			
			for(var i=from;i<pages.length && count<limit;i++,count++){
				var page = pages[i];
				
				if(is_preview){
					var preview = preview_template.replace('__url__', page.url);
					preview = preview.replace('__desc__', page.desc);
					preview = preview.replace('__title__', page.title);
					preview = preview.replace('__date__', page.date);
					
					$(preview).insertBefore($('#view_all'));
				}
				else{
					var blog_list = post_list_template.replace('__url__', page.url);
					blog_list = blog_list.replace('__desc__', page.desc);
					blog_list = blog_list.replace('__title__', page.title);
					blog_list = blog_list.replace('__date__', page.date);
					
					$(blog_list).insertBefore($('#page-numbers-div'));
					
					//update pagination
					
				}
			}
			
			
			var total_pages = pages.length/page_size;
			$('.page-numbers').empty();
			var is_active_set = false;
			for(var i=0;i<total_pages;i++){
				if(from == 0 || i==page_num){
					if(!is_active_set){
						$('.page-numbers').append('<li class="active" data="'+(i)+'"><a href="#" onclick="select_page(event);">'+(i+1)+'</a></li>');
						is_active_set=true;
					}
					else{
						$('.page-numbers').append('<li data="'+(i)+'"><a href="#" onclick="select_page(event);">'+(i+1)+'</a></li>');
					}
				}
				else{
					$('.page-numbers').append('<li data="'+(i)+'"><a href="#" onclick="select_page(event);">'+(i+1)+'</a></li>');
				}
			}
		}
	});

}

var select_page = function(e){
	e.preventDefault();
	var page=$(e.target.parentElement).attr('data');
	load_data(page_size, Number(page))
}

window.onload = function() {
	$('.owl-banner.owl-carousel .item').remove();
	load_data(3);
};