# one-time-message
After cloning the repo.

## Set up Mongo
Create `.env` file in the `backend` directory

```bash
touch backend/.env
``` 
With the following contents:
```
# ./backend/.env
PORT=4000
MONG_URI=<insert Mongo Atlas connection string>
```

## Docker
Make sure Docker is running.

To build:
```bash
docker-compose build
```
Create and start container

## Using the site
1) When Docker has compiled successfully, go to 
[http://localhost:3000/](http://localhost:3000/)
2) Type a message into the input box (Where it says `Enter your message here...`)
3) Hit the `Generate Link` button.
4) Copy or select the link that's generated to view your message.
5) After the message has been viewed once, it will disappear.

## Testing with Jest
Go to the `backend` directory, then run the tests.
```bash
cd backend
npm run test
```