import qrcode

data = input("Enter the text or URL :").strip()
filename = input("Enter the filename :").strip()
qr = qrcode.QRCode(

    box_size=10,
    border=4
)
qr.add_data(data)
qr.make_image(fill_color="black"