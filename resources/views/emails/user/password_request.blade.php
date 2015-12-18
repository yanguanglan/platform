@extends('layouts.email.master')

@section('content')
<table class="container center" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: center; width: 580px; margin: 0 auto; margin-top: 30px;">
	<tr style="padding: 0; vertical-align: top; text-align: left;">
		<td style="text-align: left; word-break: break-word; -moz-hyphens: auto; hyphens: auto; line-height: 19px; padding: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; margin: 0; font-size: 14px; border-collapse: collapse;">
			<table class="row callout" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; padding: 0px; width: 100%; position: relative; display: block;">
				<tr style="padding: 0; vertical-align: top; text-align: left;">
					<td class="wrapper last" style="text-align: left; font-family: 'Roboto', sans-serif; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; font-size: 14px; word-break: break-word; vertical-align: top; line-height: 19px; color: #222222; font-weight: normal; position: relative; padding: 10px 20px 0px 0px; padding-bottom: 20px; padding-right: 0px; margin: 0 auto; width: 92%; border-collapse: collapse;">
						<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: left; width: 92%; margin: 0 auto;">
							<tr style="padding: 0; vertical-align: top; text-align: left;">
								<td class="panel center" style="font-family: 'Roboto', sans-serif; word-break: break-word; -moz-hyphens: auto; hyphens: auto; font-size: 14px; line-height: 19px; vertical-align: top; margin: 0; color: #222222; -webkit-hyphens: auto; font-weight: normal; border: 1px solid #d9d9d9; text-align: center; background: #FFFFFF; border-color: transparent; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); border-radius: 2px; padding: 20px 25px; border-collapse: collapse;">
									<h1 class="center" style="color: #1b1b1b; font-family: 'Roboto', sans-serif; font-weight: 400; padding: 0; margin: 0; line-height: 32px; word-break: normal; font-size: 24px; text-align: center;">Password Reset</h1>
									<hr style="color: #d9d9d9; height: 1px; border: none; margin: 15px 0; border-bottom: 1px solid #979797; box-shadow: none;">
									<p style="margin: 0; color: #222222; font-family: 'Roboto', sans-serif; font-weight: 300; padding: 0; text-align: center; line-height: 150%; font-size: 18px; margin-top: 0; margin-bottom: 5px;">Dear {{$user->name}}, follow the link below to reset your password!</p>
									<a href="{{$link}}" style="text-decoration: none; background-color: #d0021b; border-radius: 2px; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); padding: 12px 30px; display: inline-block; margin: 20px 0 10px; font-weight: 300; color: #FFFFFF;"
									target="_blank" class="btn">RESET</a>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
@endsection
