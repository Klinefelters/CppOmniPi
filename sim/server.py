import socket



class Server():
    def __init__(
        self,
        ip:str = 'localhost',
        port:int = 12345):
        # Define the IP address and port on which the server will listen
        self.ip = ip  # Localhost
        self.port = port  # You can change this to the desired port number
        

        # Create a UDP socket
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

        # Bind the socket to the IP address and port
        self.socket.bind((self.ip, self.port))

        print(f"UDP server listening on {self.ip}:{self.port}")


    
    def run(self):
        self.running = True
        while self.running:
            # Receive data from a client
            data, client_address = self.socket.recvfrom(1024)  # 1024 is the buffer size

            # Process the received data
            print(f"Received data from {client_address}: {data.decode('utf-8')}")


        # Close the socket when you're done (This won't be reached in this example)
        self.socket.close()
    

if __name__ == "__main__":
    server = Server()
    server.run()