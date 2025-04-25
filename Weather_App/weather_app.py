# Creating a small weather app using tkinter
# Importing tkinter from the tkinter module and give tk as alias name  to create the GUI
# Tk create main window, layout management, and some widgets that ttk doesn’t have, provides modern-looking widgets
# From tkinter module importing ttk(submodule) is used to generate advanced widget
# Import requests module to get data from api,send data to server
# From PIL module import Image,Imagetk module for loading  and displaying images
# Import pyttsx3 used for converting text to speech

# Creating a small weather app using tkinter

import tkinter as tk
from tkinter import PhotoImage, messagebox
import customtkinter as ctk
import requests
from PIL import Image, ImageTk
import pyttsx3


def create_gradient(canvas, width, height):
    start_color = (230, 240, 255)
    end_color = (70, 130, 180)
    for i in range(height):
        r = int(start_color[0] + (end_color[0] - start_color[0]) * i / height)
        g = int(start_color[1] + (end_color[1] - start_color[1]) * i / height)
        b = int(start_color[2] + (end_color[2] - start_color[2]) * i / height)
        canvas.create_line(0, i, width, i, fill=f"#{r:02x}{g:02x}{b:02x}", width=1)
        
        
def draw_heading(event):
    width = canvas.winfo_width()
    canvas.delete("heading")
    img_width = 90
    total_width = img_width + width
    canvas.create_image(total_width / 2 + 160, 110, tags="heading")
    canvas.create_text(width / 2 + 2, 72, text="Weather App",
                       fill="black", font=("Comic Sans MS", 30, "bold"), tags="heading")
    canvas.create_text(width / 2, 70,
                       text="Weather App",
                       fill="white",
                       font=("Comic Sans MS", 30, "bold"),
                       tags="heading")


# Initialize the main window
window = tk.Tk()
window.title("Weather App")
window.geometry("900x700")
window.update()

title_icon = PhotoImage(file="Images/weather.png")
window.iconphoto(True, title_icon)
window.resizable(False, False)

# Create and draw canvas
canvas = tk.Canvas(window, width=900, height=700)
canvas.pack(fill="both", expand=True)

create_gradient(canvas, 900, 700)

# Bind window resize to heading redraw
window.bind("<Configure>", draw_heading)

# Start app loop
window.mainloop()
