#include <iostream>
#include <cstring>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main() {
    int udpSocket, nBytes;
    struct sockaddr_in serverAddr, clientAddr;
    socklen_t addr_size;
    char buffer[1024];

    // Create a UDP socket
    udpSocket = socket(PF_INET, SOCK_DGRAM, 0);

    // Initialize server address structure
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(12345);
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    memset(serverAddr.sin_zero, '\0', sizeof(serverAddr.sin_zero));

    // Bind the socket to the server address
    bind(udpSocket, (struct sockaddr *)&serverAddr, sizeof(serverAddr));

    addr_size = sizeof(clientAddr);

    while (1) {
        // Receive data from the client
        nBytes = recvfrom(udpSocket, buffer, 1024, 0, (struct sockaddr *)&clientAddr, &addr_size);

        // Send the received data back to the client
        sendto(udpSocket, buffer, nBytes, 0, (struct sockaddr *)&clientAddr, addr_size);

        std::cout << "Received and echoed " << nBytes << " bytes to the client: " << buffer << std::endl;
    }

    return 0;
}
