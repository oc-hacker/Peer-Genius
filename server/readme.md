# Peer Genius Server

## API calls

All API calls pass through the `/api` route.



<details>
<summary><code>/api</code></summary>

Global checks:
	<br/>
	<code>401 (UNAUTHORIZED)</code>: The user's JSON Web Token is invalid. All routes except <code>createAccount</code>, <code>login</code>, and <code>checkEmail</code> utilize this check. If the JWT being invalid causes this response, a response body of
	<pre>{
	"reason": "Invalid session"
}</pre>
	will be sent to help identify the reason.
	<br/><br/>
	<code>403 (FORBIDDEN)</code>: The request is attempting to make a forbidden edit. This is mainly in place to safeguard against malicious requests.
	
<br/><br/>
Routes:
	
<li><details>
	<summary><code>/createAccount</code></summary>
	Creates an account according to information given.
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 			email: string,
			password: string,
			firstName: string,
			lastName: string,
			birthday: {
				year: number,
				month: number,
				day: number
			}
 		}
 	}
 	</pre>
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: Account creation successful. An accompanying store of data is sent to help initialize the store.
	<br/>
	<code>409 (CONFLICT)</code>: Email is already associated with an account. Account creation failed.
</details></li>

<li><details>
	<summary><code>/login</code></summary>
	Attempts to log in the user using email and password provided.
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 			email: string,
 			password: string
 		}
 	}
 	</pre>
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: Login successful. An accompanying store of data is sent to help initialize the store.
	<br/>
	<code>400 (BAD REQUEST)</code>: Email not found in database.
	<br/>
	<code>401 (UNAUTHORIZED)</code>: Wrong password.
</details></li>

<li><details>
	<summary><code>/checkEmail</code></summary>
	Checks if an email is in use.
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 			email: string
 		}
 	}
 	</pre>
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: the <code>taken</code> field in response will indicate whether the email has been taken.
	Response body format:
	<pre>
	{
		taken: boolean
	}
	</pre>
</details></li>

<li><details>
	<summary><code>/</code></summary>
	
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 		}
 	}
 	</pre>
	
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: 
</details></li>

<li><details>
	<summary><code>/</code></summary>
	
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 		}
 	}
 	</pre>
	
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: 
</details></li>

<li><details>
	<summary><code>/</code></summary>
	
	<br/>
	Request:
 	<pre>
 	{
 		body: {
 		}
 	}
 	</pre>
	
	Response:
	<br/>
	Status:
	<br/>
	<code>200 (OK)</code>: 
</details></li>

</ul>
</details>