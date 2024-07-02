import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5105/chatHub")
    .withAutomaticReconnect()
    .build();

async function start() {
    try {
        await connection.start();
        console.log("Connected to SignalR hub");
    } catch (err) {
        console.error("Error connecting to SignalR hub: ", err);
/*         setTimeout(start, 5000); // Try to reconnect after 5 seconds */
    }
}

connection.onclose(start);

start();

export default connection;
