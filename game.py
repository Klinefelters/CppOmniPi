import tkinter as tk
import cv2
from PIL import Image, ImageTk

def update_camera_feed():
    ret, frame = camera.read()
    if ret:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img = ImageTk.PhotoImage(Image.fromarray(frame))
        top_frame.config(image=img)
        top_frame.img = img
    top_frame.after(10, update_camera_feed)  # Update every 10 milliseconds

def toggle_enabled():
    if enable_var.get() == 1:
        print("Enabled")
    else:
        print("Disabled")

def on_option_select(event):
    selected_option = option_var.get()
    print(f"Control option: {selected_option}")

def drag(event):
    global separator_pos
    separator_pos = event.y
    panedwindow.paneconfigure(top_frame, height=separator_pos)
    panedwindow.paneconfigure(bottom_frame, height=window_height - separator_pos)

def release(event):
    separator.config(cursor="sb_v_double_arrow")
    separator.unbind("<Motion>")
    separator.unbind("<ButtonRelease-1>")

window = tk.Tk()
window.title("Resizable Split Frame")

window_width = 800
window_height = 600
separator_pos = window_height // 2

panedwindow = tk.PanedWindow(window, orient=tk.VERTICAL, sashwidth=5)
panedwindow.pack(fill=tk.BOTH, expand=True)

top_frame = tk.Label(panedwindow, background="black")  # Set black background
bottom_frame = tk.Frame(panedwindow, background="lightgray")

panedwindow.add(top_frame)
panedwindow.add(bottom_frame)

separator = tk.Frame(panedwindow, height=5, cursor="sb_v_double_arrow")
separator.pack(fill=tk.BOTH)
separator.bind("<ButtonPress-1>", lambda event: separator.config(cursor="sb_v_double_arrow"))
separator.bind("<ButtonPress-1>", drag)
separator.bind("<ButtonRelease-1>", release)

camera = cv2.VideoCapture(0)  # Open the default camera

# Set the initial size of the camera feed frame
camera.set(cv2.CAP_PROP_FRAME_WIDTH, window_width)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, separator_pos)

update_camera_feed()  # Start updating the camera feed

enable_var = tk.IntVar()
enable_checkbox = tk.Checkbutton(bottom_frame, text="Enable/Disable", variable=enable_var, command=toggle_enabled)
enable_checkbox.pack(pady=10)

options = ["Keyboard", "Controller", "Voice", "Video"]
option_var = tk.StringVar(value=options[0])
option_menu = tk.OptionMenu(bottom_frame, option_var, *options, command=on_option_select)
option_menu.pack(pady=10)

window.geometry(f"{window_width}x{window_height}")

window.mainloop()
