import tkinter as tk
from tkinter import ttk

class Settings(tk.Frame):
    def __init__(self, parent, shared_data):
        super().__init__(parent)
        self.parent = parent
        self.shared_data = shared_data
        self.grid()
        
        self.server_ip_label = tk.Label(self, text="Server IP:")
        self.server_ip_label.grid(row=0, column=0, padx=20, pady=10, sticky="w")
        
        self.server_ip_entry = tk.Entry(self)
        self.server_ip_entry.grid(row=0, column=1, padx=20, pady=10)
        
        self.port_label = tk.Label(self, text="Port:")
        self.port_label.grid(row=1, column=0, padx=20, pady=10, sticky="w")
        
        self.port_entry = tk.Entry(self)
        self.port_entry.grid(row=1, column=1, padx=20, pady=10)
        
        self.landmark_max_label = tk.Label(self, text="Landmark Max:")
        self.landmark_max_label.grid(row=2, column=0, padx=20, pady=10, sticky="w")
        
        self.landmark_max_entry = tk.Entry(self)
        self.landmark_max_entry.grid(row=2, column=1, padx=20, pady=10)
        
        self.update_button = tk.Button(self, text="Update", command=self.update_variables)
        self.update_button.grid(row=3, column=0, columnspan=2, pady=10)
        
        self.landmark_max = tk.StringVar(value = shared_data.landmark_max)
        self.server_ip = tk.StringVar(value = shared_data.controller.server_ip)
        self.port = tk.StringVar(value = shared_data.controller.port)
        
        self.server_ip.set(shared_data.controller.server_ip)
        self.port.set(shared_data.controller.port)
        self.landmark_max.set(shared_data.landmark_max)
        
        self.landmark_max_entry.bind("<Return>", self.update_variables)
        self.server_ip_entry.bind("<Return>", self.update_variables)
        self.port_entry.bind("<Return>", self.update_variables)
    
    def update_variables(self, event=None):
        self.server_ip.set(self.server_ip_entry.get())
        self.port.set(self.port_entry.get())
        self.landmark_max.set(self.landmark_max_entry.get())
        
        self.shared_data.landmark_max = int(self.landmark_max.get())
        self.shared_data.controller.server_ip = self.server_ip.get()
        self.shared_data.controller.port = int(self.port.get())
        
        self.shared_data.controller.reload()
