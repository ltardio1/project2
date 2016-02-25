

								==========
								  MODELS
								==========
		==========						
		  users:
		==========


	var userSchema = new mongoose.Schema({

		  username: { type: String, required: true },

		  (for passport)
		  email: String,
		  password: String,

		  items: [itemSchema]

		})



   ==================
	images or items:
   ==================


	var itemSchema = new mongoose.Schema({

		  caption: String,	

		  img: String

		  

		});





### Send the following via email or slack to your appointed instructor

- What is your project proposal? 

	my idea, at the moment, is to create an app where users can do something along the lines of post memes to their respective show pages.  I am not sure if there will be a feature that allows users to interact with eachother's pages but I would like to implement that feature if I have enough time.  If this is possible, I am thinking of adding a component that allows users to either rate each post or the ability for the users to post memes on other users' show pages.  I did not extrapolate any parallels this might have to other apps until after I conjured this idea but I guess this is essentially the blueprint for social media apps like facebook.  

	However, I am not quite sure if the feature for the second option is more complex than I think.  I would rather meet the MVP before I do anything like that.  So I suppose I would first begin to focus on the basics and add these secondary features if I have enough time.

- List your MVP criteria?




1. Have 2 models

	a. Representing users

	b. Representing the memes / content that the users will share / post




2. Include SIGN UP / LOG IN functionality

	a. with encrypted passwords

	b. an authorization flow




3. Have complete RESTful routes for at least one of your resources   		
	
	a. GET, POST, PUT, and DELETE




3. Utilize an ORM (Mongoose) to:

	a. create a database table structure ---

	b. interact with your relationally-stored data




4. Include wireframes for planning app structure




5. Have semantically clean HTML and CSS




6. Deploy online and accessible to the public




- Any plan for your models / data relationships?


    - Can all users see the index for all of your resource or only access their resource?
   
    - Is your resource mutually exclusive to a user?

        - ex: If you had users and books, can multiple owners have the same book? Can all 

        owners see all books or just their book? Etc.

        	==============================================================================
         1. users can contain the same data.  I don't think anything will have to be unique
        	==============================================================================



- What aspects of your approach/attitude can you enhance having experienced and learned from project 1?

		1. It's hard for me to gauge how much more flexibility there is, compared to the 

		last project, in terms of how many approaches there might be for coding.

		At least through the eyes of a noob like me, this project seems like it makes more sense for the approaches to be more or less the same from what I have experienced so far in this unit.  However, if there is flexibility that I am not yet seeing, I hope that I can restructure my approach in times of frustration in order to address and refocus on the main priority of getting my app to work first.  During the first project, I would find myself getting tunnel vision when it cam to the beginning stages of creating the layout.  I kept getting frustrated and unable to complete this task because I was so hung up on one strict method of doing this so I forgot about the other possibilities I could turn to (ie: hardcoding v.s. using jquery to loop / append elements).  Once again, I am unsure if there will be a similar issue in the current project in terms of drastic shifts in my approach in order to solve issues but we will see.

		2.  I guess another thing I learned is that time management is devastatingly real and even though we have a little longer for the 2nd project, I am not taking it for granted so I think this is why I am intially going to hold off on building the secondary features until the end to increase my chances of meating the MVP criteria before I take on any additional tasks.




- What are your next steps for today (End of Day Objectives) as well the weekend in order to accomplish your MVP?

	1.  I suppose I will get the wire frame out of the way since it is considered a part 

	of the planning process.  




==================================================================
				
					DESCRIPTION OF WIREFRAME

==================================================================


LANDING PAGE: USERS/INDEX.EJS

	1. IF NEW, THEN SIGN UP:

		-- SIGN UP FORM REDIRECTS / TAKES USER TO THEIR NEW SHOW /PERSONAL PAGE 

				- sign-up form commmunicates with sign-up route in user controller

	
	2. IF MEMBER, THEN LOGIN:	

		-- LOGIN FORM ALSO REDIRECTS / TAKES USER TO THEIR EXISTING SHOW / PERSONAL PAGE

				- login form commmunicates with login route in user controller






==================================================================
				
						MONDAY MORNING

==================================================================


I got login / sign up to work.  both functions redirect to the respective user's show page.

MVP is almost met.  I just need to add edit functionality / PUT route for updating user data / posts.


I really want to begin styling today / use jquery in my app

I also am thinking that I might want the login / sign up features on a different page or maybe have the login / sign up links on the home page but when clicked on, triggers a jquery click event which renders a div on the same page that provides the forms for login / sign up




==================================================================
				
						MONDAY EVENING

==================================================================


Working on styling the pages.  

	- all html selectors are layed out on css



FOR THIS PART IN:  entries / index.ejs:

==================================================================
	<% for (var i=0; i < entries.length; i++) { %>

		<div class="entry">

			<p><%= entries[i].body %></p>

		</div>

	<% } %>
==================================================================



Do I need to write in something like:

	<p><%= users[i].username %></p> ?


	or make a loop for that in order to display all the users and their posted content?







==================================================================
				
						TUESDAY MORNING

==================================================================



When on th user's show page, I am getting an error when I click on the 'Edit' link which should go to 'edit.ejs'.


The error is pointing to the first line of code I have in my 
show.ejs file:

   ===========================================================
		-- <p id="user_id" style="display: none"><%= user.id %></p>

		"user is not defined"
   ===========================================================

   - BUT this code enables me to reference the user's username so I can display the name of whoever the show page belongs to, in the header:

   		 <%= user.username %>'s entries


    - AND so if I remove the initial code from my file, I then get an error stating that "username", in the second piece of code, is underfined.


    -NOW I am trying to see if I need to fix something regarding the response in the EDIT route.  


            ====================================
             res.render('users/edit.ejs', user);
            ====================================

            I am focusing my attention to this line.  


            	-BUT adding 'user' as a parameter will not work,

            	nor will it work when I do -- { user: user}






==================================================================
				
						TUESDAY EVENING

==================================================================



- I am faced a similar issue.


- edit.ejs is still not rendering 




 I am getting an error that says:

			
			' user is not defined 



this error means that whichever edit button I click on is not actually receiving the data (text) from the particular entry that it should be linked to. 

	-and 'user' should be somewhere inside the - edit form value - that is on the edit.ejs file.  
			



	LIKE:   -  value="<%=user.entries[i].body%>  


		 INSIDE: - <textarea name="body" rows="8" cols="40" value="<%=user.entries[i].

				body%>"></






 				this value should theoreticallay match what is in LINE 3 in my loop directly below

 					- because the form value in my code above, is supposed to represent the content / entry text that will get rendered on edit.ejs

 					-which is exactly what line 3 is representing below



	LINE 1 ---->		<% for (var i=0; i < user.entries.length; i++) { %>

	LINE 2 ---->			<div class="entry">

	LINE 3 ---->				<p><%= user.entries[i].body %></p>
								
	LINE 4 ---->				<a href="/users/<%= user.id %>/edit">
									<h3>Edit<h3>
	LINE 5 ---->				</a>

	LINE 6 ---->						</div>
							

		



Now I am not sure the ejs files are the issue.  

I think I was right and it has to do with the route in the controller 


      
             // ==========
                // EDIT
             // ==========


router.get('/:id/edit', function(req, res){

	// req.params.id == req.user.id ? res.locals.usertrue = true : res.locals.usertrue = false;

    User.findById(req.params.id, req.body, function(err, user, entries){

    	// entry.findById(req.body, function(err, entry){

    		res.render('users/edit.ejs', {user: user.entries[i].body});

    		});
    });

// });



   


==================================================================
				
						WEDNESDAY MORNING

==================================================================


IN ORDER FOR EDIT TO WORK:   In edit.ejs,
  		


  I need the URI in the form action :


			----------------------------------------------------------------
			<form action="/users/<%= user.id%>/<%=entries.entryid%>" method="POST">
			----------------------------------------------------------------



to match the URI in the PUT route :


		---------------------------------------------------
				router.put('/:id/entries/:entryid'
		---------------------------------------------------


			still having issues getting this to work.

			I think the issue lies in:

			 	-----the code that is within the PUT route-----

				-----AND /OR the syntax within the for action----- 


					------------------------
					CITY OF UNDEFINED ERRORS
					------------------------
Right now I am getting an - ERROR - pointing to the form action saying:

			- 'entryid' is undefined

			-  this error is preventing the edit.ejs file to load

					after I click on 'edit' while on show.ejs



			---------------------------------------------
				POSSIBLE CAUSES OF 'UNDEFINED' ERRORS
			---------------------------------------------


---->				1. GET route

							- parameters in response (last line)

							
----> 				2. PUT route:

							-  loop structure

							-  if statement

							-  using req.params.id  vs  req.params.entryid


----> 				3. BOTH routes:

							- using req.params.id  vs  req.params.entryid

							- entry.find  vs  User.find ????



							---------------
							 - GET ROUTE -
							---------------	


router.get('/:id/edit', function(req, res){

    User.findById(req.params.id, function(err, entry){

    		res.render('users/edit.ejs', {_id: entry.id});

    		});
    });


    		
    		I changed the parameters in this route from :
			 
					- res.render('users/edit.ejs', {user: user}); 

										TO

					- res.render('users/edit.ejs', {_id: entry.id}); 



						  ------------------
							- PUT ROUTE -
						  ------------------

router.put('/:id/entries/:entryid', function(req, res){
	
    Entry.findByIdAndUpdate(req.params.entryid, req.body, function(err, user){ 	
    	
    	
-- >   	for(var i=0; i< entries.entryid.length; i++){    < --

-- >   		if (entries.entryid[i] == req.params.entryid){   < --
    			
-- > ???          User.findById(req.p)   ---- figuring out what to write here -----

    		}
		}

     res.redirect('/users/' + user.id);

    });
});




		3.  I am also wondering if there needs to be some consistency between the 2 routes in terms of how I reference:


			-   (in GET route)

						AND

			-    (in PUT route)


			




		5.   Also, in the mongoosejs documentation, it says:

------------------------------------------------------------------

Each document has an _id. DocumentArrays have a special id method for looking up a document by its _id.


		--->   var doc = parent.children.id(id);   <---

					
			 Do I need to write something like this:

					- for my GETroute ???

						- Because in theory I am requesting that subdocument when I render edit.ejs

------------------------------------------------------------------

			








