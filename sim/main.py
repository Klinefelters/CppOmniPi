import tkinter as tk
from tkinter import ttk
import importlib.util
import os
from shared_data import SharedData

class ResizableSplitFrameApp:
    def __init__(self, root):
        self.shared_data = SharedData()
        self.root = root
        self.root.title("Resizable Split Frame")

        self.window_width = 800
        self.window_height = 600
        self.separator_pos = self.window_height // 2

        self.panedwindow = tk.PanedWindow(self.root, orient=tk.VERTICAL, sashwidth=5)
        self.panedwindow.pack(fill=tk.BOTH, expand=True)

        self.top_frame = tk.Frame(self.panedwindow)
        self.bottom_frame = tk.Frame(self.panedwindow, background="lightgray")

        self.panedwindow.add(self.top_frame)
        self.panedwindow.add(self.bottom_frame)

        self.separator = tk.Frame(self.panedwindow, height=5, cursor="sb_v_double_arrow")
        self.separator.pack(fill=tk.BOTH)
        self.separator.bind("<ButtonPress-1>", self.on_separator_press)
        self.separator.bind("<ButtonRelease-1>", self.on_separator_release)

        self.create_widgets()

    def create_widgets(self):
        self.notebook = ttk.Notebook(self.top_frame)
        page_dir = 'pages'
        for filename in os.listdir(page_dir):
            if filename.endswith('.py'):
                page_name = os.path.splitext(filename)[0]
                page_module = importlib.import_module(f'{page_dir}.{page_name}')
                page_class = getattr(page_module, f"{page_name.capitalize()}")
                page = page_class(self.notebook, self.shared_data)
                self.notebook.add(page, text=page_name)
        self.notebook.pack(fill="both", expand=True)

        self.root.geometry(f"{self.window_width}x{self.window_height}")
        self.root.mainloop()

    
    def on_separator_press(self, event):
        self.separator.config(cursor="sb_v_double_arrow")
        self.separator.bind("<Motion>", self.on_separator_drag)

    def on_separator_drag(self, event):
        self.separator_pos = event.y
        self.panedwindow.paneconfigure(self.top_frame, height=self.separator_pos)
        self.panedwindow.paneconfigure(self.bottom_frame, height=self.window_height - self.separator_pos)

    def on_separator_release(self, event):
        self.separator.config(cursor="sb_v_double_arrow")
        self.separator.unbind("<Motion>")
        self.separator.unbind("<ButtonRelease-1>")

if __name__ == "__main__":
    root = tk.Tk()
    app = ResizableSplitFrameApp(root)
