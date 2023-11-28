# Libraray Mgmt
This project is about managing the library including list burrowing books. This is the api server of [Frontend Repo](https://github.com/GauravShreenet/Library-client)

You can visit [Here]()

## How to use
1. Clone the project by running `git clone https://github.com/GauravShreenet/Library-api` in your terminal
2. Run `cd api` to go inside the project foldere or the project in your fab code editor
3. Install dependencies `npm i` from the terminal with in the root directory of the project
4. Rename `.env.sample` to `.env` and pass the value accordingly
5. Run the project `npm run dev` for the dev environment and `npm start` is the production. Please note that `npm run dev` will use `nodemon` behind.
So, run `run i nodemon -g` to install nodemon package in your system level if you do not have yet.
6. The server should be running at [`http://localhost:8000`](http://localhost:8000)

## Available Apis
All the api segmentation path are followed by `http://localhost:8000/ap/v1`

### User API
User api will follow the following parttern `http://localhost:8000/ap/v1/users`

|#    | PATH | METHODS | PRIVATE | DESCRIPTION                                                                                                |
| --- | ---- | ------- | ------- | ----------- |
|1.   |  `/` |  `GET`  |   True   | It returns the user object                                                                                 |
|2.   |  `/` | `POST` | False  | Server expects the user object and create a new user in the db |
|3.   |  `/admin-user` | `POST` | True  | Server expects the user object and create a user admin in the db. Only Authenticated admin can create another admin |


 

### User API
Book api will follow the following parttern `http://localhost:8000/ap/v1/books`

|#    | PATH | METHODS | PRIVATE | DESCRIPTION |
| --- | ---- | ------- | ------- | ----------- |
|1.   |      |         |         |             |