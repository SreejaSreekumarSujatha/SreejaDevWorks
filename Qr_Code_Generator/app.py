# Import QRCode class from the main module in the qrcode package

from qrcode.main import QRCode

# User input for Wi-Fi details
# Wi-Fi network name
# Wi-Fi password
# Encryption type (e.g., WPA2, WPA, etc.)
ssid = input("Enter your Wi-Fi network name (SSID): ").strip()
password = input("Enter your Wi-Fi password: ").strip()
encryption = input("Enter encryption type (WPA/WPA2/WEP): ").strip()


# Create a QR code object
qr = QRCode(version=1, box_size=10, border=5)

# Define the WiFi data
wifi_data = f"WIFI:S:{ssid};T:{encryption};P:{password};;"
# Add the WiFi data to the QR code object
qr.add_data(wifi_data)
# Make the QR code
qr.make(fit=True)
# Create an image from the QR code
img = qr.make_image(fill_color="black", back_color="white")

# Save the QR code image
img.save("wifi_qr_code.png")

# Display a message
print("Wi-Fi QR Code generated and saved as 'wifi_qr_code.png'.")