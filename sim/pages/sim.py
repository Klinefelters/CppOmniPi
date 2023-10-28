import tkinter as tk

class Sim(tk.Frame):
    def __init__(self, parent):
        super().__init__(parent)
        self.grid()
        
        label = tk.Label(self, text="This is Page 2")
        label.pack(padx=20, pady=20)

if __name__ == "__main__":
    root = tk.Tk()
    page = Sim(root)
    page.pack()
    root.mainloop()