export const initConfig ={
	"website": "web4u4less",
	"description": "Web4u4less Business Information",
	"editable": true,

	"appStyle":{
		mainWrapper: {
			width: "100%",
			height: "contain",
			textAlign: "center",
			},

		articleContainer: {
		  width: "100%",
			height: "cover",
		  position: "relative",
		},
		anchor: {
				paddingTop: "40px",
				marginTop: "-40px"
		},
		btn: {
			  boxShadow: '0 .1875rem .1875rem 0 rgba(0,0,0,.1)',
			  padding: '1.25rem 2rem',
			  fontFamily: 'Varela Round',
			  fontSize: '80%',
			  textTransform: 'uppercase',
			  letterSpacing: '.15rem',
				size: 'lg',
			  border: 0
			},

			btnSml: {
					boxShadow: '0 .1875rem .1875rem 0 rgba(0,0,0,.1)',
					padding: '1.25rem 2rem',
					fontFamily: 'Varela Round',
					fontSize: '80%',
					textTransform: 'uppercase',
					letterSpacing: '.15rem',
					border: 0,
					size: 'sm'
			},

			btnPrimary: {
			  backgroundColor: 'x333333',
			}
	 },

	      "articles": [
				{
						"menutitle": "Home",
						"loginDisplay": false,
						"type": "other",
						"name": "header",
						"style":{
							  backgroundHold: "linear-gradient(to bottom, rgba(0,0,0,.2), rgba(0,0,0,.6), rgba(0,0,0,.8)), url(",
							  backgroundRepeat: "no-repeat",
							  backgroundSize: "cover",
								width: "100%",
								writable: true,
						},

						"backimg": "images/webpic_lrg/bg_web4u4less.jpg",
						"items": [
 		        {
			          "type": "text",
								"style": {
									fontFamily: 'Varela Round',
							    lineHeight: '12rem',
									color: 'transparent'
								},
			          "data": " .    "
			        },
							{

								"type": "text",
								"id": "html1",
								"style": {
									fontFamily: 'Varela Round',
							    fontSize: '6rem',
							    lineHeight: '6rem',
							    letterSpacing: '0.8rem',
							    background: "linear-gradient(to bottom, rgba(255,255,255,.8), rgba(255,255,255,.8))",
							    webkitTextFillColor: "transparent",
							    webkitBackgroundClip: "text",
									writable: true

								},

								"data": "WEB FOR YOU"
							},
							{
								"style": {
													fontFamily: 'Varela Round',
											    fontSize: '6rem',
											    lineHeight: '6rem',
											    letterSpacing: '0.8rem',
											    background: "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,.1))",
											    webkitTextFillColor: "transparent",
											    webkitBackgroundClip: "text"

												},

									"type": "text",
									"id": "html1",
									"data": "FOR LESS",
							},
							{
								"type": "text",
								"id": "html1",
								"style": {
													fontFamily: 'Varela Round',
													fontSize: '1.3rem',
													lineHeight: '1.3rem',
													background: "linear-gradient(to bottom, rgba(255,255,255,.7), rgba(255,255,255,.7))",
													webkitTextFillColor: "transparent",
													webkitBackgroundClip: "text"

												},
								"data": "Fabulous Websites at a fraction of the cost!"

							},
							{
								"type": "text",
								"id": "text1",
								"data": "fraction ",
								"style": {
									"color": "white",
									"fontSize": "25px",
									"fontFamily": "Arial"
								}
							},
							{
									"type": "button",
									"id": "button1",
									"data": "Get Started",
									"style": {
										"color": "blue",
									},
									"className": "btn btn-primary",
									"variant": "primary",
									"link": "https://react-bootstrap.github.io/components/buttons/"
							 },
	 							 {
	  			          "type": "html",
	  			          "data": "<br/>"
	  			        },
 							{
 								"type": "include",
 								"data": "social",
								"style": {
									"display": "inline",
									"paddingRight": "3em"
								}
						}
						]

				},
	      {
					 "menutitle": "About",
					 "loginDisplay": false,
					 "type": "other",
           "name": "about",
           "classList": "text-center",
					  "backimg": "images/webpic_lrg/circuit.jpg",
						"style":{
							  backgroundHold: "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,.7), rgba(0,0,0,.5)), url(",
							  backgroundRepeat: "no-repeat",
							  backgroundSize: "cover",
								width: "100%",
								writable: true,
						},

					 "items": [
						 {
						 		"type": "text",
						 		"style": {
						 			fontFamily: 'Varela Round',
						 			lineHeight: '12rem',
						 			color: 'transparent'
						 		},
						 		"data": " .    "
						 	},
						 {
							 "type": "text",
							 "id": "html1",
							 "data": "Built with Love (and Bootstrap if you want it)",
							 "style": {
								  color : "white",
									fontFamily :"Varela Round",
									lineHeight: '2rem',
									fontSize: '2rem'

								}
						 },
						 {
								 "type": "text",
								 "id": "html1",
								 "data": "We support our customers in creating, hosting, and advertsing their websites. Working out of Round Rock Texas, we collaborate with you to create and maintain a stunning interactive website that looks as good on your phone as it does on your laptop.",
								 "style": {
									  color : "white",
										fontFamily :"Varela Round",
										fontSize: '1rem'

									}
								},
						 {
							 "type": "text",
							 "style": {
								 fontFamily: 'Varela Round',
								 lineHeight: '12rem',
								 color: 'transparent'
							 },
							 "data": " .    "
						 }
					 ]
        },
        {
          "name": "projects",
					"menutitle": "Projects",
					"header": "Projects",
					 "loginDisplay": false,
					 "type": "other",
           "classList": "text-center",
					 "style": {
						 margin: "30px"
					 },
					"items": [{
						 "type": "carddeck",
						 "className": "bg-light",
						 "name":"card1",
						 "data": [{
								 "name": "pic1",
								 "img": "images/webpic_sml/web-1668927_1920.jpg"
							},
							 {
								 "name": "text1",
								 "body": {
									 "text": "Fill out a simple set of information and immediately see how it will display in a variety of formats."
								 }
							 }
						 ]
					 },
					 {
 						 "type": "carddeck",
						 "name": "card2",
 						 "className": "bg-light",
 						 "data": [{
 								 "name": "pic2",
								 "img": "images/webpic_sml/ipad.jpg",
 							 },
 							 {
 								 "name": "text2",
 								 "body": {
 									 "text": "We can match your website with an equally stunning self contained mobile app."
 								 }
 							 }
 						 ]
 					 },
					 {
							 "type": "carddeck",
						   "name": "card3",
							 "className": "bg-light",
							 "data": [{
									 "name": "pic3",
									 "img": "images/webpic_sml/digitization-5140055_1920.jpg"
								 },
								 {
									 "name": "text3",
									 "body": {
										 "text": "We Host you Web and provide email that match your website address."
									 }
								 }
							 ]
					 },
					 {
						 "type": "html",
						 "data": "<br/>"
					 }
				 ]
			  },
				{
					"type": "final-form",
					"name": "signup",
					"style": {
 					 margin: "30px",
				 },
					"backimg": "images/webpic_lrg/leavesofgrass_1920x1234.jpg",
					"loginDisplay": false,
					"text": "Subscribe to receive news, coupons and tech advice.",
					"api": "api/contact/contact",
					"data": [{
							"label": [
								"E-mail"
							],
							"Field": {
								"_name": "email",
								"_component": "input",
								"_type": "email",
								"_placeholder": "email"
							}
						},
						{
							"button": [{
									"_type": "submit",
									"__text": "Submit"
								},
								{
									"_type": "reset",
									"__text": "Reset"
								}
							]
						}
					]
				},
        {
					 "menutitle": "Contact",
					 "header": "Contact",
					 "loginDisplay": false,
					 "type": "other",
           "name" : "contact",
					 "style": {
						 background: "linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.8), rgba(0,0,0,1))",
	 					 },
					 "items": [
						 {
								 "type": "html",
								 "data": "<br/><br/>"
							 },
{
		 					"type": "carddeck",
		 					"className": "container",
		 					"data": [{
		 							"name": "address",
									"header": "Address",
								  "body": {
		 								"text": "609 S Lake Creek Drive, Round Rock, Texas 78681"
		 							}
		 						},
		 						{
									"name": "phone",
									"header": "Phone",
								  "body": {
		 								"text": "469 920 9683"
		 							}
		 						},
		 						{
		 							"name": "email",
		 							"header": "Email",
									"body": {
		 								"text": "info@web4u4less.com"
		 							}
		 						}
		 					]
		 				},
		 				{
		 					"type": "html",
		 					"data": "<br/>"
		 				}
		 			]
				}
			],

		"include": {
			"contact": {

				"FirstName": "Carol",
				"LastName": "Odiorne",
				"email": "carol.web4u4less@gmail.com",
				"street": "609 S Lake Creek Drive",
				"city": "Round Rock",
				"state": "Texas",
				"zip": "78681",
				"phone": "(469) 920 9683"

			},
			"social": [{
				"type": "skype",
				"value": "carolsuejackson/chat",
				"url": "skype:",
				"fa": "fa fa-skype fa-2x",
				"full": "skype:carolsusiejackson/chat"

			},
				{
					"type": "linkedin",
					"value": "carolodiorne",
					"url": "www.linkedin.com/in/",
					"fa": "fa fa-linkedin fa-2x",
					"full": "https://www.linkedin.com/in/carolodiorne"
				},
				{
					"type": "github",
					"value": "carolsusieo",
					"url": "www.github.com",
					"fa": "fa fa-github fa-2x",
					"full": "https://www.github.com/carolsusieo"
				},
				{
					"type": "stackoverflow",
					"value": "1846633/carol-susie-odiorne",
					"url": "www.stack-overflow/users/",
					"fa": "fa fa-stack-overflow fa-2x",
					"full": "https://www.stackoverflow.com/users/1846633/carol-susie-odiorne"

				}
			]
		}

}
/*
overflow: "hidden"
*/
