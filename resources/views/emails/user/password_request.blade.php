@extends('layouts.email.master')

@section('content')
<table class="container center" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: center; width: 580px; margin: 0 auto;">
						<tr style="padding: 0; vertical-align: top; text-align: left;">
							<td style="text-align: left; word-break: break-word; -moz-hyphens: auto; hyphens: auto; line-height: 19px; padding: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Helvetica', 'Arial', sans-serif; font-weight: normal; margin: 0; font-size: 14px; border-collapse: collapse;">
								<table class="row callout" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; padding: 0px; width: 100%; position: relative; display: block;">
									<tr style="padding: 0; vertical-align: top; text-align: left;">
										<td class="wrapper last" style="vertical-align: top; text-align: left; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; font-family: 'Helvetica', 'Arial', sans-serif; word-break: break-word; font-size: 14px; color: #222222; line-height: 19px; font-weight: normal; position: relative; padding: 10px 20px 0px 0px; padding-bottom: 20px; padding-top: 20px; padding-right: 0px; margin: 0 auto; width: 92%; border-collapse: collapse;">
											<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: left; width: 92%; margin: 0 auto;">
												<tr style="padding: 0; vertical-align: top; text-align: left;">
													<td class="panel center" style="font-family: 'Helvetica', 'Arial', sans-serif; word-break: break-word; -moz-hyphens: auto; hyphens: auto; font-size: 14px; line-height: 19px; vertical-align: top; margin: 0; color: #222222; -webkit-hyphens: auto; font-weight: normal; border: 1px solid #d9d9d9; text-align: center; background: #FFFFFF; border-color: transparent; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); border-radius: 2px; padding: 20px 25px; border-collapse: collapse;">
														<h2 class="center" style="color: #212121; font-family: 'Roboto', Arial; font-weight: 400; padding: 0; margin: 0; line-height: 30px; word-break: normal; font-size: 26px; text-align: center;">Password Reset</h2>
														<hr style="color: #d9d9d9; height: 1px; border: none; margin: 15px 0; border-bottom: 1px solid #979797; box-shadow: none;">
														<p class="center" style="margin: 0; color: #212121; font-family: 'Roboto', Arial; font-weight: normal; padding: 0; line-height: 150%; font-size: 16px; margin-bottom: 10px; text-align: center;">Dear {{$user->name}},<br> in order to reset your password successfully please follow the link below!</p>
														<a href="{{$link}}" target="_blank" class="btn" style="font-family: 'Roboto', Arial; font-size: 16px; line-height: 150%; border-radius: 2px; text-transform: uppercase; background-color: #d0021b; text-decoration: none; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); padding: 12px 30px; display: inline-block; margin: 5px 0 10px; color: #FFFFFF;">Reset</a>
													</td>
													<td class="expander" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; margin: 0; vertical-align: top; text-align: left; -webkit-hyphens: auto; font-weight: normal; color: #222222; font-family: 'Helvetica', 'Arial', sans-serif; width: 0px; visibility: hidden; padding: 0; border-collapse: collapse;"></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
@endsection
