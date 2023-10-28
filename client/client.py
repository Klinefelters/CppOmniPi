import socket

server_address = ('localhost', 12345)
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

message = "Hello, UDP Server!"

try:
    # Send data to the server
    client_socket.sendto(message.encode(), server_address)

    # Receive the response from the server
    data, server = client_socket.recvfrom(1024)
    print("Received from server:", data.decode())
finally:
    client_socket.close()
