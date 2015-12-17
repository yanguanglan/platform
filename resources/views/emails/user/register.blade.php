<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width">
	<meta name="format-detection" content="date=no">
	<title>angularjs-recipes.com :: we make learning fun again! :</title>
	<style media="screen">
		@media only screen and (max-width: 600px) {
			table[class=body] center {
				min-width: 0 !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .container {
				width: 95% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .row {
				width: 100% !important;
				display: block !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .wrapper {
				display: block !important;
				padding-right: 0 !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns,
			table[class=body] .column {
				table-layout: fixed !important;
				float: none !important;
				width: 100% !important;
				padding-right: 0px !important;
				padding-left: 0px !important;
				display: block !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .wrapper.first .columns,
			table[class=body] .wrapper.first .column {
				display: table !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] table.columns td,
			table[class=body] table.column td {
				width: 100% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.one,
			table[class=body] .column td.one {
				width: 8.333333% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.two,
			table[class=body] .column td.two {
				width: 16.666666% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.three,
			table[class=body] .column td.three {
				width: 25% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.four,
			table[class=body] .column td.four {
				width: 33.333333% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.five,
			table[class=body] .column td.five {
				width: 41.666666% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.six,
			table[class=body] .column td.six {
				width: 50% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.seven,
			table[class=body] .column td.seven {
				width: 58.333333% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.eight,
			table[class=body] .column td.eight {
				width: 66.666666% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.nine,
			table[class=body] .column td.nine {
				width: 75% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.ten,
			table[class=body] .column td.ten {
				width: 83.333333% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.eleven,
			table[class=body] .column td.eleven {
				width: 91.666666% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .columns td.twelve,
			table[class=body] .column td.twelve {
				width: 100% !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] td.offset-by-one,
			table[class=body] td.offset-by-two,
			table[class=body] td.offset-by-three,
			table[class=body] td.offset-by-four,
			table[class=body] td.offset-by-five,
			table[class=body] td.offset-by-six,
			table[class=body] td.offset-by-seven,
			table[class=body] td.offset-by-eight,
			table[class=body] td.offset-by-nine,
			table[class=body] td.offset-by-ten,
			table[class=body] td.offset-by-eleven {
				padding-left: 0 !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] table.columns td.expander {
				width: 1px !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .right-text-pad,
			table[class=body] .text-pad-right {
				padding-left: 10px !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .left-text-pad,
			table[class=body] .text-pad-left {
				padding-right: 10px !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .hide-for-small,
			table[class=body] .show-for-desktop {
				display: none !important;
			}
		}

		@media only screen and (max-width: 600px) {
			table[class=body] .show-for-small,
			table[class=body] .hide-for-desktop {
				display: inherit !important;
			}
		}
	</style>
	<style media="screen">
		@media only screen and (max-width: 450px) {
			.header .columns .last {
				vertical-align: top !important;
			}
		}
	</style>
	<style type="text/css"></style>
</head>

<body style="color: #222222; font-size: 14px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; min-width: 100%; font-family: 'Roboto', sans-serif; font-weight: normal; text-align: left; line-height: 1.6em; width: 100%;">

	<table class="body" style="border-spacing: 0; vertical-align: top; border-collapse: collapse; font-size: 14px; text-align: left; height: 100%; padding: 0; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; margin: 0; line-height: 19px; width: 100%;">
		<tr style="padding: 0; vertical-align: top; text-align: left;">
			<td class="center" align="center" valign="top" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; padding: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; margin: 0; text-align: center; border-collapse: collapse;">
				<center style="width: 100%; min-width: 580px;">
					<table class="row header" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; background: #FFFFFF; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); padding: 0px; width: 100%; position: relative;">
						<tr style="padding: 0; vertical-align: top; text-align: left;">
							<td class="center" align="center" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; padding: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; margin: 0; text-align: center; border-collapse: collapse;">
								<center class="black-bg" style="width: 100%; min-width: 580px; background-color: black;">
									<table class="container" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: inherit; width: 580px; margin: 0 auto;">
										<tr style="padding: 0; vertical-align: top; text-align: left;">
											<td class="wrapper last" style="vertical-align: top; font-size: 14px; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; line-height: 19px; font-weight: normal; font-family: 'Roboto', sans-serif; text-align: left; color: #222222; position: relative; padding: 10px 20px 0px 0px; padding-right: 0px; margin: 0 auto; width: 92%; border-collapse: collapse;">
												<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: left; width: 92%; margin: 0 auto;">
													<tr style="padding: 0; vertical-align: top; text-align: left;">
														<td class="center" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; margin: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; text-align: center; padding: 0px 0px 10px; border-collapse: collapse;">
															<a href="http://angularjs-recipes.com/" target="_blank" style="line-height: 150%; padding-top: o; font-size: 23px; text-decoration: none; color: white;" class="a-logo">
																<img src="https://gallery.mailchimp.com/977072de3b242ab732e920547/images/4da8e73c-55cf-4442-ad46-15516f9cdf22.png" class="logo" width="168" height="75" alt="mist.io logo" style="outline: none; text-decora§on: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; clear: both; display: inline-block; border: none; height: 40px; vertical-align: middle;"> Angular
																<span class="text-red" style="color: #d0021b;">JS</span>Recipes</a>
															<p class="beta" style="text-align: center; margin: 0; font-family: 'Roboto', sans-serif; font-weight: 300; padding: 0; margin-bottom: 10px; line-height: 150%; font-size: 12px; color: white; display: inline-block; vertical-align: top;">beta</p>
														</td>
														<td class="expander" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; margin: 0; vertical-align: top; text-align: left; -webkit-hyphens: auto; font-weight: normal; color: #222222; font-family: 'Roboto', sans-serif; width: 0px; visibility: hidden; padding: 0; border-collapse: collapse;"></td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</center>
							</td>
						</tr>
					</table>

					<table class="container center" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: center; width: 580px; margin: 0 auto; margin-top: 30px;">
						<tr style="padding: 0; vertical-align: top; text-align: left;">
							<td style="text-align: left; word-break: break-word; -moz-hyphens: auto; hyphens: auto; line-height: 19px; padding: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; margin: 0; font-size: 14px; border-collapse: collapse;">
								<table class="row callout" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: left; padding: 0px; width: 100%; position: relative; display: block;">
									<tr style="padding: 0; vertical-align: top; text-align: left;">
										<td class="wrapper last" style="text-align: left; font-family: 'Roboto', sans-serif; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; font-size: 14px; word-break: break-word; vertical-align: top; line-height: 19px; color: #222222; font-weight: normal; position: relative; padding: 10px 20px 0px 0px; padding-bottom: 20px; padding-right: 0px; margin: 0 auto; width: 92%; border-collapse: collapse;">
											<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: left; width: 92%; margin: 0 auto;">
												<tr style="padding: 0; vertical-align: top; text-align: left;">
													<td class="panel center" style="font-family: 'Roboto', sans-serif; word-break: break-word; -moz-hyphens: auto; hyphens: auto; font-size: 14px; line-height: 19px; vertical-align: top; margin: 0; color: #222222; -webkit-hyphens: auto; font-weight: normal; border: 1px solid #d9d9d9; text-align: center; background: #FFFFFF; border-color: transparent; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); border-radius: 2px; padding: 20px 25px; border-collapse: collapse;">
														<h1 class="center" style="color: #1b1b1b; font-family: 'Roboto', sans-serif; font-weight: 400; padding: 0; margin: 0; line-height: 32px; word-break: normal; font-size: 24px; text-align: center;">Welcome to AngularJS Recipes</h1>
														<hr style="color: #d9d9d9; height: 1px; border: none; margin: 15px 0; border-bottom: 1px solid #979797; box-shadow: none;">
														<p style="margin: 0; color: #222222; font-family: 'Roboto', sans-serif; font-weight: 300; padding: 0; text-align: center; line-height: 150%; font-size: 18px; margin-top: 0; margin-bottom: 5px;">Dear {{$user->name}}, welcome to AngularJS Recipes! Our main goal is to make learning fun again!</p>
														<a href="http://angularjs-recipes.com/" style="text-decoration: none; background-color: #d0021b; border-radius: 2px; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); padding: 12px 30px; display: inline-block; margin: 20px 0 10px; font-weight: 300; color: #FFFFFF;"
														target="_blank" class="btn">START LEARNING</a>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>


					<table class="row footer" style="border-spacing: 0; border-collapse: collapse; vertical-align: top; text-align: center; padding: 0px; width: 100%; position: relative; margin-top: 30px;">
						<tr style="padding: 0; vertical-align: top; text-align: left;">
							<td class="wrapper last" style="vertical-align: top; font-size: 14px; word-break: break-word; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; line-height: 19px; font-weight: normal; font-family: 'Roboto', sans-serif; text-align: left; color: #222222; position: relative; padding: 10px 20px 0px 0px; padding-right: 0px; margin: 0 auto; width: 92%; border-collapse: collapse;">
								<table class="twelve columns" style="border-spacing: 0; border-collapse: collapse; padding: 0; vertical-align: top; text-align: left; width: 92%; margin: 0 auto;">
									<tr style="padding: 0; vertical-align: top; text-align: left;">
										<td class="center" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; margin: 0; vertical-align: top; -webkit-hyphens: auto; color: #222222; font-family: 'Roboto', sans-serif; font-weight: normal; text-align: center; padding: 0px 0px 10px; border-collapse: collapse;">
											<center style="width: 100%; min-width: 580px;">
												<p class="social center" style="margin: 0; color: #222222; font-family: 'Roboto', sans-serif; font-weight: 300; padding: 0; line-height: 150%; margin-bottom: 20px; text-align: center; font-size: 12px;">
													<a href="https://twitter.com/angular_recipes" target="_blank" style="color: #2ba6cb; text-decoration: none; font-size: 12px; text-align: center;">
														<img alt="twitter angularjs-recipes.com" src="https://gallery.mailchimp.com/977072de3b242ab732e920547/images/a7e04861-e5c7-48d4-9f0a-157c398a69db.png" style="outline: none; text-decora§on: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; clear: both; border: none; display: inline-block; height: 25px; float: none;">
													</a>
													<a href="https://github.com/angularjs-recipes" target="_blank" style="color: #2ba6cb; text-decoration: none; font-size: 12px; text-align: center; padding-left: 20px;">
														<img alt="github angularjs-recipes.com" src="https://gallery.mailchimp.com/977072de3b242ab732e920547/images/961fb172-4550-4f94-871a-38a629d1f8ec.png" style="outline: none; text-decora§on: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; clear: both; border: none; display: inline-block; height: 25px; float: none;">
													</a>
													<a href="http://codepen.io/angularjs-recipes" target="_blank" style="color: #2ba6cb; text-decoration: none; font-size: 12px; text-align: center; padding-left: 20px;">
														<img alt="codepen angularjs-recipes.com" src="https://gallery.mailchimp.com/977072de3b242ab732e920547/images/f49c1af9-0b75-403c-90ec-7e10b069b80a.png" style="outline: none; text-decora§on: none; -ms-interpolation-mode: bicubic; width: auto; max-width: 100%; clear: both; border: none; display: inline-block; height: 25px; float: none;">
													</a>
												</p>

												<p class="center" style="margin: 0; color: #222222; font-family: 'Roboto', sans-serif; font-weight: 300; padding: 0; line-height: 150%; margin-bottom: 10px; text-align: center; font-size: 12px; padding-top: 10px;">All rights reserved, angularjs-recipes.com &copy; 2015</p>
											</center>
										</td>
										<td class="expander" style="word-break: break-word; font-size: 14px; -moz-hyphens: auto; hyphens: auto; line-height: 19px; margin: 0; vertical-align: top; text-align: left; -webkit-hyphens: auto; font-weight: normal; color: #222222; font-family: 'Roboto', sans-serif; width: 0px; visibility: hidden; padding: 0; border-collapse: collapse;"></td>
									</tr>
								</table>
							</td>
						</tr>
					</table>

					<!-- container end below -->
				</center>
			</td>
		</tr>
	</table>
</body>
</html>
