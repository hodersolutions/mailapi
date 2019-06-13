# mailapi
Api service to send mails

POST to http://localhost:4444/api/v1 with body below

{
	"name": "Home",
	"email": "Your email address here",
	"message": "Trail"
}


To dockerize
docker build -t mailapi .
docker run -p 8081:8081 mailapi
