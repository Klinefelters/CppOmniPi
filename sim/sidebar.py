import tkinter as tk
from tkinter import ttk

class Sidebar(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.parent = parent
        self.controller = controller
        self.pack(side="left", fill="y")

        style = ttk.Style()
        style.configure("Sidebar.TFrame", background="lightgray")
        self.configure(style="Sidebar.TFrame")

    def add_button(self, text, view_class):
        test = text
        parts = test.split('_')
        label = parts[0].capitalize()
        button = ttk.Button(self, text=label, command=lambda v=view_class: self.controller.show_view(text))
        button.pack(fill="x", pady=5)
