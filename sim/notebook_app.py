import tkinter as tk
from tkinter import ttk

class NotebookApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Notebook App")
        self.root.geometry("800x600")

        self.notebook = ttk.Notebook(root)
        self.notebook.pack(fill=tk.BOTH, expand=True)

        # Automatically load pages from the 'pages' directory
        import importlib.util
        import os

        page_dir = 'pages'
        for filename in os.listdir(page_dir):
            if filename.endswith('.py'):
                page_name = os.path.splitext(filename)[0]
                page_module = importlib.import_module(f'{page_dir}.{page_name}')
                page_class = getattr(page_module, f"{page_name.capitalize()}")
                page = page_class(self.notebook)
                self.notebook.add(page, text=page_name)
    

if __name__ == "__main__":
    root = tk.Tk()
    app = NotebookApp(root)
    root.mainloop()
