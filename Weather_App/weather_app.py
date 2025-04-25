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


def get_5_day_forecast(city):
    # city = entry.get()
    print("c" + city)
    api_key = "48eac6fb99760519cf27b14ee972ac29"
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code != 200:
        return {"error": "City not found or API error."}
    
    data = response.json()
    forecast_list = data['list']
    daily_forecast = {}
    
    for item in forecast_list:
        dt_txt = item['dt_txt']
        date = dt_txt.split(" ")[0]
        if "12:00:00" in dt_txt:
            weather = item['weather'][0]['description'].capitalize()
            temp = item['main']['temp']
            daily_forecast[date] = {
                'temp': round(temp, 1),
                'description': weather
            }
    
    return daily_forecast


def speak_forecast(city):
    print(city)
    # city = entry.get()
    forecast = get_5_day_forecast(city)
    
    if "error" in forecast:
        engine.say(forecast["error"])
    else:
        for date, info in forecast.items():
            sentence = f"On {date}, the weather will be {info['description']} with a temperature of {info['temp']} degrees Celsius."
            engine.say(sentence)
    
    engine.runAndWait()


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


def draw_weather_cards(canvas, data):
    canvas.delete("weather_cards")
    
    def create_card(x, y, width, height, title, value, emoji):
        canvas.create_rectangle(
            x, y, x + width, y + height, fill="#6c9dc6",
            outline="#91b6d4", width=2, tags="weather_cards"
        )
        canvas.create_text(x + 15, y + 10, text=emoji, font=("Segoe UI Emoji", 20), anchor="nw", tags="weather_cards",
                           fill="white")
        canvas.create_text(x + 55, y + 10, text=title, font=("Times New Roman", 15, "bold"), anchor="nw", fill="white",
                           tags="weather_cards")
        canvas.create_text(x + 55, y + 35, text=value, font=("Times New Roman", 15), anchor="nw", fill="white",
                           tags="weather_cards")
    
    # x1, x2 = 120, 470
    # y1, y2 = 420, 520
    # Position for 3 cards horizontally
    x1, x2, x3 = 80, 360, 650  # Adjust these to space out the cards nicely
    y1 = 410  # Same y-coordinate to keep them in the same row
    
    create_card(x1, y1, 200, 70, "Humidity", f"{data['humidity']}%", emoji="💧")
    create_card(x2, y1, 200, 70, "Wind Speed", f"{data['wind_speed']} m/s", emoji="🌬")
    create_card(x3, y1, 200, 70, "Condition", data['description'].capitalize(), emoji="☀")


def disply_weather_img(weather_desp, city_name, rounded_temperature, round_feels_like, weather_icon, country_code):
    global weather_img_tk
    
    try:
        
        if 'n' in weather_icon:  # 🌙 NIGHT CONDITIONS
            if weather_desp in ['clear sky']:
                img = Image.open("Images/night1.png").resize((90, 90))
                # img = Image.open("Images/night_fog.png").resize((90, 90))
                weather_msg = "Clear night skies."
            
            elif weather_desp in ['few clouds', 'scattered clouds', 'broken clouds']:
                img = Image.open("Images/night_clouds.png").resize((90, 90))
                weather_msg = "Clouds under the moonlight"
            
            elif weather_desp in ['rain', 'light rain', 'moderate rain', 'heavy intensity rain',
                                  'shower rain', 'light intensity shower rain', 'drizzle',
                                  'light intensity drizzle', 'heavy intensity drizzle']:
                img = Image.open("Images/night_rain.png").resize((90, 90))
                weather_msg = "Rainy night"
            
            elif weather_desp in ['overcast clouds']:
                img = Image.open("Images/overcast_night.png").resize((90, 90))
                weather_msg = "Overcast night "
            
            elif weather_desp in ['snow', 'light snow', 'heavy snow', 'sleet', 'shower snow',
                                  'light rain and snow']:
                img = Image.open("Images/night_snow.png").resize((90, 90))
                weather_msg = "Snowy night, Stay warm!"
            
            elif weather_desp in ['thunderstorm', 'storm',
                                  'thunderstorm with light rain', 'thunderstorm with heavy rain',
                                  'thunderstorm with drizzle', 'heavy thunderstorm']:
                img = Image.open("Images/night_thunder1.png").resize((90, 90))
                weather_msg = "Stormy night Stay safe!"
            
            elif weather_desp in ['mist', 'fog', 'haze', 'smoke', 'sand', 'dust', 'volcanic ash']:
                img = Image.open("Images/night_fog.png").resize((90, 90))
                weather_msg = "Foggy night!"
            
            elif weather_desp in ['tornado', 'squall', 'hurricane', 'cold', 'hot', 'windy']:
                img = Image.open("Images/typhoon.png").resize((90, 90))
                weather_msg = "Extreme night weather, Stay alert!"
            
            else:
                img = Image.open("Images/unknown_1.png").resize((90, 90))
                weather_msg = "Night sky... can't quite tell!"
        
        else:  # ☀️ DAY CONDITIONS
            if weather_desp in ['clear sky', 'sunny']:
                img = Image.open("Images/sun_1.png").resize((90, 90))  # or "sun_1.png"
                weather_msg = "It's sunny! Wear your shades"
            
            elif weather_desp in ['few clouds', 'scattered clouds', 'broken clouds']:
                img = Image.open("Images/partly_cloudy.png").resize((90, 90))
                weather_msg = "A lil' cloudy!"
            
            elif weather_desp in ['rain', 'light rain', 'moderate rain', 'heavy intensity rain',
                                  'shower rain', 'light intensity shower rain', 'drizzle',
                                  'light intensity drizzle', 'heavy intensity drizzle']:
                img = Image.open("Images/kid.png").resize((90, 90))
                weather_msg = "Grab your umbrella"
            
            elif weather_desp in ['clouds', 'overcast clouds']:
                img = Image.open("Images/cloudy.png").resize((90, 90))
                weather_msg = "All cloudy!"
            
            elif weather_desp in ['snow', 'light snow', 'heavy snow', 'sleet', 'shower sleet',
                                  'light shower sleet', 'rain and snow', 'light rain and snow', 'shower snow']:
                img = Image.open("Images/snow.png").resize((90, 90))
                weather_msg = "Snow Day!"
            
            elif weather_desp in ['thunderstorm', 'storm',
                                  'thunderstorm with light rain', 'thunderstorm with heavy rain',
                                  'thunderstorm with drizzle', 'heavy thunderstorm']:
                img = Image.open("Images/thunderstorm.png").resize((90, 90))
                weather_msg = "Thunderstorm time! Stay indoors"
            
            elif weather_desp in ['mist', 'fog', 'haze', 'smoke', 'sand', 'dust', 'volcanic ash']:
                img = Image.open("Images/foggy-day.png").resize((90, 90))
                weather_msg = "Foggy feels. Drive safe!"
            
            elif weather_desp in ['tornado', 'squall', 'hurricane', 'cold', 'hot', 'windy']:
                img = Image.open("Images/typhoon.png").resize((90, 90))
                weather_msg = "Twister alert! Find shelter now! ️"
            
            else:
                img = Image.open("Images/unknown_1.png").resize((90, 90))
                weather_msg = "Hmm... can't read the sky right now!"
        
        weather_img_tk = ImageTk.PhotoImage(img)
        canvas.delete("weather_display")
        canvas.delete("temp_display")
        canvas.delete("name_display")
        
        location_image = Image.open("Images/location.png")
        resize_location_img = location_image.resize((20, 20))
        new_location_img = ImageTk.PhotoImage(resize_location_img)
        canvas.location_image = new_location_img
        
        speaking_cloud_img = Image.open("Images/spkg_cloud2.png")
        resize_spkg_img = speaking_cloud_img.resize((150, 150))
        new_spkg_img = ImageTk.PhotoImage(resize_spkg_img)
        canvas.speaking_cloud_img = new_spkg_img
        
        # x_start = 750
        # y_position = 380
        # canvas.create_image(x_start, y_position, image=weather_img_tk, tags="weather_display")
        # canvas.create_text(x_start - 400, 310, text=city_name,
        #                    fill="white", font=("monospace", 28, "bold"), anchor="w", tags="weather_display")
        canvas.create_text(canvas.winfo_width() // 2, 310, text=f"{city_name},{country_code}",
                           fill="white", font=("Consolas", 25, "bold"),
                           anchor="center", tags="name_display")
        # Create the map icon (location pin)
        canvas.create_image((canvas.winfo_width() // 2) - 120, 310, image=new_location_img, tags="location_icon")
        
        # Show temperature text
        canvas.create_text((canvas.winfo_width() // 2), 360,
                           text=f"{rounded_temperature}°C / Feels like {round_feels_like}°C",
                           fill="white", font=("Times New Roman", 20, "bold"), anchor="center", tags="temp_display")
        # Place the weather icon next to it (right side)
        weather_img_id = canvas.create_image((canvas.winfo_width() // 2) + 300, 220, image=weather_img_tk, anchor="nw",
                                             tags="weather_display")
        
        canvas.create_text((canvas.winfo_width() // 2) + 310, 340, text=weather_msg, fill="white",
                           font=("Bradley Hand ITC", 15, "bold"), anchor="center", tags="temp_display")
        
        canvas.create_image((canvas.winfo_width() // 2) - 420, 530, image=new_spkg_img, anchor="nw",
                            tags="spkg_weather")
        # Make it look clickable by changing cursor on hover
        # hand cursor
        canvas.tag_bind("spkg_weather", "<Enter>", lambda e: canvas.config(cursor="hand2"))
        # default cursor
        canvas.tag_bind("spkg_weather", "<Leave>", lambda e: canvas.config(cursor=""))
        # on click
        canvas.tag_bind("spkg_weather", "<Button-1>", lambda event: speak_forecast(city_name))
        # animate_png(canvas, weather_img_id)
        #
        # animate_float(canvas, weather_img_id)
    
    except Exception as e:
        messagebox.showerror("Error", f"Could not load weather image: {str(e)}")


def search_weather():
    city = entry.get()
    
    if not city:
        messagebox.showwarning("Input Required", "Please enter a city name.")
        return
    
    try:
        api_key = "48eac6fb99760519cf27b14ee972ac29"
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=en"
        response = requests.get(url)
        response.raise_for_status()
        api_data = response.json()
        
        temp = api_data["main"]["temp"]
        feels_like = api_data["main"]["feels_like"]
        humidity = api_data["main"]["humidity"]
        weather_description = api_data["weather"][0]["description"]
        city_name = api_data["name"]
        wind_speed = api_data["wind"]["speed"]
        weather_icon = api_data['weather'][0]['icon']
        country_code = api_data["sys"]["country"]
        
        rounded_temperature = round(temp)
        rounded_feels_like = round(feels_like)
        
        disply_weather_img(weather_description, city_name, rounded_temperature, rounded_feels_like, weather_icon,
                           country_code)
        
        weather_data = {
            "humidity": humidity,
            "wind_speed": wind_speed,
            "description": weather_description,
            "feels_like": rounded_feels_like
            
        }
        draw_weather_cards(canvas, weather_data)
        entry.delete(0, tk.END)
    
    except requests.exceptions.HTTPError as error:
        if error.response.status_code == 404:
            messagebox.showerror("City not found", "Invalid city name.")
        else:
            messagebox.showerror("Error", f"Something went wrong: {error}")


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
# Text to speech converter
engine = pyttsx3.init()
# engine.say("I will speak this text")

# Rate

# Getting details of current speaking rate
rate = engine.getProperty('rate')
# Setting up new voice rate
engine.setProperty('rate', 125)

# Volume
# Getting to know current volume level (min=0 and max=1)

volume = engine.getProperty('volume')
# Setting up volume level  between 0 and 1
engine.setProperty('volume', 1.0)

# Voice
# Getting details of current voice
voices = engine.getProperty('voices')
# Changing index, changes voices. 1 for female
engine.setProperty('voice', voices[1].id)

# Entry field
entry = ctk.CTkEntry(
    master=window,
    width=300,
    height=40,
    border_color="white",
    border_width=3,
    fg_color="transparent",
    placeholder_text="Enter city",
    font=("Arial", 16)
)
entry.place(relx=0.5, rely=0.25, anchor="center")

# Search button
search_btn = ctk.CTkButton(
    master=window,
    width=100,
    height=40,
    text_color="white",
    text="Search",
    bg_color="red",
    fg_color="#ec3642",
    hover_color="#FF3B3F",
    corner_radius=20,
    font=("Montserrat", 18, "bold"),
    cursor="hand2",
    command=search_weather
)
search_btn.place(relx=0.5, rely=0.35, anchor="center")

# Bind window resize to heading redraw
window.bind("<Configure>", draw_heading)

# Start app loop
window.mainloop()
