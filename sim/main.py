import os
import importlib
import tkinter as tk
from tkinter import ttk
from sidebar import Sidebar

class MainApplication(tk.Tk):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.title("Multi-View GUI")
        self.geometry("800x600")

        self.sidebar = Sidebar(self, self)  # Create the Sidebar instance

        self.container = ttk.Frame(self)
        self.container.pack(side="left", fill="both", expand=True)

        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.views = {}  # A dictionary to store the views

        # Discover and import available view modules
        view_files = [f[:-3] for f in os.listdir("views") if f.endswith(".py")]

        if "welcome_view" not in view_files:
            raise Exception("No 'welcome_page.py' found in the 'views' directory. Please create a 'welcome_page.py' view.")

        for view_module in view_files:
            view = importlib.import_module(f"views.{view_module}")

            parts = view_module.split('_')
            converted_string = ''.join([part.capitalize() for part in parts])
            view_class = getattr(view, converted_string)  # Construct the class name
            self.views[view_module] = view_class  # Add the view to self.views

            # Add a button to the sidebar
            self.sidebar.add_button(view_module, view_class)

        # Show the initial view (Welcome Page)
        self.show_view("welcome_view")  # Show the initial view

    def show_view(self, view_module):
        view_class = self.views[view_module]
        if view_class not in self.views:
            view = view_class(self.container, self)
            self.views[view_module] = view
            view.grid(row=0, column=0, sticky="nsew")
        else:
            view = self.views[view_module]

        view.tkraise()

if __name__ == "__main__":
    app = MainApplication()
    app.mainloop()
