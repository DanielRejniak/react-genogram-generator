# Run the app using npm
1. Install dependanceis
    ```
    npm install
    ```
2. Start the app
    ```
    npm start
    ```

# Run it using docker

1. Ensure to point to the correct docker repo. Set the repo name in the `.env` file before running any of the docker scripts.

2. Build the docker image. Go to `scripts/docker` and run the following command :
    ```
    ./build.sh
    ```
3. Push the docker image. Go to `scripts/docker` and run the following command :
    ```
    ./push.sh
    ```
4. Start the app using docker compose
    ```
    docker-compose up
    ```
