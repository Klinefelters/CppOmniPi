import tkinter as tk
from tkinter import ttk

class BaseView(ttk.Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

    def on_show(self):
        # This method can be overridden in individual views for custom behavior
        pass
