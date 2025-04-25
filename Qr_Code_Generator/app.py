# Import QRCode class from the main module in the qrcode package

from qrcode.main import QRCode

# User input for Wi-Fi details
# Wi-Fi network name
# Wi-Fi password
# Encryption type (e.g., WPA2, WPA, etc.)
ssid = input("Enter your Wi-Fi network name (SSID): ").strip()
password = input("Enter your Wi-Fi password: ").strip()
encryption = input("Enter encryption type (WPA/WPA2/WEP): ").strip()