@extends('master')

@section('content')
	<div class="row">
		<div class="col-xs-12">
			<h1>Blog</h1>
		</div>
	</div>

	<div class="row user-profile">
		<div class="col-md-12">
			<div class="tab-content without-border">
				<div id="timeline" class="tab-pane active">
					<div class="row masonry">
						@foreach($blogs as $blog)
						<div class="col-md-4">
							<div class="card tile card-post">
								<div class="card-heading">
									{{$blog->title}}
								</div>
								<div class="card-body">
									{{$blog->content}}
									<ul class="post-action">
										<li><a href="#">Like</a></li>
										<li><a href="#">Comment</a></li>
										<li><a href="#">Share</a></li>
									</ul>
								</div>
								<div class="card-footer">

								</div>
							</div>
						</div>
						@endforeach
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection