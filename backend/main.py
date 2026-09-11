from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from docx import Document
import os


app = FastAPI()


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# =========================
# 首页测试
# =========================

@app.get("/")
def home():

    return {
        "message":"AI英语助手运行成功"
    }



# =========================
# 读取Word
# =========================

def read_docx(path):

    doc = Document(path)

    text = []

    for paragraph in doc.paragraphs:

        if paragraph.text.strip():

            text.append(
                paragraph.text
            )


    return "\n".join(text)



# =========================
# 临时翻译
# 后面接AI
# =========================

def translate(text):


    if "Artificial intelligence is changing the world." in text:

        return "人工智能正在改变世界。"


    return "这是测试翻译内容"



# =========================
# 上传接口
# =========================

@app.post("/upload")
async def upload(
    file: UploadFile = File(...)
):


    print("收到文件:",file.filename)



    os.makedirs(
        "uploads",
        exist_ok=True
    )


    file_path = (
        "uploads/"
        + file.filename
    )



    content = await file.read()



    with open(
        file_path,
        "wb"
    ) as f:

        f.write(content)




    text = read_docx(
        file_path
    )


    print("读取内容:")
    print(text)



    return {


        "filename":
        file.filename,


        "content":
        text,


        "translation":
        translate(text)


    }



# =========================
# 单词查询接口
# =========================


@app.get("/word")
def word(word:str):


    print("查询单词:",word)



    dictionary={


        "Artificial":
        {
            "meaning":"人工的；人造的",
            "example":"Artificial intelligence is powerful."
        },


        "intelligence":
        {
            "meaning":"智能；智慧",
            "example":"Human intelligence is amazing."
        },


        "changing":
        {
            "meaning":"改变",
            "example":"Technology is changing life."
        },


        "world":
        {
            "meaning":"世界",
            "example":"The world is beautiful."
        }


    }



    if word in dictionary:


        return dictionary[word]



    return {


        "meaning":
        "暂无解释",


        "example":
        word+" is important."


    }