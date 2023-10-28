import tkinter as tk

class Server(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.grid()
        
        label = tk.Label(self, text="This is Page 1")
        label.pack(padx=20, pady=20)

if __name__ == "__main__":
    root = tk.Tk()
    page = Server(root)
    page.pack()
    root.mainloop()
