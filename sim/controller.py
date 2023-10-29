import socket


class Controller():
    def __init__(self):
        self.server_ip = "localhost"
        self.port = 5000
        
    def reload(self):
        print(f"Server IP: {self.server_ip} | Port: {self.port}")