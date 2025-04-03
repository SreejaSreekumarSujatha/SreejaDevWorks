Wi-Fi QR Code Generator

A Python-based tool to generate QR codes for Wi-Fi credentials. This QR code can be scanned by any device to easily connect to your Wi-Fi network without manually entering the credentials.

Features
Generate a QR code for Wi-Fi credentials (SSID, password, and encryption type).
Option to save the QR code image for later use or sharing.
Supports different encryption types (WEP, WPA/WPA2, and no encryption).

Prerequisites

Before running the project, ensure you have the following installed:

Python 3.x
`qrcode` library (used for generating QR codes)
`pillow` library (used for image processing)

You can install the required libraries by running the following command:

pip install qrcode[pil]

How to Use
1.Clone the repository:

Clone this repository to your local machine:

git clone https://github.com/SreejaSreekumarSujatha/SreejaDevWorks.git

2.Navigate to the project directory:

Change to the project folder where the code is located:
cd QRCodeGenerator

3.Run the script:

Run the Python script to generate the Wi-Fi QR code:

python qr_code_generator.py

4.Enter your Wi-Fi credentials:

The script will ask you for the following details:

SSID (Your Wi-Fi network name)

Password (Your Wi-Fi password)

Encryption type (Select from WEP, WPA/WPA2, or None)

Example:

Enter your Wi-Fi SSID: MyNetwork
Enter your Wi-Fi Password: MySecretPassword
Enter Encryption Type (WEP/ WPA/WPA2): WPA2

5.QR Code Generation:

After entering the details, a QR code will be generated. The QR code image will be saved in the current directory with the name wifi_qr_code.png.

6.Scan the QR Code:

You can now scan the generated QR code using your phone or any other QR code scanner. This will automatically connect your device to the Wi-Fi network.
7.Sample Output
When you run the script, you will see output like the following:
Enter your Wi-Fi network name (SSID): MyNetwork
Enter your Wi-Fi password: MySecretPassword
Enter Encryption Type (WEP/WPA/WPA2): WPA2
Wi-Fi QR Code generated and saved as 'wifi_qr_code.png'.

The wifi_qr_code.png file will be created in the project directory.

