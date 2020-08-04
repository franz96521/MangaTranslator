from tkinter import *
from PIL import ImageTk, Image

root = Tk()
root.title("Fee Fie Foe Fum")




path = 'img\\img2.jpg'
img = ImageTk.PhotoImage(Image.open(path))
panel = Label(root, image = img)
panel.pack(side = "bottom", fill = "both", expand = "yes")

tbox1 = Text()
tbox1.place(x=10, y=10, height=300, width=200)

root.save('hola.png')
root.mainloop()
