import io
from PIL import Image, ImageDraw, ImageFont
import translate
font_name = 'arial'
def split(word): 
    return [char for char in word]  

def draw_centered_text(im_draw, text, r, font, color):   
    im_draw.text((r[0], r[1]),text,font=font,align='center',fill = color)

def wrap_text(text, width,height):
  
    size = 1 
    font = ImageFont.truetype(font_name+'.ttf',size=size , encoding="unic")

    text_lines = []
    text_line = []
    
    maxtext = ('',0)

    while font.size * len(text_lines) < height  :
        text_lines = []
        text_line = []
        text = text.replace('\n', ' [br] ')
        words = text.split()
        font_size = font.getsize(text)

        for word in words:
            if word == '[br]':
                text_lines.append(' '.join(text_line))
                text_line = []
                continue
            text_line.append(word)

            w, h = font.getsize(' '.join(text_line))

            if w > width:
                text_line.pop()
                text_lines.append(' '.join(text_line))
                
                # encontrar el elemento mas grande 

                text_line = [word]



        if len(text_line) > 0:
            text_lines.append(' '.join(text_line))
        size+=1
        font = ImageFont.truetype('arial.ttf',size=size , encoding="unic")
        

    separator= '\n'
    lines = separator.join(text_lines)  
    return str(lines) , font

def drawText(draw, vertices, display_text):
    xy = tuple([vertices[0].x , vertices[0].y ,vertices[2].x, vertices[2].y])
    color = (0,0,0)

    max_width = vertices[2].x-vertices[0].x
    max_height = vertices[2].y-vertices[0].y
   
    text , font  = wrap_text(display_text,max_width, max_height)
    
    draw_centered_text(draw,text ,xy,font,color)
   
def drawBlock(pillow_img, vertices ,display_text=''):    
    draw = ImageDraw.Draw(pillow_img)
    shape = [(vertices[0].x-10, vertices[0].y-10),(vertices[2].x+10, vertices[2].y+10)]
    draw.rectangle(shape, fill ="#ffffff") 
    drawText(draw, vertices,display_text)

def drawAllBlock(image_source, response,font_name='arial'):
    if font_name != 'arial':
        setFontName(font_name)
    pillow_img = Image.open(io.BytesIO(image_source))
    for page in response.full_text_annotation.pages: 
        for block in page.blocks:             
            txt = [] 
            for paragraph in block.paragraphs:                 
                for word in paragraph.words: 
                    word_text = ''.join([symbol.text for symbol in word.symbols]) 
                    txt.append(word_text) 
            separator= ' '
           
            paragraph = separator.join(txt)

            translation = translate.translate_text2(paragraph,'es')
            print(paragraph)
            drawBlock(pillow_img,block.bounding_box.vertices,translation)

    pillow_img.show()

def setFontName(name):
    font_name = name 

