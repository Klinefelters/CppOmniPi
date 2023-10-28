import tkinter as tk
from tkinter import ttk
from views.base_view import BaseView

class ServerView(BaseView):
    def __init__(self, parent, controller):
        super().__init__(parent, controller)
        label = ttk.Label(self, text="Server Settings")
        label.pack(pady=10, padx=10)

    def on_show(self):
        # Customize behavior when this view is shown
        pass
