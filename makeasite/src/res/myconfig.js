
export const initConfig ={
	"website": "makeasiteTest",
	"editable": true,
	"appStyle":{
		mainWrapper: {
			width: "100%",
			height: "cover",
			textAlign: "center",
			overflow: "hidden",
			backgroundRepeat: "no-repeat"

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

			bgBlack: {
			  backgroundColor: 'x111111'
			},

			bgPrimary: {
			  backgroundColor: 'x333333'
			},


			textPrimary: {
			  color: 'x333333',
				fontSize: "1rem"
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

	"articles": [{
			"menutitle": "Home",
			"loginDisplay": false,
			"type": "otherh",
			"name": "header",
			"classList": "text-center",
			"copyright_year": "2020",
	    "backimg": "images/webpic_lrg/header-background.jpg",
			"style":{
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					width: "100%"

			},
      "items": [
        {
          "type": "html",
          "data": "<br/><br/><br/><br/><br/><br/><br/>"
        },
				{

          "type": "html",
          "id": "html1",
          "data": "<h3 style='color:#A8A8A8; fontFamily:serif; margin:  auto; width:70%;'>Greetings From</h3>"

        },
        {
            "type": "html",
            "id": "html1",
            "data": "<h1 style='color:#ffffff; fontFamily:opensans; fontSize:90px;'>John Doe</h1>"
        },
        {
            "type": "html",
            "id": "html1",
            "data": "<h3 style='color:#A8A8A8; fontFamily:serif; margin:0 auto; width:70%;'>Nashville based Software Engineer, Technical Consultant and FinTech specialist.</h3>"
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
          "data": "<br/><br/><br/><br/>"
        }
      ]

		},
		{
			"menutitle": "AboutOld",
			"loginDisplay": false,
			"type": "tested",
			"name": "test",
			"header": "AboutOld",
			"style": {
				margin: "30px"
			},
			"items": [{
					"type": "html",
					"id": "html1",
					"data": "<p>Hello World</p>"

				},
				{
					"type": "carddeck",
					"id": "cd1",
					"data": [{
							"name": "card1",
							"img": "images/webpic_sml/sample-image.jpg"
						},
						{
							"name": "card2",
							"body": {
								"text": "This is text about the image"
							}

						},
						{
							"name": "card3",
							"classlist": "text-center",
							"header": "Contact Details",
							"body": {
								"contact": "Contact"
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
			"menutitle": "Test2",
			"loginDisplay": false,
			"type": "tested",
			"name": "test2",
			"header": "Test2 this",
			"classList": "text-center",
			"backimg": "images/webpic_lrg/leavesofgrass_1920x1234.jpg",
			"style": {
				margin: "30px"
			},
			"items": [{
					"type": "button",
					"id": "button1",
					"data": "test button",
					"position": {
						"x": "10px",
						"y": "10px"
					},
					"style":{
					 "fontFamily": "Arial",
					 "fontSize": "18",
					 "color": "0x1111"
				  }

				},
				{
					"type": "button",
					"id": "button2",
					"data": "test button2",
					"position": {
						"x": "20px",
						"y": "10px"
					}

				},
				{
					"type": "text",
					"id": "text1",
					"data": "test it",
					"position": {
						"x": "10px",
						"y": "10px"
					},
					"style":{
						"activeFontFamily": "Arial",
						"fontSize": "18",
						"color": "0x1111"
					}
				},
				{
					"type": "image",
					"id": "name3",
					"data": "images/webpic_sml/sample-image.jpg"

				},
				{
					"type": "include",
					"id": "name1",
					"data": "contact"
				},
				{
					"type": "html",
					"id": "name2",
					"data": "<a className='github' href='https://github.com'><b>GitHub</b></a>"
				}
			]
		},

		{
			"menutitle": "About Me",
			"loginDisplay": false,
			"type": "other",
			"name": "about",
			"header": "About Me",
			"style": {
				margin: "30px"
			},
		"items": [{
					"type": "carddeck",
					"data": [{
							"name": "card1",
							"img": "images/webpic_sml/sample-image.jpg"
						},
						{
							"name": "card2",
							"body": {
								"text": "This is text about the image"
							}

						},
						{
							"name": "card3",
							"header": "Contact Details",
							"contact": "Contact"
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
			"menutitle": "Work",
			"loginDisplay": false,
			"type": "subcolumns",
			"name": "work",
			"header": "Work",
			"classList": "columns2",
			"style": {
				textAlign: "left"

			},
			"rows":[
				{"columns":[{"xs": 3,"field":0,"style":{textAlign: "left"}},{"xs": 0,"field":3,"style":{textAlign: "left"}}]},
				{"columns":[{"xs": 3,"field":1,"style":{textAlign: "left"}},{"xs": 0,"field":4,"style":{textAlign: "left"}}]},
				{"columns":[{"xs": 3,"field":2,"style":{textAlign: "left"}},{"xs": 0,"subfields":5,"style":{textAlign: "left"}}]}
			],
			"data": [

				{
					"fields": [
					"Temenos",
					"Technical Lead",
					"2017– Present ",
					"Design functional technology solutions, develop the structure for IT systems, implement architecture, and ensure the IT framework operates efficiently. Provide technical leadership to software development teams. Oversee AWS and Azure hosting such as coordinating and monitoring VPN connections. Identify and resolve network and application security issues.",
					"and ensure the IT framework operates efficiently. Provide technical leadership to software development teams. Oversee AWS and Azure hosting such as coordinating and monitoring VPN connections. Identify and resolve network and application security issues.",
				  ],
				  "subfields":
					[
						"Certified Kony Fabric/Visualizer Developer with expertise in JavaScript and Java supporting the Spring Framework.",
						"Enhance security and improve the user experience by leading Okta API Integration to support Identity Access Management for the enterprise mobile application.",
						"Execute full lifecycle software development for the enterprise retail banking mobile application including requirements gathering, system architecture, verification, and documentation.",
						"Led several API Integrations for Core and 3rd Party systems: Fiserv DNA, Symitar, VSoft and Alogent MRDC and image retrieval, Lanvera, LocatorSearch, WireXchange, MX, iPay, PSCU, Checkfree, Augeo and others."
					]
				},
				{
					"fields":[
					"Independent Contractor",
					"Software engineer",
					"2013–2017",
					"Designed, developed, tested, and supported custom software applications and their integrations in support of the strategic IT objectives for diverse clients. Partnered with key stakeholders to build scalable technology solutions that exceeded client expectations. Oversaw Identity Access Management (IAM) and AWS Administration.",
				  ],
					"subfields": [
						"Website development for Job Corps USA using Drupal and various coding languages: HTML, CSS, and PHP.",
						"Designed and developed several Android applications using Android Studio, Eclipse, and Unity.",
						"Created Full Stack Web Applications with Restful webservices using Laravel and WordPress.",
						"Increased efficiency within clients’ IT organization using SailPoint IIQ, Java EE, Tomcat, MySQL, Active Directory, and PowerShell."
					]
				},
				{
					"fields": ["Active Network, LLC",
					"Senior Software Engineer",
					"2008–2013",
					"Designed, developed, implemented, and supported applications, systems, and IT products based on company’s business objectives. Led a team of software developers to drive continuous improvement by implementing value-added development solutions.",
				  ],
					"subfields": [
						"Designed, developed, and managed lifecycle for Software Development Kit (SDK) supporting automated hunting and fishing licensing systems across the United States",
						"Led mobile application development to support and enhance hunting and fishing applications.",
						"Enhanced development and debugging processes for POS application software by designing a PC Emulator in Microsoft Visual Studio and C++."
					]
				},
				{
					"fields": ["Automated License Systems, Inc. ",
					"Senior Software Engineer",
					"2002–2008",
					"Proposed, designed, and developed a terminal application for the POS purchas",
				  ],
					"subfields": [
						"Expanded product adoption across the United States driving exponential revenue growth.",
						"Technical Architect and Team Lead delivering numerous projects on time and within budget."
					]
				}
			]
		},

		{
			"menutitle": "Video",
			"loginDisplay": true,
			"backimg": "",
			"type": "other",
			"name": "testvideo",
			"header": "Video",
			"classList": "video",
			"style": {
				margin: "30px"
			},
			"items": [{
				"type": "video",
				"id": "name2",
				"data": "https://www.youtube.com/watch?v=sjkrrmBnpGE&ab_channel=QuietQuest-StudyMusic"
			}]
		},
		{
			"menutitle": "Skills",
			"loginDisplay": false,
			"backimg": "images/webpic_lrg/leavesofgrass_1920x1234.jpg",
			"type": "circles",
			"name": "skills",
			"header": "Skills",
			"classList": "circles",
			"data": [{
					"label": "IDM, Okta",
					"value": 11
				},
				{
					"label": "Cloud: AWS,Azure",
					"value": 10
				},
				{
					"label": "Git,SVN",
					"value": 10
				},
				{
					"label": "Windows",
					"value": 5
				},
				{
					"label": "Linux",
					"value": 5
				},
				{
					"label": "Docker,VMs",
					"value": 6
				},
				{
					"label": "Apps, Mobile and Web",
					"value": 10
				},
				{
					"label": "RESTful,SOAP API",
					"value": 12
				},
				{
					"label": "Confluence",
					"value": 6
				},
				{
					"label": "Agile",
					"value": 9
				},
				{
					"label": "Jira",
					"value": 7
				},
				{
					"label": "MySQL,MongoDB",
					"value": 14
				},
				{
					"label": "Javascript",
					"value": 7
				},
				{
					"label": "C,C++",
					"value": 13
				},
				{
					"label": "Java",
					"value": 15
				}
			]
		},
		{
			"type": "subcolumns",
			"name": "education",
			"backimg": "images/webpic_lrg/leavesofgrass_1920x1234.jpg",
			"loginDisplay": false,
			"header": "Education",
			"style":{
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					width: "100%"

			},
			"data":[{
		        "fields": ["LeTourneau University", "Dallas, TX","1995" ,
		        "Business Managment Coursework", "","4.0 GPA"]
		      },
		      {
						"fields": ["Community College of the Air Force","Georgia","1989" ,
		        "Associate Applied Science","Information Systems","4.0 GPA"]
		      },
		      {
						"fields":["Dale Carnegie", "Round Rock, Texas","2020" ,
		        "Certification","Professional Communications and Human Relations",
"Human Relations and Crashing Through Awards"]
		      }
				],

			"rows":[
				{"columns":[{"xs": 6,"field":0},{"xs": 6,"field":3}]},
			  {"columns":[{"xs": 6,"field":1},{"xs": 6,"field":4}]},
			  {"columns":[{"xs": 6,"field":2},{"xs": 6,"field":5}]}
		  ]
		},
		{
			"type": "final-form",
			"name": "contactyou",
			"backimg": "images/webpic_lrg/leavesofgrass_1920x1234.jpg",
			"loginDisplay": false,
			"header": "Get In Touch.",
			"text": "Provide the following information so that I can get back to you.",
			"api": "api/contact/contact",
			"style": {
				margin: "30px"
			},
			"data": [{
					"label": [
						"First Name"
					],
					"Field": {
						"_name": "firstName",
						"_component": "input",
						"_type": "text",
						"_placeholder": "First Name"
					}
				},
				{
					"label": [
						"Last Name"
					],
					"Field": {
						"_name": "lastName",
						"_component": "input",
						"_type": "text",
						"_placeholder": "Last Name"
					}
				},
				{
					"label": [
						"Company Name"
					],
					"Field": {
						"_name": "companyName",
						"_component": "input",
						"_type": "text",
						"_placeholder": "Company Name"
					}
				},
				{
					"label": [
						"Street"
					],
					"Field": {
						"_name": "street",
						"_component": "input",
						"_type": "text",
						"_placeholder": "Street"
					}
				},
				{
					"label": [
						"City"
					],
					"Field": {
						"_name": "city",
						"_component": "input",
						"_type": "text",
						"_placeholder": "City"
					}
				},
				{
					"label": [
						"State"
					],
					"Field": {
						"option": [{
								"_value": "AL",
								"__text": "Alabama"
							},
							{
								"_value": "TN",
								"__text": "Tennessee"
							},
							{
								"_value": "TX",
								"__text": "Texas"
							}
						],
						"_name": "state",
						"_component": "select"
					}
				},
				{
					"label": [
						"Zip"
					],
					"Field": {
						"_name": "zip",
						"_component": "input",
						"_type": "text",
						"_placeholder": "zip"
					}
				},
				{
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
					"label": [
						"Phone"
					],
					"Field": {
						"_name": "phone",
						"_component": "input",
						"_type": "phone",
						"_placeholder": "phone"
					}
				},
				{
					"label": [
						"Message"
					],
					"Field": {
						"_name": "message",
						"_component": "input",
						"_type": "text",
						"_placeholder": "Message to Carol"
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
			"type": "dbdata",
			"name": "easyAdded",
			"loginDisplay": true,
			"header": "Easy Added",
			"classList": "columns2",
			"api": "/api/easy/easys"
		},
		{
			"type": "dbdata",
			"name": "contactsAdded",
			"loginDisplay": true,
			"header": "Contacts Added",
			"classList": "columns2",
			"api": "/api/contact/contacts"
		},
		{
			"type": "dbdata",
			"name": "signupsAdded",
			"loginDisplay": true,
			"header": "Signups Added",
			"classList": "columns2",
			"api": "/api/signup/signups"
		},
		{
			"type": "final-form",
			"name": "easyData",
			"loginDisplay": true,
			"header": "Easy Data",
			"text": "Text DB In",
			"_onSubmit": "{this.onSubmit}",
			"style": {
				margin: "30px"
			},
			"api": "/api/easy/easy",
			"data": [{
					"label": [
						"header"
					],
					"Field": {
						"_name": "header",
						"_component": "input",
						"_type": "text",
						"_placeholder": "Enter a header"
					}
				},
				{
					"label": [
						"field"
					],
					"Field": {
						"_name": "field1",
						"_component": "input",
						"_type": "text",
						"_placeholder": "enter a field"
					}
				},
				{
					"label": [
						"field2"
					],
					"Field": {
						"_name": "field2",
						"_component": "input",
						"_type": "text",
						"_placeholder": "enter a field"
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
		}
	],
	"include": {
		"contact": {

			"FirstName": "John",
			"LastName": "Doe",
			"email": "carolsusieo@gmail.com",
			"street": "609 S Lake Creek Drive",
			"city": "Austin",
			"state": "Texas",
			"zip": "78681",
			"phone": "(469) 920 9683"

		},
		"social": [{
				"type": "Skype",
				"value": "carolsuejackson/chat",
				"url": "skype:",
				"fa": "fa fa-skype fa-2x",
				"full": "skype:carolsusiejackson/chat"

			},
			{
				"type": "Linkedin",
				"value": "carolodiorne",
				"url": "www.linkedin.com/in/",
				"fa": "fa fa-linkedin fa-2x",
				"full": "https://www.linkedin.com/in/carolodiorne"
			},
			{
				"type": "Github",
				"value": "carolsusieo",
				"url": "www.github.com",
				"fa": "fa fa-github fa-2x",
				"full": "https://www.github.com/carolsusieo"
			},
			{
				"type": "Stack Overflow",
				"value": "1846633/carol-susie-odiorne",
				"url": "www.stack-overflow/users/",
				"fa": "fa fa-stack-overflow fa-2x",
				"full": "https://www.stackoverflow.com/users/1846633/carol-susie-odiorne"

			}
		]
	}
}
