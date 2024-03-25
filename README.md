# Home Library Service. Docker & Database
Multi-container application, that uses PostgreSQL database, Prisma and Nest.js   
PostgreSQL runs inside the Docker container.  
Docker Api image - [katerinakor/nodejs2024q1-service-api](https://hub.docker.com/r/katerinakor/nodejs2024q1-service-api)  
Docker Database image - [katerinakor/nodejs2024q1-service-postgres](https://hub.docker.com/r/katerinakor/nodejs2024q1-service-postgres)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## How to use:

#### 1. Clone repository

```
git clone https://github.com/Katerina-Kor/nodejs2024Q1-service.git
```

#### 2. Switch branch

```
git checkout db_docker
```

#### 3. Create `.env` file from `.env.example`

#### 4. Install NPM modules

```
npm install
```

#### 5. Start application in docker

```
npm run docker:up
```

## Other scripts:

### Running application locally

```
npm run start
```

After starting the app on port (4000 as default, you can change port in .env file) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Running application locally in dev mode

```
npm run start:dev
```

### Stop application in docker

```
npm run docker:down
```

Will stop containers and then remove all stopped containers and unused networks.

### Scan images for vulnerabilities

```
npm run scan:api
```
```
npm run scan:db
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### API description
1. `/user` endpoint:
  - **GET** `/user` - get all users
    - Server should answer with `status code` **200** and all users records
  - **GET** `/user/{id}` - get single user by id
    - Server should answer with `status code` **200** and and record with id === userId if it exists
    - Server should answer with `status code` **400** and corresponding message if userId is invalid (not uuid)
     - Server should answer with `status code` **404** and corresponding message if record with id === userId doesn't exist
  - **POST** `/user` - create user
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request body does not contain required fields
  - **PUT** `/user/{id}` - update user's password 
    - Server should answer with `status code` **200** and updated record if request is valid
    - Server should answer with `status code` **400** and corresponding message if userId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === userId doesn't exist
    - Server should answer with `status code` **403** and corresponding message if oldPassword is wrong
  - **DELETE** `/user/{id}` - delete user
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if userId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === userId doesn't exist

2. `/track` endpoint:
  - **GET** `/track` - get all tracks
    - Server should answer with `status code` **200** and all tracks records
  - **GET** `/track/{id}` - get single track by id
    - Server should answer with `status code` **200** and and record with id === trackId if it exists
    - Server should answer with `status code` **400** and corresponding message if trackId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === trackId doesn't exist
  - **POST** `/track` - create new track
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request body does not contain required fields
  - **PUT** `/track/{id}` - update track info
    - Server should answer with `status code` **200** and updated record if request is valid
    - Server should answer with `status code` **400** and corresponding message if trackId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === trackId doesn't exist
  - **DELETE** `/track/{id}` - delete track
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if trackId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === trackId doesn't exist

3. `/artist` endpoint:
  - **GET** `/artist` - get all artists
    - Server should answer with `status code` **200** and all artists records
  - **GET** `/artist/{id}` - get single artist by id
    - Server should answer with `status code` **200** and and record with id === artistId if it exists
    - Server should answer with `status code` **400** and corresponding message if artistId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === artistId doesn't exist
  - **POST** `/artist` - create new artist
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request body does not contain required fields
  - **PUT** `/artist/{id}` - update artist info
    - Server should answer with `status code` **200** and updated record if request is valid
    - Server should answer with `status code` **400** and corresponding message if artist is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === artistId doesn't exist
  - **DELETE** `/artist/{id}` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if artistId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === artistId doesn't exist

4. `/album` endpoint:
  - **GET** `/album` - get all albums
    - Server should answer with `status code` **200** and all albums records
  - **GET** `/album/{id}` - get single album by id
    - Server should answer with `status code` **200** and and record with id === albumId if it exists
    - Server should answer with `status code` **400** and corresponding message if albumId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === albumId doesn't exist
  - **POST** `/album` - create new album
    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request body does not contain required fields
  - **PUT** `/album/{id}` - update album info
    - Server should answer with `status code` **200** and updated record if request is valid
    - Server should answer with `status code` **400** and corresponding message if albumId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === albumId doesn't exist
  - **DELETE** `/album/{id}` - delete album
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if albumId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if record with id === albumId doesn't exist

5. `/favs` endpoint:
  - **GET** `/favs` - get all favorites
    - Server should answer with `status code` **200** and all favorite records
  - **POST** `/favs/track/{id}` - add track to the favorites
    - Server should answer with `status code` **201** and corresponding message if track with id === trackId exists
    - Server should answer with `status code` **400** and corresponding message if trackId is invalid (not uuid)
    - Server should answer with `status code` **422** and corresponding message if track with id === trackId doesn't exist
  - **DELETE** `/favs/track/{id}` - delete track from favorites
    - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if trackId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite
  - **POST** `/favs/album/{id}` - add album to the favorites
    - Server should answer with `status code` **201** and corresponding message if album with id === albumId exists
    - Server should answer with `status code` **400** and corresponding message if albumId is invalid (not uuid)
    - Server should answer with `status code` **422** and corresponding message if album with id === albumId doesn't exist
  - **DELETE** `/favs/album/{id}` - delete album from favorites
    - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if albumId is invalid (not uuid)
    - Server should answer with s`tatus code` **404** and corresponding message if corresponding album is not favorite
  - **POST** `/favs/artist/{id}` - add artist to the favorites
    - Server should answer with `status code` **201** and corresponding message if artist with id === artistId exists
    - Server should answer with `status code` **400** and corresponding message if artistId is invalid (not uuid)
    - Server should answer with `status code` **422** and corresponding message if artist with id === artistId doesn't exist
  - **DELETE** `/favs/artist/{id}` - delete artist from favorites
    - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
    - Server should answer with `status code` **400** and corresponding message if artistId is invalid (not uuid)
    - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite