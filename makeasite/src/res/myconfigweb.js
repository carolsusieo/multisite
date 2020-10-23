export const initConfig ={
	"website": "web4u4less",
	"editable": true,
	"appStyle":{
		mainWrapper: {
			width: "100%",
			height: "cover",
			textAlign: "center",
			overflow: "hidden"
		},
		articleContainer: {
		  width: "100%",
			height: "cover",
		  position: "relative",
		  margin: "-75px",
		},
		jump:{
			margin:"+75px 0 0",
			display:"block",
			position: "relative",
   		height:"0px",
		},

			bgBlack: {
			  backgroundColor: 'x111111'
			},

			bgPrimary: {
			  backgroundColor: 'x333333'
			},

			textPrimary: {
			  color: 'x333333'
			},
			footer: {
			  padding: '5rem 0'
			},

			colorPickerPalette: {
			  position: 'absolute',
			  zIndex: 100
			},
			colorPickerCover: {
			  position: 'fixed',
			  top: '0px',
			  left: '0px',
			  bottom: '0px',
			  right: '0px'
			},

			popup: {
			  width: '65%',
			  height: '25%',
			  top: '15%',
			  left: 0,
			  right: 0,
			  bottom: 0,
			  margin: 'auto',
			  backgroundColor: 'white',
				position:"relative",
 				zIndex:'3000',
			},
			popupInner: {
			  left: '25%',
			  right: '25%',
			  top: '5%',
			  bottom: '5%',
			  margin: 'auto',
			  borderRadius: '20px',
			  backgroundColor: 'white',
			 position:"relative",
			 zIndex:'4000',
		 },
		 popupTitle:{
			 fontSize:"14px",
			 color:"black"
		 },

     popupText:{
			 fontSize:"12px",
			 color:"black"
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
						"type": "headero",
						"name": "header",
/*
						"classList": "Header",

						"style": null,
						*/


						"backimg": "images/webpic_lrg/BluePolygons_1920x1234.png",
						"items": [
 		        {
			          "type": "html",
			          "data": "<br/><br/><br/><br/>"
			        },
							{

								"type": "html",
								"id": "html1",

								"data": "<h1 style='letterSpacing:0.8rem; color:white; fontSize:70px; fontFamily:Varela Round; fontWeight:bold;'>Web For You</p>",
								"datahld": "<h1>Web For You</h1>",
							},
							{
									"type": "html",
									"id": "html1",
									"data": "<p style='color:white; fontSize:70px; fontWeight:bold;fontFamily:Varela Round;'>For Less</p>",
									"datahld": "<h2>For Less</h2>"
							},
							{
								"type": "html",
								"id": "html1",
								"data": "<p style='fontSize:15px; color:white; align:center fontFamily:Varela Round;'>Fabulous Websites at a fraction of the cost!</p>"

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
						},
							 {
 			          "type": "html",
 			          "data": "<br/><br/><br/><br/><br/><br/><br/>"
 			        }
						]

				},
	      {
					 "menutitle": "About",
					 "header": "About",
					 "loginDisplay": false,
					 "type": "other",
           "name": "about",
           "classList": "text-center",

					  "backimg": "images/webpic_lrg/circuit.jpg",
					 "items": [{
							 "type": "html",
							 "data": "<br/><br/><br/><br/>"
						 },{
							 "type": "text",
							 "id": "html1",
							 "data": "Built with Love (and Bootstrap if you want it)",
							 "style": {
								  "color" : "white",
									"fontFamily" :"Varela Round"
								}

						 },
						 {
								 "type": "html",
								 "id": "html1",
								 "data": "<p style='fontSize:15px; color:white; align=center fontFamily:Varela Round;'>We support our customers in creating, hosting, and advertsing their websites. Working out of Round Rock Texas, we collaborate with you to create and maintain a stunning interactive website that looks as good on your phone as it does on your laptop.</p>"

							},
						 {
							 "type": "html",
							 "data": "<br/>"
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
					 "classList": "bg-black",
					 "items": [{
		 					"type": "carddeck",
		 					"className": "bg-light",
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
