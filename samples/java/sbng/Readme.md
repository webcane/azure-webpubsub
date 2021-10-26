# Publish and subscribe messages

## Prerequisites

- [Java Development Kit (JDK)](/java/azure/jdk/) version 8 or above
- [Apache Maven](https://maven.apache.org/download.cgi)
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- Create an Azure Web PubSub resource


## Copy the ConnectionString from portal

1. Copy **Connection String** from **Keys** tab of the created Azure Web PubSub service, and replace the `<connection-string>` below with the value of your **Connection String**.


## Run the spring-boot application
1. Open a new terminal window, copy **Connection String** from **Keys** tab of the created Azure Web PubSub service, run the below command with the `<connection-string>` replaced by your **Connection String**:
    ```console
    cd webpubsub-quickstart-spring
    mvn spring-boot:run -Dspring-boot.run.arguments="--app.pubsub.hub-name=myHub1,--app.pubsub.connection-string=<connection_string>"
    ```

## Run the angular application
### Setup
```bash
cd webpubsub-quickstart-angular
npm install
```
### Start
1. Replace the `<connection-string>` by your **Connection String** in the `src/environments/environment.ts`
    ```ts
    export const environment = {
		production: false,
		apiUrl: 'http://localhost:8080',
		pubsubConnectionString: '<connection-string>',
		pubsubHubName: 'myHub1'
	};
    ```
2. Open a new terminal window and start the angular application:
    ```bash
    npm run start
    ```
